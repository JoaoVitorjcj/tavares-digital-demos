'use strict';
(function(){
  const button=document.querySelector('.pricing-menu-toggle');
  const nav=document.getElementById('pricing-main-nav');
  if(!button||!nav)return;
  function close(){nav.classList.remove('pricing-open');nav.inert=window.innerWidth<=950;button.setAttribute('aria-expanded','false');button.setAttribute('aria-label','Abrir menu');}
  button.addEventListener('click',()=>{const open=nav.classList.toggle('pricing-open');nav.inert=!open;button.setAttribute('aria-expanded',String(open));button.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');});
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')close();});
  document.addEventListener('click',e=>{if(!nav.contains(e.target)&&!button.contains(e.target))close();});
  window.addEventListener('resize',()=>{close();});close();
})();
