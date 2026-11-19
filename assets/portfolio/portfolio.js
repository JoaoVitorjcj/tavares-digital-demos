'use strict';

const menu = document.getElementById('menu-toggle');
const navigation = document.getElementById('main-nav');
function setMenu(open) {
  navigation.classList.toggle('open', open);
  menu.setAttribute('aria-expanded', String(open));
}
window.matchMedia('(max-width: 900px)').addEventListener('change', () => setMenu(false));
menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') === 'false'));
navigation.addEventListener('click', event => {
  if (event.target.closest('a')) setMenu(false);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    menu.focus();
  }
});

for (const preview of document.querySelectorAll('.preview')) {
  const controls = preview.querySelector('.preview-controls');
  const media = preview.querySelector('.preview-media');
  const image = media.querySelector('img');
  const desktop = image.src;
  const caption = image.alt.split(' do ')[1];
  const buttons = [...controls.querySelectorAll('button')];
  controls.hidden = false;
  controls.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button) return;
    const mobile = button.dataset.mode === 'mobile';
    image.src = mobile ? button.dataset.image : desktop;
    image.alt = 'Captura de ' + (mobile ? 'celular' : 'computador') + ' do ' + caption;
    media.dataset.mode = button.dataset.mode;
    for (const option of buttons) option.setAttribute('aria-pressed', String(option === button));
  });
}
