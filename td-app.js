'use strict';
const projects={
 ilustrado:{kind:'CONCEITO / OFICINA MECÂNICA',index:'01 — 04',title:'AutoPrime — Ilustrado',overline:'VISUAL E EXPRESSIVO',heading:'Um visual que<br>puxa a conversa.',description:'Imagens, cartões de serviços e uma navegação que convida a conhecer a empresa. Uma opção para quem quer uma apresentação mais visual.',tags:['Serviços em destaque','Formulário','Layout responsivo'],path:'ilustrado/',image:'assets/demo-ilustrado.png',alt:'Modelo AutoPrime Ilustrado: apresentação visual com imagem, serviços e navegação'},
 original:{kind:'CONCEITO / OFICINA MECÂNICA',index:'02 — 04',title:'AutoPrime — Original',overline:'DIRETO AO PONTO',heading:'O que importa.<br>Sem dar voltas.',description:'Uma apresentação objetiva, com serviços, informações da empresa e um caminho para pedir orçamento. Para quem prefere uma página enxuta.',tags:['Página enxuta','Contato em destaque','Layout responsivo'],path:'original/',image:'assets/demo-original.png',alt:'Modelo AutoPrime Original: página com fotografia na abertura e serviços organizados'},
 claude:{kind:'CONCEITO / OFICINA MECÂNICA',index:'03 — 04',title:'AutoPrime — Essencial',overline:'LIMPO E ORGANIZADO',heading:'Mais espaço.<br>Mais clareza.',description:'O modelo Claude, aqui apresentado como Essencial: visual limpo, cartões de serviços e informações bem distribuídas para uma leitura tranquila.',tags:['Cartões de serviços','Leitura organizada','Layout responsivo'],path:'claude/',image:'assets/demo-claude.png',alt:'Modelo AutoPrime Essencial: abertura escura, cartões claros e navegação organizada'},
 salao:{kind:'CONCEITO / SALÃO DE BELEZA',index:'04 — 04',title:'Casa Aurora — Salão de beleza',overline:'ACOLHEDOR E ELEGANTE',heading:'Hora marcada.<br>Beleza sem pressa.',description:'Outro segmento, a mesma ideia: serviços e valores organizados, horários de funcionamento e um pedido de agendamento que prepara a mensagem para o WhatsApp. Empresa fictícia.',tags:['Serviços e valores','Pedido de horário','Layout responsivo'],path:'salao/',image:'assets/demo-salao.png',alt:'Modelo Casa Aurora: salão de beleza com título em serifa, ilustração em rosé e botão para pedir horário'}
};
const origin='https://joaovitorjcj.github.io/tavares-digital-demos/';
const tabs=[...document.querySelectorAll('[data-project]')];
function showProject(id,focus=false){
 const p=projects[id];if(!p)return;
 tabs.forEach(tab=>{const active=tab.dataset.project===id;tab.classList.toggle('active',active);tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;if(active&&focus)tab.focus();});
 const set=(id,value)=>document.getElementById(id).textContent=value;
 set('project-index',p.index);set('project-kind',p.kind);set('project-title',p.title);set('project-overline',p.overline);set('project-description',p.description);
 document.getElementById('project-heading').replaceChildren(...p.heading.split('<br>').flatMap((text,i)=>i?[document.createElement('br'),document.createTextNode(text)]:[document.createTextNode(text)]));
 const image=document.getElementById('project-image');image.src=p.image;image.alt=p.alt;
 const imageLink=document.getElementById('project-image-link');imageLink.href=origin+p.path;imageLink.setAttribute('aria-label','Abrir demonstração '+p.title);
 document.getElementById('project-demo-link').href=origin+p.path;
 document.getElementById('project-tags').replaceChildren(...p.tags.map(text=>{const tag=document.createElement('span');tag.textContent=text;return tag;}));
 document.getElementById('project-details').setAttribute('aria-labelledby','tab-'+id);
}
tabs.forEach((tab,index)=>{tab.addEventListener('click',()=>showProject(tab.dataset.project));tab.addEventListener('keydown',event=>{let target;if(event.key==='ArrowRight')target=(index+1)%tabs.length;if(event.key==='ArrowLeft')target=(index+tabs.length-1)%tabs.length;if(event.key==='Home')target=0;if(event.key==='End')target=tabs.length-1;if(target!==undefined){event.preventDefault();showProject(tabs[target].dataset.project,true);}});});
const menuToggle=document.getElementById('menu-toggle'),nav=document.getElementById('main-nav');
function closeMenu(){nav.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','Abrir navegação');}
menuToggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(open));menuToggle.setAttribute('aria-label',open?'Fechar navegação':'Abrir navegação');});
nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu();});
document.querySelectorAll('[data-interest]').forEach(link=>link.addEventListener('click',()=>{document.getElementById('contact-type').value=link.dataset.interest;}));
const form=document.getElementById('brief-form');
function makeMessage(data){return ['Olá, Tavares Digital! Gostaria de conversar sobre um projeto.','','Nome: '+data.name.trim(),'Negócio: '+data.company.trim(),'Interesse: '+data.type,'Ideia: '+(data.message.trim()||'Quero entender as opções.')].join('\n');}
form.addEventListener('submit',event=>{event.preventDefault();if(!form.reportValidity())return;const data=Object.fromEntries(new FormData(form));const url='https://wa.me/5592985246042?text='+encodeURIComponent(makeMessage(data));const status=document.getElementById('form-status');status.textContent='Abrindo o WhatsApp. Confira a mensagem antes de enviar.';window.location.assign(url);});
const sticky=document.querySelector('.sticky-mobile-contact');
if('IntersectionObserver' in window){let inHero=true,inContact=false;const update=()=>sticky.classList.toggle('visible',!inHero&&!inContact);const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.target.id==='inicio')inHero=entry.isIntersecting;if(entry.target.id==='contato')inContact=entry.isIntersecting;});update();},{threshold:0});observer.observe(document.getElementById('inicio'));observer.observe(document.getElementById('contato'));}
document.getElementById('year').textContent=new Date().getFullYear();

/* Mantém a captura desktop inteira e proporcional em qualquer tela. */
const engineeringHeroFrame=document.querySelector('.hero-live-frame');
if(engineeringHeroFrame){
 const preview=engineeringHeroFrame.querySelector('iframe');
 const fitEngineeringPreview=()=>{
  const baseWidth=1713,baseHeight=755;
  const scale=engineeringHeroFrame.clientWidth/baseWidth;
  if(!scale)return;
  preview.style.width=baseWidth+'px';
  preview.style.height=baseHeight+'px';
  preview.style.transform='scale('+scale+')';
 };
 fitEngineeringPreview();
 if('ResizeObserver' in window)new ResizeObserver(fitEngineeringPreview).observe(engineeringHeroFrame);
 else window.addEventListener('resize',fitEngineeringPreview,{passive:true});
}
