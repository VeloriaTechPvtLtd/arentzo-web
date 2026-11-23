import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import ts from 'typescript';
const path = new URL('../src/features/rentals/infrastructure/SupabaseRentalRepository.ts', import.meta.url);
const source = readFileSync(path,'utf8').replace(/import .*getSupabaseClient.*\n/, '').replace(/import .*rentalPage.*\n/, '');
const js = ts.transpileModule(source, {compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
const helper = readFileSync(new URL('../src/features/rentals/domain/rentalPage.js',import.meta.url),'utf8');
const module = await import('data:text/javascript;base64,'+Buffer.from('const getSupabaseClient=()=>globalThis.__rentalTestClient;\n'+helper+'\n'+js).toString('base64'));
function fixture(rows,error=null){const calls=[];const q={};for(const m of ['from','select','eq','order','range','maybeSingle']) q[m]=(...args)=>{calls.push([m,...args]);return q};q.then=(resolve,reject)=>Promise.resolve({data:rows,error}).then(resolve,reject);globalThis.__rentalTestClient=q;return calls;}
test('repository scopes customer and stable order, reads lookahead at requested offset',async()=>{const calls=fixture(Array.from({length:21},(_,i)=>({id:String(i)})));const page=await new module.SupabaseRentalRepository().getForCustomer('customer-A',100);assert.equal(page.items.length,20);assert.equal(page.nextOffset,120);assert.ok(calls.some(c=>c[0]==='eq'&&c[1]==='renter_id'&&c[2]==='customer-A'));assert.deepEqual(calls.filter(c=>c[0]==='order').map(c=>c[1]),['created_at','id']);assert.deepEqual(calls.find(c=>c[0]==='range'),['range',100,120]);});
test('repository does not turn permission errors into empty success',async()=>{fixture(null,new Error('denied'));await assert.rejects(new module.SupabaseRentalRepository().getForCustomer('customer-A'),/denied/);});
test('invalid cursor fails before query',async()=>{const calls=fixture([]);await assert.rejects(new module.SupabaseRentalRepository().getForCustomer('customer-A',-1));assert.equal(calls.length,0);});
