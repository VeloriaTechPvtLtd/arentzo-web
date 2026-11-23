/** Stable UI-facing failure category; never includes a token or raw request payload. */
export class CartError extends Error {
  constructor(code, message) { super(message); this.name='CartError'; this.code=code; }
}
export function uuid(value, label='ID') {
  if(typeof value!=='string'||!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value)) throw new CartError('validation',`${label} must be a valid UUID.`);
  return value;
}
export function quantity(value) {
  if(!Number.isSafeInteger(value)||value<=0) throw new CartError('validation','Quantity must be a positive whole number.');
  return value;
}
function timestamp(value) {
  // Require an explicit offset: never interpret a customer's dates in the device timezone.
  if(typeof value!=='string'||!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,3})?(Z|[+-]\d{2}:\d{2})$/.test(value)||!Number.isFinite(Date.parse(value))) throw new CartError('validation','Choose a valid date and time including its timezone.');
  const [year,month,day]=value.slice(0,10).split('-').map(Number);
  const leap=year%4===0&&(year%100!==0||year%400===0);
  const days=[31,leap?29:28,31,30,31,30,31,31,30,31,30,31];
  if(month<1||month>12||day<1||day>days[month-1]||Number(value.slice(11,13))>23||Number(value.slice(14,16))>59||Number(value.slice(17,19))>59) throw new CartError('validation','Choose an actual calendar date and time.');
  return new Date(value).toISOString();
}
export function dateFields(start,end) {
  const a=timestamp(start),b=timestamp(end);
  if(Date.parse(b)<=Date.parse(a)) throw new CartError('validation','Rental end must be later than its start.');
  return {start_date:a,end_date:b,start_datetime:a,end_datetime:b};
}
export function updateFields(input) {
  if(!input||typeof input!=='object'||Array.isArray(input)) throw new CartError('validation','Provide cart changes.');
  const fields={};
  if('start' in input || 'end' in input) Object.assign(fields,dateFields(input.start,input.end));
  if('quantity' in input) fields.quantity=quantity(input.quantity);
  if(!Object.keys(fields).length) throw new CartError('validation','Provide quantity or both rental dates.');
  return fields;
}
