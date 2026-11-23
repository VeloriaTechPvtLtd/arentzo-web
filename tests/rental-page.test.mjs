import test from 'node:test';
import assert from 'node:assert/strict';
import { rentalPage, mergeRentals } from '../src/features/rentals/domain/rentalPage.js';
test('lookahead determines continuation without dropping twentieth item',()=>{const a=Array.from({length:21},(_,i)=>({id:String(i)}));assert.equal(rentalPage(a,0).items.length,20);assert.equal(rentalPage(a,0).nextOffset,20);});
test('last page terminates',()=>{assert.equal(rentalPage([{id:'a'}],20).nextOffset,null);});
test('overlap merges by id with freshest values',()=>{assert.deepEqual(mergeRentals([{id:'a',v:1}],[{id:'a',v:2},{id:'b',v:3}]),[{id:'a',v:2},{id:'b',v:3}]);});
test('empty page terminates',()=>{assert.deepEqual(rentalPage([],40),{items:[],nextOffset:null});});
test('bad offsets rejected',()=>{for(const n of [-1,1.5,NaN]) assert.throws(()=>rentalPage([],n));});
