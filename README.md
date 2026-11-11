# tavares-digital-demos

Site institucional da **Tavares Digital** (Manaus, AM) e modelos de demonstração. Publicado via GitHub Pages: https://joaovitorjcj.github.io/tavares-digital-demos/

Este repositório é público. Não coloque aqui dados reais de clientes, segredos ou propostas com nome de prospect.

## Estrutura
- `index.html`, `td-style.css`, `td-app.js`: página institucional (HTML/CSS/JS estático, sem build).
- `privacidade.html`: política de privacidade.
- `ilustrado/`, `original/`, `claude/`: modelos AutoPrime (oficina fictícia).
- `assets/`: capturas do portfólio, favicon e imagem de compartilhamento (`td-social.png`, 1200x630).
- `sitemap.xml`, `robots.txt`.

## Paleta (azul e cinza)
Definida em `:root` de `td-style.css`: `--navy` #143755, `--navy-deep` #0c2942, `--accent` #8ad1fb, `--ink` #16344d, `--muted` #5f6f84, `--cream` #f2f5f9, `--paper` #fcfdfe, `--line` #d9e1e9. Para testar outro acento, altere só `--accent` (e confira o contraste).

## Como adicionar um projeto ao portfólio
Siga o comentário no topo de `td-app.js`: captura em `assets/` (1264x714), entrada em `projects` (`path` para demo deste repositório, `url` para site externo), botão `data-project` em `index.html`, atualizar o total `NN — NN` e o `sitemap.xml`.

## Como testar localmente
`python3 -m http.server 8000` na raiz e abrir http://localhost:8000/. Conferir: abas do portfólio (mouse e setas do teclado), formulário (abre WhatsApp só após confirmar), layout em 320 a 1440 px.
