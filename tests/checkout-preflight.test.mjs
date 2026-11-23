import test from 'node:test';
import assert from 'node:assert/strict';
import {parseCheckoutPreflight} from '../src/features/checkout/domain/checkoutPreflight.mjs';
import {createCartRepository} from '../src/features/cart/infrastructure/cartRepository.mjs';
const owner='00000000-0000-4000-8000-000000000001', id='00000000-0000-4000-8000-000000000002', product='00000000-0000-4000-8000-000000000003';
test('explicit all-clear remains advisory data only',()=>assert.deepEqual(parseCheckoutPreflight({available:true,conflicts:[]},[id]),{available:true,conflicts:[]}));
test('all known conflict reasons give useful per-item instructions',()=>{
 for(const reason of ['dates_unavailable','product_inactive','insufficient_quantity','dates_required','subscription_unavailable','subscription_plan_unavailable']){
  const result=parseCheckoutPreflight({available:false,conflicts:[{cart_item_id:id,reason,product_title:'untrusted ignored'}]},[id]);
  assert.equal(result.conflicts[0].cartItemId,id);assert.ok(result.conflicts[0].message.length>10);assert.ok(!JSON.stringify(result).includes('untrusted ignored'));
 }
});
test('unknown reason fails closed with generic review instruction',()=>assert.match(parseCheckoutPreflight({available:false,conflicts:[{cart_item_id:id,reason:'new_reason'}]},[id]).conflicts[0].message,/needs review/));
test('malformed, contradictory and unrelated response cannot become all-clear',()=>{
 for(const data of [null,[],{}, {available:'true',conflicts:[]},{available:true},{available:false,conflicts:[]},{available:true,conflicts:[{cart_item_id:id,reason:'dates_required'}]},{available:false,conflicts:[{cart_item_id:product,reason:'dates_required'}]},{available:false,conflicts:[null]}])assert.throws(()=>parseCheckoutPreflight(data,[id]),e=>e.code==='backend');
});
function fixture({missing=false,changeAt=Infinity,payload={available:true,conflicts:[]},rpcError=false}={}){
 let reads=0;const calls=[];
 const client={auth:{getUser:async()=>({data:{user:{id:++reads>=changeAt?product:owner}}})},from(table){calls.push(table);const q={select(){return q;},eq(){return q;},in(){return q;},then(resolve){resolve({data:table==='cart_items'?[{id,product_id:product}]:missing?[]:[{id:product}]});}};return q;},rpc:async(name,args)=>{calls.push({name,args});return rpcError?{error:{message:'denied',code:'42501'}}:{data:payload};}};
 return {repo:createCartRepository(client,owner),calls};
}
test('vanished listing blocks RPC instead of silent available=true',async()=>{const {repo,calls}=fixture({missing:true});await assert.rejects(()=>repo.checkAvailability([id]),e=>e.code==='not_found');assert.ok(calls.every(c=>typeof c==='string'));});
test('account changes during each preflight phase reject stale evidence',async()=>{for(const changeAt of [2,3,4]){const {repo}=fixture({changeAt});await assert.rejects(()=>repo.checkAvailability([id]),e=>e.code==='unauthenticated');}});
test('RPC permissions failure remains error, never empty success',async()=>{const {repo}=fixture({rpcError:true});await assert.rejects(()=>repo.checkAvailability([id]),e=>e.code==='backend');});
test('repository forwards selected owned IDs and returns mapped conflicts without mutation',async()=>{
 const {repo,calls}=fixture({payload:{available:false,conflicts:[{cart_item_id:id,reason:'dates_required'}]}});
 assert.match((await repo.checkAvailability([id])).conflicts[0].message,/start and end/);
 assert.deepEqual(calls,['cart_items','products',{name:'check_cart_availability',args:{p_cart_item_ids:[id]}}]);
});

test('prototype property reason remains plain text',()=>assert.equal(typeof parseCheckoutPreflight({available:false,conflicts:[{cart_item_id:id,reason:'__proto__'}]},[id]).conflicts[0].message,'string'));
