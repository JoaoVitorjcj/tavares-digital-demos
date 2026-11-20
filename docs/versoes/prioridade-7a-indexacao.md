# Prioridade 7A — rotas e navegação

Base de desenvolvimento: `7cfdbbf`. Na auditoria de 19/11/2026, a inicial e o portfólio publicados devolveram HTTP 200 com conteúdo próprio e canonical correspondente. Um caminho inexistente e um recurso CSS inexistente também devolveram 200, com o mesmo HTML da inicial.

A versão acrescenta um `404.html` na raiz para que o Cloudflare Pages devolva HTTP 404 para caminhos sem arquivo. Os links institucionais da inicial, dos planos e do portfólio apontam diretamente para as rotas finais. Os caminhos relativos também funcionam sob o subdiretório do GitHub Pages.

## Verificação local

Com `wrangler pages dev`, as quatro URLs do sitemap devolveram 200 e declararam a canonical esperada. Os links institucionais testados chegaram diretamente ao destino. Um caminho inexistente na raiz e um recurso inexistente em subdiretório devolveram a página de erro com status 404. As variantes `/index.html`, `/portfolio.html` e `/portfolio/` continuaram redirecionando.

Após publicação aprovada, repetir os GETs no domínio público e conferir a Inspeção de URL e o relatório de Sitemaps da propriedade do Digital. O Google informa o estado do índice separadamente para cada URL.
