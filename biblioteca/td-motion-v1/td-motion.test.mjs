import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const js=fs.readFileSync(new URL('./td-motion.js',import.meta.url),'utf8');
const css=fs.readFileSync(new URL('./td-motion.css',import.meta.url),'utf8');
let passed=0;
function test(label,run){run();passed++;console.log('PASS '+label)}
function setup({reduced=false,withObserver=true,withBar=true}={}){
 const nodes=Array.from({length:3},()=>({classList:{set:new Set(),add(s){this.set.add(s)},contains(s){return this.set.has(s)}}}));
 const bar={style:{}}; const handlers=new Map();let io,unobserved=[],disconnected=false;
 const document={documentElement:{classList:{set:new Set(),add(s){this.set.add(s)},remove(s){this.set.delete(s)},contains(s){return this.set.has(s)}},scrollHeight:2000},
 querySelectorAll(selector){assert.equal(selector,'.td-reveal');return nodes},
 querySelector(selector){assert.equal(selector,'.td-progress');return withBar?bar:null}};
 class Observer{constructor(callback){this.callback=callback;io=this}observe(node){}unobserve(node){unobserved.push(node)}disconnect(){disconnected=true}}
 const g={document,matchMedia:()=>({matches:reduced}),requestAnimationFrame:fn=>fn(),innerHeight:1000,scrollY:500,addEventListener:(name,fn)=>handlers.set(name,fn),removeEventListener:(name)=>handlers.delete(name)};
 g.window=g;if(withObserver)g.IntersectionObserver=Observer;
 vm.createContext(g);vm.runInContext(js.replaceAll('export function','function')+';globalThis.api={initReveal,initScrollProgress,initAll}',g);
 return {g,nodes,bar,document,handlers,get io(){return io},get unobserved(){return unobserved},get disconnected(){return disconnected}};
}
test('JS parses',()=>new vm.Script(js.replaceAll('export function','function')));
test('19 Figma CSS tokens available',()=>{
 const tokens=['forest','deep','ink','muted','sky','cream','paper','line','hover','spacing-xs','spacing-sm','spacing-md','spacing-lg','spacing-xl','spacing-2xl','radius-sm','radius-md','radius-lg','radius-pill'];
 for(const name of tokens)assert.ok(css.includes('--td-'+name+':'),'missing '+name);
});
test('safe without JavaScript',()=>assert.ok(!/(?:^|})\.td-reveal\{opacity:0/.test(css)));
test('reveal observer and cleanup',()=>{
 const h=setup();const stop=h.g.api.initReveal();
 assert.ok(h.document.documentElement.classList.contains('td-motion-ready'));
 h.io.callback([{target:h.nodes[0],isIntersecting:true}]);
 assert.ok(h.nodes[0].classList.contains('td-inview'));
 assert.equal(h.unobserved.length,1);stop();assert.ok(h.disconnected);
});
test('reduced motion makes content visible',()=>{
 const h=setup({reduced:true});h.g.api.initReveal();
 assert.ok(h.nodes.every(n=>n.classList.contains('td-inview')));
});
test('no IntersectionObserver fallback',()=>{
 const h=setup({withObserver:false});h.g.api.initReveal();
 assert.ok(h.nodes.every(n=>n.classList.contains('td-inview')));
});
test('scroll progress and listener cleanup',()=>{
 const h=setup();const stop=h.g.api.initScrollProgress();
 assert.equal(h.bar.style.transform,'scaleX(0.5)');assert.ok(h.handlers.has('scroll'));stop();assert.equal(h.handlers.size,0);
});
test('reduced motion disables progress',()=>{
 const h=setup({reduced:true});h.g.api.initScrollProgress();assert.equal(h.bar.style.display,'none');
});
test('missing progress is safe',()=>setup({withBar:false}).g.api.initScrollProgress()());
test('combined init and cleanup',()=>{
 const h=setup();const stop=h.g.api.initAll();assert.ok(h.handlers.has('scroll'));stop();assert.ok(h.disconnected);assert.equal(h.handlers.size,0);
});
console.log('TD Motion QA:',passed,'tests passing');
