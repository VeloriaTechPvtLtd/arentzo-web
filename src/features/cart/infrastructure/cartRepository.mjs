import {CartError,uuid,quantity,dateFields,updateFields} from '../domain/cartValidation.mjs';
export {CartError};

/**
 * Source-only adapter for an injected Supabase client. No credentials, auth mutations,
 * price calculation, checkout, financial writes or automatic mutation retries.
 * list -> rows; add/update -> saved row; remove -> {id}; availability -> RPC data.
 */
export function createCartRepository(client, expectedUserId, {timeoutMs=15000}={}) {
  if(!Number.isFinite(timeoutMs)||timeoutMs<=0) throw new CartError('validation','Timeout must be positive.');
  async function deadline(operation) {
    let timer;
    try {
      return await Promise.race([
        Promise.resolve().then(operation),
        new Promise((_,reject)=>{timer=setTimeout(()=>reject(new Error('Request deadline exceeded')),timeoutMs);}),
      ]);
    } finally { clearTimeout(timer); }
  }
  async function userId() {
    let result;
    try { result=await deadline(()=>client.auth.getUser()); }
    catch { throw new CartError('unauthenticated','Could not verify your session. Sign in and retry.'); }
    if(result.error||!result.data?.user?.id) throw new CartError('unauthenticated','Sign in to manage your cart.');
    if(expectedUserId && result.data.user.id !== expectedUserId) throw new CartError('unauthenticated','Your account changed. Reload the cart before continuing.');
    return uuid(result.data.user.id,'User ID');
  }
  async function execute(operation,mutating=false) {
    let result;
    try { result=await deadline(operation); }
    catch {
      throw new CartError(mutating?'outcome_uncertain':'backend',mutating?'The cart change may have been saved. Refresh your cart before trying again.':'Could not load your cart. Retry when connected.');
    }
    if(result.error) {
      const error=result.error;
      const transport=!error.code||/timeout|network|fetch|abort/i.test(String(error.message));
      throw new CartError(mutating&&transport?'outcome_uncertain':'backend',mutating&&transport?'The cart change may have been saved. Refresh your cart before trying again.':'The cart request was rejected. Refresh and try again.');
    }
    return result.data;
  }
  function savedRow(rows) {
    if(!rows?.length) throw new CartError('not_found','This cart item is no longer available. Refresh your cart.');
    return rows[0];
  }
  return {
    async list() {
      const user=await userId();
      const cart=await execute(()=>client.from('cart_items').select('*').eq('user_id',user).range(0,999));
      if(cart.length>=1000) throw new CartError('limit_exceeded','Your cart exceeds this view’s safe loading limit. No incomplete cart is displayed.');
      const ids=[...new Set(cart.map(row=>row.product_id).filter(Boolean))];
      const products=new Map();
      for(let start=0;start<ids.length;start+=100) {
        if(await userId()!==user) throw new CartError('unauthenticated','Your account changed. Reload the cart.');
        const rows=await execute(()=>client.from('products').select('id,title,daily_rate,images,currency,is_active').in('id',ids.slice(start,start+100)));
        for(const product of rows) products.set(product.id,product);
      }
      return cart.map(row=>({...row,products:products.get(row.product_id)??null}));
    },
    async add(input) {
      const user=await userId();
      if(!input||typeof input!=='object') throw new CartError('validation','Provide a cart item.');
      const row={user_id:user,product_id:uuid(input.productId,'Product ID'),...dateFields(input.start,input.end),quantity:quantity(input.quantity),rental_type:'daily',is_subscription:false};
      if(input.id!==undefined) row.id=uuid(input.id,'Cart item ID');
      const available=await execute(()=>client.from('products').select('id,is_active,quantity_available').eq('id',row.product_id));
      const product=available?.[0];
      if(!product||product.is_active!==true) throw new CartError('validation','This product is unavailable. Refresh before adding it.');
      if(product.quantity_available!=null&&row.quantity>Number(product.quantity_available)) throw new CartError('validation','Requested quantity exceeds the currently listed availability.');
      if(await userId()!==user) throw new CartError('unauthenticated','Your account changed. Reload the cart.');
      return savedRow(await execute(()=>client.from('cart_items').insert(row).select(),true));
    },
    async update(id,input) {
      const user=await userId();uuid(id,'Cart item ID');
      const patch=updateFields(input);
      return savedRow(await execute(()=>client.from('cart_items').update(patch).eq('id',id).eq('user_id',user).eq('rental_type','daily').eq('is_subscription',false).select(),true));
    },
    async remove(id) {
      const user=await userId();uuid(id,'Cart item ID');
      savedRow(await execute(()=>client.from('cart_items').delete().eq('id',id).eq('user_id',user).select('id'),true));
      return {id};
    },
    async checkAvailability(ids) {
      const user=await userId();
      if(!Array.isArray(ids)||!ids.length||new Set(ids).size!==ids.length) throw new CartError('validation','Select unique cart items.');
      ids.forEach(id=>uuid(id,'Cart item ID'));
      const owned=await execute(()=>client.from('cart_items').select('id').eq('user_id',user).in('id',ids));
      if(owned.length!==ids.length||ids.some(id=>!owned.some(row=>row.id===id))) throw new CartError('validation','Refresh your cart before checking availability.');
      // Advisory only: never a booking, price guarantee or capacity reservation.
      return execute(()=>client.rpc('check_cart_availability',{p_cart_item_ids:ids}));
    },
  };
}
