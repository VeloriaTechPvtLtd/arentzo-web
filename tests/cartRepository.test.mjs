import test from 'node:test';
import assert from 'node:assert/strict';
import {createCartRepository} from '../src/features/cart/infrastructure/cartRepository.mjs';
const uid='00000000-0000-4000-8000-000000000001';
const id='00000000-0000-4000-8000-000000000002';
const productId='00000000-0000-4000-8000-000000000003';
function fixture({auth=true,error=null,throws=null,expectedUserId}={}) {
 const calls=[];let currentTable;
 const chain=new Proxy({}, {get(_,method){if(method==='then')return (resolve,reject)=>currentTable==='products'?resolve({data:[{id:productId,is_active:true,quantity_available:10}]}):throws?reject(throws):resolve({data:[{id,user_id:uid}],error});return (...args)=>{calls.push([method,...args]);return chain;};}});
 const client={auth:{getUser:async()=>{calls.push(['getUser']);return {data:{user:auth?{id:uid}:null},error:null};}},from:(...args)=>{currentTable=args[0];calls.push(['from',...args]);return chain;},rpc:(...args)=>{calls.push(['rpc',...args]);return chain;}};
 return {repo:createCartRepository(client,expectedUserId),calls};
}
const dates={start:'2030-01-01T10:00:00+05:30',end:'2030-01-02T10:00:00+05:30'};
test('list verifies identity and scopes cart query',async()=>{const {repo,calls}=fixture();await repo.list();assert.equal(calls[0][0],'getUser');assert.ok(calls.some(c=>c[0]==='eq'&&c[1]==='user_id'&&c[2]===uid));assert.ok(calls.some(c=>c[0]==='range'&&c[1]===0&&c[2]===999));});
test('unauthenticated operations never query database',async()=>{for(const fn of [r=>r.list(),r=>r.add({productId,...dates,quantity:1}),r=>r.update(id,{quantity:2}),r=>r.remove(id),r=>r.checkAvailability([id])]){const {repo,calls}=fixture({auth:false});await assert.rejects(()=>fn(repo),e=>e.code==='unauthenticated');assert.deepEqual(calls,[['getUser']]);}});
test('add writes authoritative owner and synchronized dates without pricing',async()=>{const {repo,calls}=fixture();await repo.add({productId,...dates,quantity:2,price:900,user_id:'attacker'});const row=calls.find(c=>c[0]==='insert')[1];assert.deepEqual(row,{user_id:uid,product_id:productId,start_date:'2030-01-01T04:30:00.000Z',end_date:'2030-01-02T04:30:00.000Z',start_datetime:'2030-01-01T04:30:00.000Z',end_datetime:'2030-01-02T04:30:00.000Z',quantity:2,rental_type:'daily',is_subscription:false});});
test('rejects malformed ids, dates and quantities before mutation',async()=>{for(const patch of [{productId:'bad'},{quantity:0},{quantity:1.1},{quantity:NaN},{quantity:Infinity},{end:dates.start},{start:'not date'},{start:'2030-01-01'},{start:'2030-02-30T00:00:00Z'},{start:'2030-01-01T24:00:00Z'}]){const {repo,calls}=fixture();await assert.rejects(()=>repo.add({productId,...dates,quantity:1,...patch}),e=>e.code==='validation');assert.ok(!calls.some(c=>c[0]==='insert'));}});
test('update and delete scope both item and user',async()=>{const {repo,calls}=fixture();await repo.update(id,{...dates,quantity:3});const row=calls.find(c=>c[0]==='update')[1];assert.equal(row.start_date,row.start_datetime);assert.equal(row.end_date,row.end_datetime);assert.ok(calls.some(c=>c[0]==='eq'&&c[1]==='id'&&c[2]===id));assert.ok(calls.some(c=>c[0]==='eq'&&c[1]==='user_id'&&c[2]===uid));calls.length=0;await repo.remove(id);assert.ok(calls.some(c=>c[0]==='eq'&&c[1]==='user_id'&&c[2]===uid));});
test('update requires complete date pair and nonempty recognized patch',async()=>{for(const patch of [{start:dates.start},{},{price:100}])await assert.rejects(()=>fixture().repo.update(id,patch),e=>e.code==='validation');});
test('availability only sends owned ids to advisory RPC',async()=>{const {repo,calls}=fixture();await repo.checkAvailability([id]);assert.deepEqual(calls.find(c=>c[0]==='rpc'),['rpc','check_cart_availability',{p_cart_item_ids:[id]}]);await assert.rejects(()=>fixture().repo.checkAvailability([productId]),e=>e.code==='validation');});
test('ambiguous mutations report uncertainty and never retry',async()=>{for(const opts of [{throws:new TypeError('Failed to fetch')},{error:{message:'network timeout'}}]){const {repo,calls}=fixture(opts);await assert.rejects(()=>repo.add({productId,...dates,quantity:1}),e=>e.code==='outcome_uncertain');assert.equal(calls.filter(c=>c[0]==='insert').length,1);}});
test('known database rejection is backend error, not uncertain',async()=>{await assert.rejects(()=>fixture({error:{code:'42501',message:'denied'}}).repo.remove(id),e=>e.code==='backend');});

test('account switch rejects stale context before querying',async()=>{const {repo,calls}=fixture({expectedUserId:productId});await assert.rejects(()=>repo.list(),e=>e.code==='unauthenticated');assert.deepEqual(calls,[['getUser']]);});
test('never-resolving auth and operations hit bounded deadlines',async()=>{
 const never=()=>new Promise(()=>{});
 const authRepo=createCartRepository({auth:{getUser:never}},undefined,{timeoutMs:5});
 await assert.rejects(()=>authRepo.list(),e=>e.code==='unauthenticated');
 let writes=0;
 const chain={eq(){return this;},select(){return this;},then(){}};
 const client={auth:{getUser:async()=>({data:{user:{id:uid}}})},from:(table)=>table==='products'?{select(){return this;},eq(){return Promise.resolve({data:[{id:productId,is_active:true,quantity_available:10}]});}}:({select:()=>chain,insert:()=>{writes++;return chain;}})};
 const repo=createCartRepository(client,uid,{timeoutMs:5});
 await assert.rejects(()=>repo.list(),e=>e.code==='backend');
 await assert.rejects(()=>repo.add({productId,...dates,quantity:1}),e=>e.code==='outcome_uncertain');
 assert.equal(writes,1);
});
test('update cannot mutate unsupported rental modes',async()=>{const {repo,calls}=fixture();await repo.update(id,{quantity:2});assert.ok(calls.some(c=>c[0]==='eq'&&c[1]==='rental_type'&&c[2]==='daily'));assert.ok(calls.some(c=>c[0]==='eq'&&c[1]==='is_subscription'&&c[2]===false));});

test('list fetches products separately without foreign key and rechecks identity',async()=>{
 const calls=[];let identities=0;
 const client={auth:{getUser:async()=>{identities++;return {data:{user:{id:uid}}};}},from(table){calls.push(table);const q={select(){return q;},eq(){return q;},range(){return q;},in(){return q;},then(resolve){resolve({data:table==='cart_items'?[{id,product_id:productId}]:[{id:productId,title:'Fixture'}]});}};return q;}};
 const rows=await createCartRepository(client,uid).list();assert.equal(rows[0].products.title,'Fixture');assert.deepEqual(calls,['cart_items','products']);assert.equal(identities,2);
});
test('list refuses account switch between cart and product reads',async()=>{
 let identities=0,productReads=0;const client={auth:{getUser:async()=>({data:{user:{id:++identities===1?uid:productId}}})},from(table){if(table==='products')productReads++;const q={select(){return q;},eq(){return q;},range(){return q;},then(resolve){resolve({data:[{id,product_id:productId}]});}};return q;}};
 await assert.rejects(()=>createCartRepository(client,uid).list(),e=>e.code==='unauthenticated');assert.equal(productReads,0);
});
test('list surfaces cart row limit instead of silent truncation',async()=>{
 const q={select(){return q;},eq(){return q;},range(){return q;},then(resolve){resolve({data:Array.from({length:1000},()=>({id,product_id:productId}))});}};
 const client={auth:{getUser:async()=>({data:{user:{id:uid}}})},from:()=>q};
 await assert.rejects(()=>createCartRepository(client,uid).list(),e=>e.code==='limit_exceeded');
});

test('add rejects missing, inactive or insufficient product without insert',async()=>{
 for(const data of [[],[{is_active:false,quantity_available:10}],[{is_active:true,quantity_available:0}]]){
 let writes=0;const client={auth:{getUser:async()=>({data:{user:{id:uid}}})},from(){return {select(){return this;},eq(){return Promise.resolve({data});},insert(){writes++;}};}};
 await assert.rejects(()=>createCartRepository(client,uid).add({productId,...dates,quantity:1}),e=>e.code==='validation');assert.equal(writes,0);
 }
});
test('add preserves optional stable row id across explicit retries without upsert',async()=>{
 const {repo,calls}=fixture();const input={id,productId,...dates,quantity:1};
 await repo.add(input);await repo.add(input);
 const inserts=calls.filter(c=>c[0]==='insert');assert.equal(inserts.length,2);assert.deepEqual(inserts[0][1],inserts[1][1]);assert.equal(inserts[0][1].id,id);assert.ok(!calls.some(c=>c[0]==='upsert'));
 await assert.rejects(()=>repo.add({...input,id:'invalid'}),e=>e.code==='validation');
});
