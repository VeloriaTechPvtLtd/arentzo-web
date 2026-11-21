import {privateDetailsIssue} from './privateDetailsValidation.mjs';
import { isVerifiedDraftDev } from './devDraftFlow.mjs';
const fields = ['brand','model','condition','color','original_price_per_day','discounted_rate_per_day','self_pickup'];
const columns = 'id,provider_id,title,brand,model,condition,color,original_price_per_day,discounted_rate_per_day,self_pickup,status,verification_status,visibility,is_active,deleted_at';
export class DraftConflict extends Error { constructor() { super('Draft changed or is no longer editable. Reload it before saving again.'); this.name='DraftConflict'; } }
export function createPrivateDetailsEditor(client,url,timeoutMs=20000) {
 async function bounded(fn) {let timer;try{return await Promise.race([Promise.resolve().then(fn),new Promise((_,reject)=>{timer=setTimeout(()=>reject(new Error('Request timed out. Reload to check the saved draft before editing again.')),timeoutMs);})]);}finally{clearTimeout(timer);}}
 function guard(){if(!isVerifiedDraftDev(url))throw new Error('Draft editing is available only in Rental Dev.');}
 async function actor(providerId){guard();const auth=await bounded(()=>client.auth.getUser());if(auth.error||!auth.data?.user?.id)throw new Error('Sign in to edit drafts.');const owner=await bounded(()=>client.from('service_providers').select('id').eq('id',providerId).eq('user_id',auth.data.user.id).maybeSingle());if(owner.error)throw owner.error;if(!owner.data)throw new Error('Owned provider profile is required.');return auth.data.user.id;}
 async function sameActor(id){const auth=await bounded(()=>client.auth.getUser());if(auth.error||auth.data?.user?.id!==id)throw new Error('Your account changed. Reload drafts.');}
 function scoped(q,providerId){return q.eq('provider_id',providerId).eq('status','draft').eq('verification_status','draft').eq('visibility','private').eq('is_active',false).is('deleted_at',null);}
 return {
  async list(providerId){const id=await actor(providerId);const rows=[];for(let offset=0;offset<1000;offset+=100){const result=await bounded(()=>scoped(client.from('products').select(columns),providerId).order('id').range(offset,offset+99));if(result.error)throw result.error;rows.push(...(result.data||[]));if((result.data||[]).length<100){await sameActor(id);return rows;}}throw new Error('Too many drafts to load.');},
  async save(providerId,original,changes){
   const id=await actor(providerId);
   if(!original?.id||original.provider_id!==providerId||original.status!=='draft'||original.verification_status!=='draft'||original.visibility!=='private'||original.is_active!==false||original.deleted_at!==null)throw new DraftConflict();
   if(Object.keys(changes).length!==fields.length||Object.keys(changes).some(k=>!fields.includes(k))||fields.some(k=>!(k in original)))throw new Error('Complete details and original snapshot are required.');
   const issue=privateDetailsIssue(changes);if(issue)throw new Error(issue);
   const patch={...changes};
   for(const key of ['brand','model','condition','color']){if(typeof patch[key]!=='string'||!patch[key].trim())throw new Error('Brand, model, condition and color are required.');patch[key]=patch[key].trim();if(original[key]!==null&&typeof original[key]!=='string')throw new Error('Reload invalid original details.');}
   for(const key of ['original_price_per_day','discounted_rate_per_day']){if(typeof patch[key]!=='number'||!Number.isFinite(patch[key])||patch[key]<0)throw new Error('Rates must be finite nonnegative numbers.');if(original[key]!==null&&(typeof original[key]!=='number'||!Number.isFinite(original[key])))throw new Error('Reload invalid original rates.');}
   if(patch.discounted_rate_per_day>patch.original_price_per_day)throw new Error('Discounted rate cannot exceed base rate.');
   // Notification trigger returns early for OLD base IS NULL or unchanged base.
   // Existing base prices are immutable in this slice. CAS guards that exact old value.
   if(original.original_price_per_day!==null&&patch.original_price_per_day!==original.original_price_per_day)throw new Error('Existing base rates are read-only in this no-notification editor.');
   if(typeof patch.self_pickup!=='boolean'||(original.self_pickup!==null&&typeof original.self_pickup!=='boolean'))throw new Error('Pickup must be a boolean.');
   await sameActor(id);
   // Each overwritten value participates in a single SQL UPDATE predicate. NULL uses IS NULL.
   let q=scoped(client.from('products').update(patch),providerId).eq('id',original.id);
   for(const key of fields)q=original[key]===null?q.is(key,null):q.eq(key,original[key]);
   const result=await bounded(()=>q.select(columns));if(result.error)throw result.error;
   await sameActor(id);
   if(!Array.isArray(result.data)||result.data.length!==1)throw new DraftConflict();
   const row=result.data[0];
   // PostgREST JSON numeric values are numbers; tolerate numeric-string decoders only for rates.
   for(const key of ['original_price_per_day','discounted_rate_per_day'])if(typeof row[key]==='string'&&row[key].trim()&&Number.isFinite(Number(row[key])))row[key]=Number(row[key]);
   if(row.id!==original.id||row.provider_id!==providerId||row.status!=='draft'||row.verification_status!=='draft'||row.visibility!=='private'||row.is_active!==false||row.deleted_at!==null||fields.some(k=>row[k]!==patch[k]))throw new DraftConflict();
   return row;
  }
 };
}
