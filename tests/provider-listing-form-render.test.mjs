import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {createRequire} from 'node:module';
import {isVerifiedDraftDev} from '../src/features/provider-dashboard/application/devDraftFlow.mjs';
const require=createRequire(import.meta.url);
function render(user,url){
 const original=process.env.SUPABASE_URL;process.env.SUPABASE_URL=url;
 try {
  const code=ts.transpileModule(fs.readFileSync(new URL('../src/features/provider-dashboard/ui/components/PrivateDraftForm.tsx',import.meta.url),'utf8'),{compilerOptions:{jsx:ts.JsxEmit.ReactJSX,module:ts.ModuleKind.CommonJS}}).outputText;
  const exports={};const fakeRequire=id=>id.includes('useAuth')?{useAuth:()=>({user})}:id.includes('supabase/client')?{getSupabaseClient:()=>{throw new Error('render must not connect');}}:id.includes('devDraftFlow')?{isVerifiedDraftDev}:require(id);
  new Function('require','exports',code)(fakeRequire,exports);
  return renderToStaticMarkup(React.createElement(exports.PrivateDraftForm,{onSaved(){}}));
 } finally {if(original===undefined)delete process.env.SUPABASE_URL;else process.env.SUPABASE_URL=original;}
}
test('form renders only on verified Dev for authenticated provider',()=>{
 const user={id:'u',providerId:'p',role:'service_provider'};
 for(const u of [null,{...user,role:'customer'},{...user,providerId:null}])assert.equal(render(u,'https://astiltnwyoxtcisedcyx.supabase.co'),'');
 assert.equal(render(user,'https://kkvikbxedvyahjmljytg.supabase.co'),'');
 const html=render(user,'https://astiltnwyoxtcisedcyx.supabase.co');
 for(const text of ['Save private draft','Loading available categories','<summary','<label>Title','<label>Subcategory','aria-live="polite"','<fieldset disabled'])assert.ok(html.includes(text));
 assert.ok(!html.includes('type="file"'));assert.ok(!html.includes('Publish now'));
});
