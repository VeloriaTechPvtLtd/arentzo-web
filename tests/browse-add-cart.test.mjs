import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
function load(path,overrides) {
 const source=fs.readFileSync(new URL(path,import.meta.url),'utf8');
 const code=ts.transpileModule(source,{compilerOptions:{jsx:ts.JsxEmit.ReactJSX,module:ts.ModuleKind.CommonJS,esModuleInterop:true}}).outputText;
 const exports={};new Function('require','exports',code)(name=>Object.hasOwn(overrides,name)?overrides[name]:require(name),exports);
 return exports;
}
const chair={id:'chair',name:'Synthetic chair',isAvailable:true,price:499,reviewCount:0};
test('Browse stages the available product, then opens the existing dates/cart drawer',()=>{
 const calls=[];let add;
 const {CustomerHomePage}=load('../src/features/customer-home/ui/pages/CustomerHomePage.tsx',{
   '../components/CategoryTabs':{CategoryTabs:()=>null},
   '../components/ProductsGrid':{ProductsGrid:props=>{add=props.onAddToCart;return null;}},
   '../layouts/CustomerLayout':{CustomerLayout:({children})=>children},
   '@/shared/hooks/useCart':{useCart:()=>({items:[],addToCart:p=>calls.push(['draft',p.id])})},
   '@/shared/hooks/useDrawer':{useDrawer:()=>({openCheckout:()=>calls.push(['open existing drawer'])})},
   '@/features/catalog/ui/hooks/useCatalogProducts':{useCatalogProducts:()=>({products:[chair,{...chair,id:'sold-out',isAvailable:false}]})},
   '@/features/catalog/ui/hooks/useCatalogCategories':{useCatalogCategories:()=>({categories:[]})},
   '../styles/CustomerHome.css':{}
 });
 renderToStaticMarkup(React.createElement(CustomerHomePage));
 add('missing');add('sold-out');assert.deepEqual(calls,[]);
 add('chair');assert.deepEqual(calls,[['draft','chair'],['open existing drawer']]);
});
test('card renders one persistent CTA only when action is supported',()=>{
 const {ProductCard}=load('../src/shared/components/ui/ProductCard.tsx',{
   'react-i18next':{useTranslation:()=>({t:k=>k==='mobileRental.addItem'?'Add Synthetic chair to cart':k})},
   '../../utils/cn':{cn:(...args)=>args.filter(Boolean).join(' ')},
   'next/navigation':{useRouter:()=>({})}
 });
 const render=(product,onAddToCart)=>renderToStaticMarkup(React.createElement(ProductCard,{product,onAddToCart}));
 const html=render(chair,()=>{});
 assert.equal((html.match(/Add to cart/g)||[]).length,1);
 assert.doesNotMatch(html,/sm:hidden|group-hover:opacity-100/);
 assert.doesNotMatch(render({...chair,isAvailable:false},()=>{}),/Add to cart/);
 assert.doesNotMatch(render(chair,undefined),/Add to cart/);
});
