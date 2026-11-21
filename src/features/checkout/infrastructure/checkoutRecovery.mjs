const DEV = 'https://astiltnwyoxtcisedcyx.supabase.co';
const transactionPattern = /^[A-Za-z0-9_-]{1,128}$/;
const record = value => value !== null && typeof value === 'object' && !Array.isArray(value);

/** Exposes a small display state only, never raw payment context or callback data. */
export function mapRecoveryContext(context, owner, transaction) {
  if (!record(context) || context.payer_id !== owner || context.transaction_id !== transaction || typeof context.status !== 'string') throw new Error('Payment status could not be confirmed for this account.');
  const result = context.result;
  if (result === null) {
    if (['failed', 'cancelled', 'canceled'].includes(context.status.toLowerCase())) return { state: 'not_completed' };
    // Even a paid ledger record is not evidence that bookings were finalized.
    return { state: 'pending' };
  }
  if (!record(result) || !record(result.data) || result.data.transaction_id !== transaction) throw new Error('Payment status could not be confirmed for this account.');
  if (result.success === true && Number.isSafeInteger(result.data.item_count) && result.data.item_count > 0) return { state: 'completed' };
  if (result.success === false && result.data.item_count === 0) {
    if (result.code === 'CHECKOUT_REFUNDED' && result.data.refund_status === 'refunded') return { state: 'refunded' };
    if (result.code === 'CHECKOUT_REFUND_PENDING' && ['pending', 'requested'].includes(result.data.refund_status)) return { state: 'refund_pending' };
  }
  throw new Error('Payment status could not be confirmed for this account.');
}

/** Rental Dev-only, SELECT-only existing RPC. Never calls gateway verification/finalization. */
export function createCheckoutRecovery(client, owner, projectUrl, timeoutMs = 15000) {
  async function deadline(action) {
    let timer;
    try { return await Promise.race([Promise.resolve().then(action),new Promise((_,reject)=>{timer=setTimeout(()=>reject(new Error('Status check timed out. Nothing was charged or changed.')),timeoutMs);})]); }
    finally { clearTimeout(timer); }
  }
  async function verifyOwner() {
    let response;
    try { response=await deadline(()=>client.auth.getUser()); }
    catch { throw new Error('Your session could not be checked. Sign in and try again.'); }
    if(response.error || !owner || response.data?.user?.id!==owner) throw new Error('Sign in to the same account to check this transaction.');
  }
  return { async check(reference) {
    if(projectUrl !== DEV) throw new Error('Payment status lookup is available in Rental Dev only.');
    const transaction=typeof reference==='string'?reference.trim():'';
    if(!transactionPattern.test(transaction)) throw new Error('Enter a valid transaction reference, not a payment link.');
    await verifyOwner();
    let response;
    try { response=await deadline(()=>client.rpc('payment_verification_context_v2',{p_transaction_id:transaction})); }
    catch { throw new Error('Status could not be checked. Nothing was charged or changed. Try again when connected.'); }
    await verifyOwner();
    if(response.error) throw new Error('This transaction could not be confirmed for your account. Check the reference or contact support.');
    return mapRecoveryContext(response.data,owner,transaction);
  }};
}
