// Canonical mobile bacc8b71 provider_basic_details_screen.dart / AppStrings.
export const PRODUCT_CONDITIONS = Object.freeze([
 ['new','New'],['like_new','Like New'],['excellent','Excellent'],['good','Good'],['fair','Fair'],['refurbished','Refurbished'],
]);
// Conservative web input limits, not claimed database/mobile schema limits.
export const DETAIL_LENGTHS = Object.freeze({brand:120,model:120,color:64});
export function privateDetailsIssue(values){
 for(const [key,max] of Object.entries(DETAIL_LENGTHS))if(typeof values[key]!=='string'||!values[key].trim()||values[key].trim().length>max)return `${key} is required and must be at most ${max} characters.`;
 if(!PRODUCT_CONDITIONS.some(([value])=>value===values.condition))return 'Choose a supported product condition.';
 for(const key of ['original_price_per_day','discounted_rate_per_day']){
  const value=values[key];if(typeof value!=='number'||!Number.isFinite(value)||value<0||value>999999999.99)return 'Rates must be between 0 and 999,999,999.99.';
  if(Math.abs(value*100-Math.round(value*100))>0.00001)return 'Rates support up to two decimal places; existing higher-precision rates need review, not rounding.';
 }
 if(values.discounted_rate_per_day>values.original_price_per_day)return 'Discounted rate cannot exceed base rate.';
 if(typeof values.self_pickup!=='boolean')return 'Pickup must be a boolean.';
 return null;
}
