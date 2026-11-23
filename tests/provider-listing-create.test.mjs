import test from 'node:test';
import assert from 'node:assert/strict';
import { createOwnedListingDraft } from '../src/features/provider-dashboard/application/createOwnedListingDraft.mjs';
const id = n => `${n.repeat(8)}-${n.repeat(4)}-4${n.repeat(3)}-8${n.repeat(3)}-${n.repeat(12)}`;
const input = {productId:id('1'),providerId:id('2'),categoryId:id('3'),subcategoryId:id('4'),title:' Camera ',description:' Test draft '};
function fixture(overrides={}) {
 const calls=[];let saved=null;
 const client={auth:{getUser:async()=>({data:{user:{id:id('5')}}})},from(table){let inserted;const q={};for(const m of ['select','eq','is'])q[m]=(...a)=>{calls.push([table,m,...a]);return q;};q.insert=(p,options)=>{assert.deepEqual(options,{defaultToNull:false});assert.equal('verification_status' in p,false);inserted=p;calls.push([table,'insert',p]);return q;};q.maybeSingle=async()=>({data:table==='products'?saved:overrides[table]===null?null:{id:'verified'}});q.single=async()=>{saved={...inserted,verification_status:'draft'};return {data:overrides.ack??saved};};return q;}};
 return {client,calls};
}
test('create is disabled by default without any reads or writes',async()=>{const f=fixture();await assert.rejects(createOwnedListingDraft(f.client,input),/acceptance/);assert.equal(f.calls.length,0);});
test('owned creation explicitly overrides unsafe defaults, never publishes, retry only reads',async()=>{const f=fixture();const row=await createOwnedListingDraft(f.client,input,{enabled:true});assert.equal(row.is_active,false);assert.equal(row.status,'draft');assert.equal(row.visibility,'private');assert.equal(row.verification_status,'draft');assert.equal(row.title,'Camera');await createOwnedListingDraft(f.client,input,{enabled:true});assert.equal(f.calls.filter(x=>x[1]==='insert').length,1);assert.ok(f.calls.some(x=>x[0]==='service_providers'&&x[1]==='eq'&&x[2]==='user_id'));});
test('missing owner or catalogue relationship prevents insertion',async()=>{for(const table of ['service_providers','subcategories','categories']){const f=fixture({[table]:null});await assert.rejects(createOwnedListingDraft(f.client,input,{enabled:true}));assert.ok(!f.calls.some(x=>x[1]==='insert'));}});
test('rejects field smuggling, invalid ids, no session and unsafe acknowledgment',async()=>{for(const bad of [{...input,is_active:true},{...input,productId:'bad'},{...input,title:' '}])await assert.rejects(createOwnedListingDraft(fixture().client,bad,{enabled:true}));const f=fixture();f.client.auth.getUser=async()=>({data:{user:null}});await assert.rejects(createOwnedListingDraft(f.client,input,{enabled:true}),/Sign in/);await assert.rejects(createOwnedListingDraft(fixture({ack:{}}).client,input,{enabled:true}),/not confirmed/);});
test('same operation identity with changed content fails rather than overwriting',async()=>{const f=fixture();await createOwnedListingDraft(f.client,input,{enabled:true});await assert.rejects(createOwnedListingDraft(f.client,{...input,title:'Changed'},{enabled:true}),/not confirmed/);assert.equal(f.calls.filter(x=>x[1]==='insert').length,1);});
test('account switch before insertion fails closed',async()=>{const f=fixture();let n=0;f.client.auth.getUser=async()=>({data:{user:{id:++n===1?id('5'):id('6')}}});await assert.rejects(createOwnedListingDraft(f.client,input,{enabled:true}),/account changed/);assert.ok(!f.calls.some(x=>x[1]==='insert'));});
test('DB-owned verification flag must still be draft in acknowledgment',async()=>{const f=fixture({ack:{id:input.productId,provider_id:input.providerId,category_id:input.categoryId,subcategory_id:input.subcategoryId,title:'Camera',description:'Test draft',status:'draft',visibility:'private',is_active:false,verification_status:'approved'}});await assert.rejects(createOwnedListingDraft(f.client,input,{enabled:true}),/not confirmed/);});
test('actual installed PostgREST client sends missing=default without forbidden column',async()=>{
 const {PostgrestClient}=await import('@supabase/postgrest-js');let observed;
 const pg=new PostgrestClient('https://example.invalid/rest/v1',{fetch:async(url,options)=>{observed={url:String(url),headers:new Headers(options.headers),payload:JSON.parse(options.body)};return new Response(JSON.stringify({id:'fake'}),{status:201,headers:{'Content-Type':'application/json'}});}});
 await pg.from('products').insert({title:'Synthetic',status:'draft',visibility:'private',is_active:false},{defaultToNull:false}).select('id,verification_status').single();
 assert.ok(observed.headers.get('Prefer').includes('missing=default'));assert.equal('verification_status' in observed.payload,false);assert.ok(observed.url.includes('verification_status'));
});
test('only explicit SQL rollback errors are definitive; duplicate/transport remain uncertain',async()=>{
 const {DraftRejected}=await import('../src/features/provider-dashboard/application/createOwnedListingDraft.mjs');
 for(const code of ['42501','23502','23503','23514','22P02','23505','']){
  const f=fixture();const from=f.client.from;f.client.from=table=>{const q=from(table);q.single=async()=>({error:{code,message:'synthetic failure'}});return q;};
  await assert.rejects(createOwnedListingDraft(f.client,input,{enabled:true}),error=>['42501','23502','23503','23514','22P02'].includes(code)?error instanceof DraftRejected:!(error instanceof DraftRejected));
 }
});
