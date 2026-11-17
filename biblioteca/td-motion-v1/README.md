# Tavares Digital · Biblioteca de movimentos V1

Biblioteca **interna e experimental**, isolada na branch `library/td-motion-v1`. **Não** foi integrada à `main`, à vitrine pública nem aos 23 templates.

## Arquivos
- `td-motion.css`: tokens da marca, reveal, stagger, botões, cards e hover.
- `td-motion.js`: IntersectionObserver, barra de leitura e inicialização.
- `demo.html`: demonstração local, sem bibliotecas externas ou compilação.

## Como usar
Copie os arquivos para um projeto e inclua:
```html
<link rel="stylesheet" href="./td-motion.css">
<div class="td-progress" aria-hidden="true"></div>
<section class="td-reveal">Conteúdo</section>
<script type="module">
  import { initAll } from './td-motion.js';
  initAll();
</script>
```

Para uma série de cards, use `class="td-stagger"` no pai e `class="td-reveal td-lift"` nos filhos.

**Execução local:** módulos ES precisam de servidor HTTP, mesmo sem backend. No diretório dos arquivos, execute `python -m http.server 8000` e abra `http://localhost:8000/demo.html`; abrir `file://` diretamente pode falhar devido à política de origem do navegador. Em hospedagem estática, os arquivos são servidos normalmente.

## Segurança, acessibilidade e desempenho
- Sem `eval`, `innerHTML` dinâmico, chaves ou coleta de dados.
- Respeita `prefers-reduced-motion`, `:focus-visible` e mantém o conteúdo visível sem JavaScript.
- `IntersectionObserver` com fallback; atualização da rolagem com `requestAnimationFrame` e listener passivo.
- Sem frameworks/CDN. Para recursos futuros (GSAP, Swiper, Three.js), verificar licenças e fixar versões; **não incluídos nesta V1**.

## QA e limitações
Revisar manualmente em 320 px, 390 px, 768 px e 1440 px, teclado, redução de movimento, leitores de tela e console antes de uso comercial. O JavaScript usa APIs modernas de navegador. Esta branch é biblioteca de código, não publicação de site.
