import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
function fromTs(path, overrides={}) {
  const source=fs.readFileSync(new URL(path,import.meta.url),'utf8');
  const code=ts.transpileModule(source,{compilerOptions:{jsx:ts.JsxEmit.ReactJSX,module:ts.ModuleKind.CommonJS,esModuleInterop:true}}).outputText;
  const exports={};new Function('require','exports',code)(name=>Object.hasOwn(overrides,name)?overrides[name]:require(name),exports);
  return exports;
}
const provider={id:'provider', role:'service_provider'};
const choice={ownerId:provider.id,role:'customer'};
const {keepRoleSelection,resolveActiveRole}=fromTs('../src/features/auth/application/services/activeRoleSelection.ts');
test('selection remains Customer across same-account refresh, without changing capability',()=>{
  const refreshed={...provider,name:'New'};
  assert.equal(resolveActiveRole(refreshed,keepRoleSelection(choice,refreshed)),'customer');
  assert.equal(refreshed.role,'service_provider');
});
test('account changes, sign-out and capability loss cannot carry provider mode',()=>{
  assert.equal(keepRoleSelection(choice,{...provider,id:'other'}),null);
  assert.equal(keepRoleSelection(choice,null),null);
  assert.equal(resolveActiveRole({...provider,role:'customer'},{...choice,role:'service_provider'}),'customer');
});
test('rendered header honors selected customer vs provider view',()=>{
  function render(activeRole){
    const {AppHeader}=fromTs('../src/shared/components/layout/AppHeader.tsx',{
      'next/link':({children,...props})=>React.createElement('a',props,children),
      'next/navigation':{useRouter:()=>({}),usePathname:()=>'/browse',useSearchParams:()=>new URLSearchParams()},
      '../../../features/auth/ui/context/AuthContext':{useAuth:()=>({user:provider,activeRole})},
      '../../hooks/useDrawer':{useDrawer:()=>({})},'./AppHeader.css':{}
    });
    return renderToStaticMarkup(React.createElement(AppHeader));
  }
  assert.match(render('customer'),/app-header--customer/);
  assert.doesNotMatch(render('customer'),/Provider Console/);
  assert.match(render('service_provider'),/Provider Console/);
});
