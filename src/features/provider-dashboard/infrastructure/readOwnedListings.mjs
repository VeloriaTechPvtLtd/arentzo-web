/** Read only: verified session and explicit provider ownership, not public visibility. */
export async function readOwnedListings(client,providerId,timeoutMs=15000){
  const deadline=async operation=>{let timer;try{return await Promise.race([Promise.resolve().then(operation),new Promise((_,reject)=>{timer=setTimeout(()=>reject(new Error('Listing request timed out. Retry when connected.')),timeoutMs)})]);}finally{clearTimeout(timer)}};
  const session=await deadline(()=>client.auth.getUser());
  const userId=session.data?.user?.id;
  if(session.error||!userId)throw new Error('Sign in to view your listings.');
  const owner=await deadline(()=>client.from('service_providers').select('id').eq('id',providerId).eq('user_id',userId).maybeSingle());
  if(owner.error)throw owner.error;
  if(!owner.data)throw new Error('This provider account is not your own.');
  const records=new Map();
  for(let offset=0;offset<1000;offset+=100){
    const current=await deadline(()=>client.auth.getUser());
    if(current.error||current.data?.user?.id!==userId)throw new Error('Your account changed. Reload listings.');
    const result=await deadline(()=>client.from('products').select('id,title,name,category_id,daily_rate,currency,quantity_available,status,is_active,condition,average_rating,view_count,images,image_url,thumbnail_url,verification_status,visibility').eq('provider_id',providerId).is('deleted_at',null).order('created_at',{ascending:false}).order('id',{ascending:false}).range(offset,offset+99));
    if(result.error)throw result.error;
    const rows=result.data||[];
    for(const row of rows)records.set(row.id,row);
    if(rows.length<100)return [...records.values()];
  }
  throw new Error('Listing read limit reached. Results were not shown as a complete catalog.');
}
