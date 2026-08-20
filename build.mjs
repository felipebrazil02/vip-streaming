import { cpSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE } from './src/data/site.mjs';
import { schemasFor } from './src/lib/seo.mjs';
import { PAGES } from './src/pages.mjs';
import { breadcrumb, siteFooter, siteHeader } from './src/templates/components.mjs';
import { renderPageContent } from './src/templates/content.mjs';

const ROOT = dirname(fileURLToPath(import.meta.url));
const DIST = join(ROOT, 'dist');

function escapeAttribute(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function documentFor(page) {
  const canonical = `${SITE.url}${page.route}`;
  const image = `${SITE.url}${SITE.imagemSocial}`;
  const robots = page.indexable ? 'index,follow' : 'noindex,follow';
  const type = page.schema === 'article' ? 'article' : 'website';
  const structuredData = schemasFor(page)
    .map((schema) => `  <script type="application/ld+json">${JSON.stringify(schema).replaceAll('<', '\\u003c')}</script>`)
    .join('\n');

  return `<!doctype html>
<html lang="${SITE.idioma}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeAttribute(page.title)}</title>
  <meta name="description" content="${escapeAttribute(page.description)}">
  <meta name="robots" content="${robots}">
  <meta name="theme-color" content="${SITE.tema}">
  <meta name="color-scheme" content="dark light">
  <link rel="canonical" href="${canonical}">
  <link rel="manifest" href="/manifest.webmanifest">
  <link rel="icon" href="/assets/mark-vip.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="/assets/icon-192.png">
  <meta name="application-name" content="Vip Streaming">
  <meta property="og:type" content="${type}">
  <meta property="og:locale" content="pt_BR">
  <meta property="og:site_name" content="${SITE.nome}">
  <meta property="og:title" content="${escapeAttribute(page.title)}">
  <meta property="og:description" content="${escapeAttribute(page.description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${image}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="Vip Streaming — streaming simples e atendimento direto">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeAttribute(page.title)}">
  <meta name="twitter:description" content="${escapeAttribute(page.description)}">
  <meta name="twitter:image" content="${image}">
  <link rel="stylesheet" href="/assets/site.css">
${structuredData}
</head>
<body data-page="${page.output.replaceAll('/', '-').replace('.html', '')}">
  ${siteHeader(page.route)}
  <main id="conteudo" tabindex="-1">
    ${breadcrumb(page)}
    ${renderPageContent(page)}
  </main>
  ${siteFooter()}
</body>
</html>
`;
}

rmSync(DIST, { recursive: true, force: true });
mkdirSync(DIST, { recursive: true });
cpSync(join(ROOT, 'public', 'assets'), join(DIST, 'assets'), { recursive: true });

for (const page of PAGES) {
  const target = join(DIST, page.output);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, documentFor(page), 'utf8');
}

const urls = PAGES.filter((page) => page.indexable)
  .map((page) => `  <url><loc>${SITE.url}${page.route}</loc><lastmod>${SITE.publicadoEm}</lastmod></url>`)
  .join('\n');
writeFileSync(
  join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
  'utf8',
);
writeFileSync(
  join(DIST, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE.url}/sitemap.xml\n`,
  'utf8',
);
writeFileSync(
  join(DIST, 'manifest.webmanifest'),
  JSON.stringify({
    name: SITE.nome,
    short_name: 'Vip Streaming',
    description: SITE.descricao,
    id: '/',
    start_url: '/',
    scope: '/',
    lang: SITE.idioma,
    display: 'standalone',
    orientation: 'any',
    background_color: SITE.tema,
    theme_color: SITE.tema,
    categories: ['entertainment'],
    icons: [
      { src: '/assets/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/assets/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
    ],
  }, null, 2) + '\n',
  'utf8',
);

console.log(`Build concluído: ${PAGES.length} páginas em dist/`);
