import test from 'node:test';
import assert from 'node:assert/strict';
import { createDevDraftFlow, isVerifiedDraftDev } from '../src/features/provider-dashboard/application/devDraftFlow.mjs';
const dev='https://astiltnwyoxtcisedcyx.supabase.co';
test('fixed project guard rejects production, lookalikes, embedded credentials and extra paths',async()=>{
 assert.equal(isVerifiedDraftDev(dev),true);
 for(const url of ['',undefined,'https://kkvikbxedvyahjmljytg.supabase.co',dev+'.evil.test',dev+'/rest/v1',dev+'?x=1',dev+'#x','https://user:pass@astiltnwyoxtcisedcyx.supabase.co','http://astiltnwyoxtcisedcyx.supabase.co']){
  assert.equal(isVerifiedDraftDev(url),false);
  const flow=createDevDraftFlow({from(){assert.fail('blocked URL must not query');}},url);
  await assert.rejects(flow.catalogue(),/verified Rental Dev/);await assert.rejects(flow.save({}),/verified Rental Dev/);
 }
});
test('catalogue uses active exact source labels and paginates, without fabricated names',async()=>{
 const calls=[];const client={from(table){const q={};for(const name of ['select','eq','order'])q[name]=(...a)=>{calls.push([table,name,...a]);return q;};q.range=async(start,end)=>{calls.push([table,'range',start,end]);return {data:table==='categories'?[{id:'c',name:'Source category'},{id:'unnamed',name:null}]:start===0?Array.from({length:100},(_,i)=>({id:`s${i}`,name:`Source ${i}`,category_id:'c'})):[]};};return q;}};
 const result=await createDevDraftFlow(client,dev).catalogue();assert.deepEqual(result.categories,[{id:'c',name:'Source category'}]);assert.equal(result.subcategories.length,100);assert.ok(calls.some(c=>c[0]==='subcategories'&&c[1]==='range'&&c[2]===100));assert.equal(calls.filter(c=>c[1]==='eq').every(c=>c[2]==='is_active'&&c[3]===true),true);
});
test('catalogue failure surfaces, not empty success',async()=>{
 const q={select(){return q;},eq(){return q;},order(){return q;},range:async()=>({error:new Error('offline')})};await assert.rejects(createDevDraftFlow({from:()=>q},dev).catalogue(),/offline/);
});
test('wedged catalogue has bounded retryable wait',async()=>{
 const q={select(){return q;},eq(){return q;},order(){return q;},range:()=>new Promise(()=>{})};await assert.rejects(createDevDraftFlow({from:()=>q},dev,5).catalogue(),/timed out/);
});
test('save suppresses completion after actor changes',async()=>{
 let authCalls=0;const payload={productId:'11111111-1111-4111-8111-111111111111',providerId:'22222222-2222-4222-8222-222222222222',categoryId:'33333333-3333-4333-8333-333333333333',subcategoryId:'44444444-4444-4444-8444-444444444444',title:'Synthetic draft',description:'Only a mock'};
 const row={id:payload.productId,provider_id:payload.providerId,category_id:payload.categoryId,subcategory_id:payload.subcategoryId,title:payload.title,description:payload.description,status:'draft',verification_status:'draft',visibility:'private',is_active:false};
 const client={auth:{getUser:async()=>({data:{user:{id:++authCalls===3?'other':'owner'}}})},from(table){const q={};for(const m of ['select','eq','is'])q[m]=()=>q;q.maybeSingle=async()=>({data:table==='products'?row:{id:'owned'}});return q;}};
 await assert.rejects(createDevDraftFlow(client,dev).save(payload),/account changed/);
});
