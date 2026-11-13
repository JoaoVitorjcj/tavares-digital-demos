'use strict';
// Configure only with the authorized commercial number: country + area + number.
// Empty = safe demo: WhatsApp sharing lets the visitor choose a recipient.
const WHATSAPP_NUMBER = '';
const $ = id => document.getElementById(id);
const menu = $('menu');
const toggle = $('menu-toggle');
function closeMenu() { menu.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
toggle.addEventListener('click', () => { const open = menu.classList.toggle('open'); toggle.setAttribute('aria-expanded', String(open)); });
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => { if (e.key === 'Escape' && menu.classList.contains('open')) { closeMenu(); toggle.focus(); } });
document.addEventListener('click', e => { if (!e.target.closest('.header')) closeMenu(); });
const media = matchMedia('(min-width:781px)');
media.addEventListener('change', closeMenu);
document.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', () => b.closest('dialog').close()));
document.querySelectorAll('dialog').forEach(dialog => dialog.addEventListener('click', e => {
  if (e.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) dialog.close();
}));
document.querySelectorAll('[data-service]').forEach(button => button.addEventListener('click', () => {
  $('servico').value = button.dataset.service;
  $('agendamento').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion:reduce)').matches ? 'instant' : 'smooth' });
  $('nome').focus({ preventScroll: true });
}));
document.querySelectorAll('[data-image]').forEach(button => button.addEventListener('click', () => {
  $('gallery-image').src = button.dataset.image;
  $('gallery-image').alt = button.querySelector('img').alt;
  $('gallery-caption').textContent = button.dataset.caption;
  $('gallery-dialog').showModal();
}));
['privacy-open','privacy-footer'].forEach(id => $(id).addEventListener('click', () => $('privacy-dialog').showModal()));
function localISO(date) { return [date.getFullYear(),String(date.getMonth()+1).padStart(2,'0'),String(date.getDate()).padStart(2,'0')].join('-'); }
function refreshDateBounds() { const now = new Date(); const max = new Date(now); max.setDate(max.getDate()+90); $('data').min = localISO(now); $('data').max = localISO(max); }
function validateDate() {
  refreshDateBounds();
  const field = $('data'); const val = field.value; field.setCustomValidity('');
  if (!val) return;
  if (val < field.min || val > field.max) field.setCustomValidity('Escolha uma data de hoje até os próximos 90 dias.');
  else if (new Date(val+'T12:00:00').getDay() === 0) field.setCustomValidity('Escolha de segunda a sábado. Domingo não está disponível nesta demonstração.');
}
refreshDateBounds(); $('data').addEventListener('input',validateDate);
['nome','veiculo'].forEach(id => $(id).addEventListener('input', () => $(id).setCustomValidity('')));
function buildMessage(values) {
  const date = values.data.split('-').reverse().join('/');
  return ['Olá! Gostaria de solicitar uma avaliação.','[DEMONSTRAÇÃO AUTOPRIME — SEM RESERVA REAL]', '', 'Nome: '+values.nome,'Veículo: '+values.veiculo,'Serviço: '+values.servico,'Data desejada: '+date,'Período: '+values.periodo,'Observações: '+(values.mensagem || 'Não informadas'),'', 'Aguardo confirmação da disponibilidade e das condições.'].join('\n');
}
function whatsappURL(message, number = WHATSAPP_NUMBER) {
  const clean = number.replace(/\D/g,'');
  const encoded = encodeURIComponent(message);
  return /^55\d{10,11}$/.test(clean) ? 'https://wa.me/'+clean+'?text='+encoded : 'https://api.whatsapp.com/send?text='+encoded;
}
let preparedMessage = '';
$('booking-form').addEventListener('submit', e => {
  e.preventDefault(); validateDate();
  ['nome','veiculo'].forEach(id => { const field = $(id); field.setCustomValidity(field.value.trim().length < 2 ? 'Preencha pelo menos dois caracteres, sem contar espaços.' : ''); });
  if (!$('booking-form').reportValidity()) return;
  const values = Object.fromEntries(['nome','veiculo','servico','data','periodo','mensagem'].map(id => [id,$(id).value.trim()]));
  preparedMessage = buildMessage(values);
  $('message-preview').textContent = preparedMessage;
  $('whatsapp-link').href = whatsappURL(preparedMessage);
  $('whatsapp-note').textContent = /^55\d{10,11}$/.test(WHATSAPP_NUMBER.replace(/\D/g,'')) ? 'Confira o destinatário e envie a mensagem no WhatsApp. A equipe ainda precisa confirmar a disponibilidade.' : 'Na demo, você escolhe o destinatário no WhatsApp. Nada é enviado automaticamente.';
  $('copy-status').textContent = ''; $('form-status').textContent = '';
  $('review-dialog').showModal();
});
$('copy-message').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(preparedMessage); $('copy-status').textContent = 'Mensagem copiada. Cole no contato que você escolher.'; }
  catch { const selection = window.getSelection(); const range = document.createRange(); range.selectNodeContents($('message-preview')); selection.removeAllRanges(); selection.addRange(range); $('copy-status').textContent = 'Não foi possível copiar automaticamente. A mensagem foi selecionada: copie pelo menu do navegador ou Ctrl+C.'; }
});

// Manual carousel: no timers, keyboard navigation stays within the gallery.
const gallerySlides = Array.from(document.querySelectorAll('.carousel-slide'));
const galleryDots = Array.from(document.querySelectorAll('[data-slide]'));
let galleryIndex = 0;
function showGallerySlide(index) {
  if (!gallerySlides.length) return;
  galleryIndex = (index + gallerySlides.length) % gallerySlides.length;
  gallerySlides.forEach((slide, i) => { slide.hidden = i !== galleryIndex; });
  galleryDots.forEach((dot, i) => dot.setAttribute('aria-pressed', String(i === galleryIndex)));
  $('gallery-status').textContent = 'Imagem ' + (galleryIndex + 1) + ' de ' + gallerySlides.length + ' · ' + gallerySlides[galleryIndex].dataset.caption.split(' · ')[0];
}
$('gallery-prev').addEventListener('click', () => showGallerySlide(galleryIndex - 1));
$('gallery-next').addEventListener('click', () => showGallerySlide(galleryIndex + 1));
galleryDots.forEach(dot => dot.addEventListener('click', () => showGallerySlide(Number(dot.dataset.slide))));
$('car-carousel').addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') { e.preventDefault(); showGallerySlide(galleryIndex - 1); }
  if (e.key === 'ArrowRight') { e.preventDefault(); showGallerySlide(galleryIndex + 1); }
});
showGallerySlide(0);
