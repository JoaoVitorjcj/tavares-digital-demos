/** TD Motion V1: vanilla JS, no external dependencies, no HTML injection. */
export function initReveal(root=document){
  const nodes=[...root.querySelectorAll('.td-reveal')];
  if(matchMedia('(prefers-reduced-motion: reduce)').matches||!('IntersectionObserver'in window)){
    nodes.forEach(n=>n.classList.add('td-inview'));return ()=>{};
  }
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(({target,isIntersecting})=>{if(isIntersecting){target.classList.add('td-inview');observer.unobserve(target)}})
  },{threshold:.12,rootMargin:'0px 0px -24px 0px'});
  nodes.forEach(n=>observer.observe(n));return ()=>observer.disconnect();
}
export function initScrollProgress(root=document){
  const bar=root.querySelector('.td-progress');if(!bar)return ()=>{};
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){bar.style.display='none';return ()=>{}}
  let pending=false;const update=()=>{
    pending=false;const max=Math.max(0,document.documentElement.scrollHeight-innerHeight);
    bar.style.transform='scaleX('+(max?Math.min(1,Math.max(0,scrollY/max)):1)+')'
  };
  const scroll=()=>{if(!pending){pending=true;requestAnimationFrame(update)}};
  addEventListener('scroll',scroll,{passive:true});addEventListener('resize',scroll,{passive:true});update();
  return ()=>{removeEventListener('scroll',scroll);removeEventListener('resize',scroll)}
}
export function initAll(root=document){const stop=[initReveal(root),initScrollProgress(root)];return ()=>stop.forEach(f=>f())}
