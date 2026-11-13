'use strict';
const $=id=>document.getElementById(id);
const services=[
 {id:'corte',name:'Corte com identidade',category:'cabelo',label:'CABELO & EXPRESSÃO',price:140,time:60,description:'Um desenho que conversa com sua textura, seu estilo e a sua rotina.'},
 {id:'ritual',name:'Ritual de nutrição',category:'cabelo',label:'PAUSA & CUIDADO',price:110,time:45,description:'Uma pausa para cuidar dos fios, com avaliação e finalização delicada.'},
 {id:'cor',name:'Cor com intenção',category:'cor',label:'COR & PERSONALIDADE',price:240,time:120,description:'Uma nova nuance para expressar seu momento. Técnica definida em avaliação.'},
 {id:'luzes',name:'Luz em movimento',category:'cor',label:'LUZ & DIMENSÃO',price:390,time:180,description:'Pontos de luz e dimensão, respeitando a história e a condição dos seus fios.'},
 {id:'finalizacao',name:'Finalização especial',category:'cabelo',label:'ENCONTROS & CELEBRAÇÕES',price:100,time:50,description:'Textura, movimento ou um penteado leve para acompanhar sua ocasião.'},
 {id:'unhas',name:'Mãos em cuidado',category:'essenciais',label:'PEQUENOS RITUAIS',price:55,time:45,description:'Manicure e esmaltação para dar um novo detalhe à sua semana.'},
 {id:'sobrancelhas',name:'Olhar em harmonia',category:'essenciais',label:'DETALHES & EQUILÍBRIO',price:65,time:30,description:'Design de sobrancelhas pensado para acompanhar sua expressão.'},
 {id:'conversa',name:'Conversa de orientação',category:'essenciais',label:'ESCUTA & DESCOBERTA',price:0,time:20,description:'Um primeiro encontro para entender ideias, possibilidades e próximos passos.'}
];
const selected=new Set();
const money=value=>new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL',maximumFractionDigits:0}).format(value);
const duration=value=>value>=60?Math.floor(value/60)+'h'+(value%60?' '+value%60+'min':''):value+' min';
function getSelection(){return services.filter(s=>selected.has(s.id));}
function getTotals(){return getSelection().reduce((sum,s)=>({price:sum.price+s.price,time:sum.time+s.time}),{price:0,time:0});}
function toggleService(id){if(!services.some(s=>s.id===id))return;selected.has(id)?selected.delete(id):selected.add(id);renderSelection();}
function renderCards(){
 const list=$('service-list');
 services.forEach((s,index)=>{
  const card=document.createElement('article');card.className='service-card';card.dataset.category=s.category;card.dataset.service=s.id;
  // The template contains only trusted, fixed catalog text; user input is never HTML.
  card.innerHTML='<div class="card-top"><span>'+s.label+'</span><span>'+String(index+1).padStart(2,'0')+'</span></div><h3>'+s.name+'</h3><p>'+s.description+'</p><div class="service-meta"><b>'+(s.price?'A partir de '+money(s.price):'Sem custo (demo)')+'</b><span>'+duration(s.time)+'</span></div>';
  const button=document.createElement('button');button.type='button';button.className='add-service';button.dataset.add=s.id;button.setAttribute('aria-pressed','false');button.setAttribute('aria-label','Adicionar '+s.name);button.textContent='Adicionar à minha visita +';button.addEventListener('click',()=>toggleService(s.id));card.append(button);list.append(card);
 });
}
function renderSelection(){
 const items=getSelection(),totals=getTotals(),list=$('selection');list.replaceChildren();
 if(!items.length){const empty=document.createElement('p');empty.className='selection-empty';empty.textContent='Sua visita começa com uma escolha. Adicione um cuidado ou uma conversa de orientação.';list.append(empty);}
 items.forEach(s=>{const row=document.createElement('div');row.className='selected-row';const description=document.createElement('div');description.textContent=s.name;const meta=document.createElement('small');meta.textContent=money(s.price)+' · '+duration(s.time);description.append(meta);const remove=document.createElement('button');remove.type='button';remove.className='remove-service';remove.textContent='×';remove.setAttribute('aria-label','Remover '+s.name);remove.addEventListener('click',()=>{toggleService(s.id);$('selection').setAttribute('tabindex','-1');$('selection').focus({preventScroll:true});});row.append(description,remove);list.append(row);});
 $('total-price').textContent=money(totals.price);$('total-time').textContent=duration(totals.time);$('floating-count').textContent=items.length+' cuidado'+(items.length===1?'':'s');
 document.querySelectorAll('[data-add]').forEach(button=>{const isSelected=selected.has(button.dataset.add);button.setAttribute('aria-pressed',String(isSelected));button.textContent=isSelected?'Adicionado · remover −':'Adicionar à minha visita +';button.closest('article').classList.toggle('selected',isSelected);});
 $('status').textContent='';
}
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
 document.querySelectorAll('[data-filter]').forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});
 document.querySelectorAll('.service-card').forEach(card=>{card.hidden=button.dataset.filter!=='todos'&&card.dataset.category!==button.dataset.filter;});
}));
const moods={pausa:{title:'Um ritual para desacelerar.',text:'Nutrição dos fios e cuidado com as mãos. Uma sugestão para dar espaço ao seu tempo.',ids:['ritual','unhas']},renovar:{title:'Um novo olhar para o seu visual.',text:'Corte e conversa de orientação. Primeiro escutamos; depois, desenhamos possibilidades.',ids:['corte','conversa']},brilhar:{title:'Presença para um dia especial.',text:'Finalização e design de sobrancelhas. Detalhes que acompanham a sua expressão.',ids:['finalizacao','sobrancelhas']}};
document.querySelectorAll('[data-mood]').forEach(button=>button.addEventListener('click',()=>{
 const mood=moods[button.dataset.mood];document.querySelectorAll('[data-mood]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
 const box=$('recommendation');box.replaceChildren();const title=document.createElement('h3');title.textContent=mood.title;const text=document.createElement('p');text.textContent=mood.text;const add=document.createElement('button');add.type='button';add.className='button';add.textContent='Adicionar sugestão à visita ↗';add.addEventListener('click',()=>{mood.ids.forEach(id=>selected.add(id));renderSelection();add.textContent='Sugestão adicionada ✓';});box.append(title,text,add);
}));
const menu=$('menu'),menuBtn=$('menu-btn');function closeMenu(){menu.classList.remove('open');menuBtn.setAttribute('aria-expanded','false');}
menuBtn.addEventListener('click',()=>{const open=menu.classList.toggle('open');menuBtn.setAttribute('aria-expanded',String(open));});menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.classList.contains('open')){closeMenu();menuBtn.focus();}});
document.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>b.closest('dialog').close()));document.querySelectorAll('[data-privacy]').forEach(b=>b.addEventListener('click',()=>$('privacy').showModal()));
function iso(d){return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-');}
function validateDate(){const now=new Date(),max=new Date(now);max.setDate(max.getDate()+90);const field=$('date');field.min=iso(now);field.max=iso(max);field.setCustomValidity('');if(!field.value)return;const weekday=new Date(field.value+'T12:00:00').getDay();if(field.value<field.min||field.value>field.max)field.setCustomValidity('Escolha uma data de hoje até os próximos 90 dias.');else if(weekday===0||weekday===1)field.setCustomValidity('Escolha de terça a sábado nesta demonstração.');}
validateDate();$('date').addEventListener('input',validateDate);$('name').addEventListener('input',()=>$('name').setCustomValidity(''));
let message='';
function makeMessage(name,date,period,notes){const total=getTotals();return ['Olá! Gostaria de solicitar um momento no Alma.','[DEMO — SEM RESERVA REAL]','','Nome: '+name,'Cuidados: '+getSelection().map(s=>s.name).join(', '),'Estimativa demonstrativa: '+money(total.price),'Duração estimada: '+duration(total.time),'Dia preferido: '+date.split('-').reverse().join('/'),'Período: '+period,'Observações: '+(notes||'Não informadas'),'','Aguardo confirmação de disponibilidade, valores e duração.'].join('\n');}
$('booking').addEventListener('submit',e=>{e.preventDefault();validateDate();$('name').setCustomValidity($('name').value.trim().length<2?'Informe pelo menos dois caracteres.':'');if(!$('booking').reportValidity())return;if(!selected.size){$('status').textContent='Escolha pelo menos um cuidado ou a conversa de orientação.';return;}message=makeMessage($('name').value.trim(),$('date').value,$('period').value,$('notes').value.trim());$('message').textContent=message;$('whatsapp').href='https://api.whatsapp.com/send?text='+encodeURIComponent(message);$('copy-status').textContent='';$('review').showModal();});
$('copy').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(message);$('copy-status').textContent='Mensagem copiada.';}catch{const range=document.createRange();range.selectNodeContents($('message'));const selection=window.getSelection();selection.removeAllRanges();selection.addRange(range);$('copy-status').textContent='Mensagem selecionada. Copie com Ctrl+C ou pelo menu do navegador.';}});
renderCards();renderSelection();
