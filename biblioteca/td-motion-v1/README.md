# Tavares Digital · Biblioteca de movimentos V1

Biblioteca **interna e experimental**, isolada na branch `library/td-motion-v1`. **Não** foi integrada à `main`, à vitrine pública nem aos 23 templates.

## Arquivos
- `td-motion.css`: tokens da marca, reveal, stagger, botões, cards e hover.
- `td-motion.js`: IntersectionObserver, barra de leitura e inicializador idempotente por instância.
- `demo.html`: demonstração local sem dependências externas.

## Como usar
Copie os arquivos para o projeto desejado e inclua:
```html
<link rel="stylesheet" href="./td-motion.css">
<div class="td-progress" aria-hidden="true"></div>
<section class="td-reveal">Conteúdo</section>
<script type="module">
  import { initAll } from './td-motion.js';
  initAll();
</script>
```

Para uma série de cards, use `class="td-stagger"` no pai e `class="td-reveal td-lift"` nos filhos. Evite esconder conteúdo essencial por longos períodos.

## Segurança, acessibilidade e performance
- Sem eval, innerHTML dinâmico, acesso a chaves ou coleta de dados.
- Respeita `prefers-reduced-motion` e `:focus-visible`.
- `IntersectionObserver` com fallback sem JS API.
- Scroll listener passivo e atualização com requestAnimationFrame.
- Sem frameworks/CDN: pode abrir offline pelo navegador.
- Para recursos externos futuros (GSAP, Swiper, Three.js), consultar licenças e fixar versões; **não incluídos nesta V1**.

## QA e limitações
Revisar manualmente em 320 px, 390 px, 768 px e 1440 px, teclado, redução de movimento e leitores de tela antes de uso comercial. O reveal com JS desativado deve ser tratado com progressive enhancement no projeto consumidor (por exemplo, ativar classe de efeito somente após inicialização). Esta branch é biblioteca de código, não uma publicação de site.
