import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const DIST = join(ROOT, 'dist');

function build() {
  execFileSync(process.execPath, ['build.mjs'], {
    cwd: ROOT,
    encoding: 'utf8',
    stdio: 'pipe',
  });
}

test.before(() => build());

test('gera a nova arquitetura editorial e os ativos essenciais', () => {

  const arquivosObrigatorios = [
    'index.html',
    'planos/index.html',
    'como-funciona/index.html',
    'dispositivos/index.html',
    'guia-streaming/index.html',
    'faq/index.html',
    'contato/index.html',
    'privacidade/index.html',
    'termos/index.html',
    '404.html',
    'sitemap.xml',
    'robots.txt',
    'manifest.webmanifest',
    'assets/site.css',
    'assets/logo-vip.svg',
    'assets/mark-vip.svg',
    'assets/og-vip-streaming.png',
  ];

  const faltantes = arquivosObrigatorios.filter((arquivo) =>
    !existsSync(join(DIST, arquivo)),
  );

  assert.deepEqual(faltantes, [], `Arquivos ausentes: ${faltantes.join(', ')}`);
});

test('mantém a imagem Open Graph em PNG 1200x630 dentro do budget', () => {
  const ogPath = join(DIST, 'assets/og-vip-streaming.png');
  const png = readFileSync(ogPath);

  assert.deepEqual(
    png.subarray(0, 8),
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    'OG image: assinatura PNG inválida',
  );
  assert.equal(png.toString('ascii', 12, 16), 'IHDR', 'OG image: chunk IHDR ausente');
  assert.equal(png.readUInt32BE(16), 1200, 'OG image: largura');
  assert.equal(png.readUInt32BE(20), 630, 'OG image: altura');
  assert.ok(png.byteLength < 25_000, `OG image acima de 25 KB: ${png.byteLength}`);
});

function readHtml(output) {
  return readFileSync(join(DIST, output), 'utf8');
}

function meta(html, key, value) {
  const expression = new RegExp(`<meta[^>]+${key}=["']${value}["'][^>]+content=["']([^"']+)["']`, 'i');
  return html.match(expression)?.[1] ?? '';
}

function linkHref(html, rel) {
  const expression = new RegExp(`<link[^>]+rel=["']${rel}["'][^>]+href=["']([^"']+)["']`, 'i');
  return html.match(expression)?.[1] ?? '';
}

function schemas(html) {
  return [...html.matchAll(/<script type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi)]
    .map((match) => JSON.parse(match[1]));
}

test('usa a marca quadrada no favicon e no schema sem trocar o wordmark do header', () => {
  const markPath = join(DIST, 'assets/mark-vip.svg');
  assert.ok(existsSync(markPath), 'marca quadrada ausente');
  assert.match(readFileSync(markPath, 'utf8'), /viewBox="0 0 52 52"/i, 'marca quadrada: viewBox');

  const home = readHtml('index.html');
  assert.equal(linkHref(home, 'icon'), '/assets/mark-vip.svg', 'favicon: marca quadrada');
  const organization = schemas(home).find((item) => item['@type'] === 'Organization');
  assert.equal(organization?.logo, 'https://vip-streaming.netlify.app/assets/mark-vip.svg', 'Organization.logo: marca quadrada');
  const header = home.match(/<header\b[\s\S]*?<\/header>/i)?.[0] ?? '';
  assert.match(header, /<img[^>]+src="\/assets\/logo-vip\.svg"/i, 'header: manter wordmark horizontal');
});

test('mantém nome acessível no CTA do cabeçalho', () => {
  const home = readHtml('index.html');
  const header = home.match(/<header\b[\s\S]*?<\/header>/i)?.[0] ?? '';
  const headerCta = header.match(/<a\b[^>]*class="header-cta"[^>]*>/i)?.[0] ?? '';

  assert.match(headerCta, /\baria-label="Falar no WhatsApp"/i, 'header CTA: nome acessível ausente');
});

test('entrega SEO técnico único e schema adequado em cada rota', () => {
  const paginas = [
    ['index.html', '/', ['Organization', 'WebSite', 'Service'], true],
    ['planos/index.html', '/planos/', ['BreadcrumbList', 'Service'], true],
    ['como-funciona/index.html', '/como-funciona/', ['BreadcrumbList', 'HowTo'], true],
    ['dispositivos/index.html', '/dispositivos/', ['BreadcrumbList', 'CollectionPage'], true],
    ['guia-streaming/index.html', '/guia-streaming/', ['BreadcrumbList', 'Article'], true],
    ['faq/index.html', '/faq/', ['BreadcrumbList', 'FAQPage'], true],
    ['contato/index.html', '/contato/', ['BreadcrumbList', 'ContactPage'], true],
    ['privacidade/index.html', '/privacidade/', ['BreadcrumbList', 'WebPage'], true],
    ['termos/index.html', '/termos/', ['BreadcrumbList', 'WebPage'], true],
    ['404.html', '/404.html', ['WebPage'], false],
  ];
  const titles = new Set();
  const descriptions = new Set();

  for (const [output, route, expectedSchemas, indexable] of paginas) {
    const html = readHtml(output);
    const title = html.match(/<title>([^<]+)<\/title>/i)?.[1] ?? '';
    const description = meta(html, 'name', 'description');
    const canonical = linkHref(html, 'canonical');
    const robots = meta(html, 'name', 'robots');
    const h1Count = (html.match(/<h1(?:\s|>)/gi) ?? []).length;
    const pageSchemas = schemas(html);
    const schemaTypes = pageSchemas.flatMap((item) =>
      Array.isArray(item['@type']) ? item['@type'] : [item['@type']],
    );

    assert.ok(title.length >= 30 && title.length <= 65, `${output}: title tem ${title.length} caracteres`);
    assert.ok(description.length >= 120 && description.length <= 165, `${output}: description tem ${description.length} caracteres`);
    assert.equal(canonical, `https://vip-streaming.netlify.app${route}`, `${output}: canonical`);
    assert.equal(robots, indexable ? 'index,follow' : 'noindex,follow', `${output}: robots`);
    assert.equal(meta(html, 'property', 'og:title'), title, `${output}: og:title`);
    assert.equal(meta(html, 'property', 'og:description'), description, `${output}: og:description`);
    assert.equal(meta(html, 'property', 'og:url'), canonical, `${output}: og:url`);
    assert.equal(meta(html, 'property', 'og:image'), 'https://vip-streaming.netlify.app/assets/og-vip-streaming.png', `${output}: og:image`);
    assert.equal(meta(html, 'name', 'twitter:card'), 'summary_large_image', `${output}: twitter card`);
    assert.equal(linkHref(html, 'manifest'), '/manifest.webmanifest', `${output}: manifest`);
    assert.equal(h1Count, 1, `${output}: deve ter exatamente um H1`);
    for (const type of expectedSchemas) {
      assert.ok(schemaTypes.includes(type), `${output}: schema ${type} ausente`);
    }
    assert.ok(pageSchemas.every((item) => item['@context'] === 'https://schema.org'), `${output}: @context inválido`);
    const faqSchema = pageSchemas.find((item) => item['@type'] === 'FAQPage');
    if (faqSchema) assert.ok(faqSchema.mainEntity?.length >= 5, `${output}: FAQ schema incompleto`);
    const howToSchema = pageSchemas.find((item) => item['@type'] === 'HowTo');
    if (howToSchema) {
      assert.ok(howToSchema.step?.length >= 3, `${output}: HowTo schema incompleto`);
      assert.equal(howToSchema.totalTime, undefined, `${output}: totalTime não confirmado`);
    }
    const serviceSchema = pageSchemas.find((item) => item['@type'] === 'Service');
    if (serviceSchema) assert.equal(serviceSchema.offers?.length, 3, `${output}: ofertas no schema Service`);
    const articleSchema = pageSchemas.find((item) => item['@type'] === 'Article');
    if (articleSchema) {
      assert.ok(articleSchema.datePublished, `${output}: data do artigo`);
      assert.ok(articleSchema.author, `${output}: autor do artigo`);
    }
    assert.ok(!titles.has(title), `${output}: title duplicado`);
    assert.ok(!descriptions.has(description), `${output}: description duplicada`);
    titles.add(title);
    descriptions.add(description);
  }
});

function visibleWordCount(html) {
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z0-9#]+;/gi, ' ');
  return (text.match(/[\p{L}\p{N}]+/gu) ?? []).length;
}

function resolveInternalHref(href) {
  const clean = href.split('#')[0].split('?')[0];
  if (!clean || clean === '/') return 'index.html';
  const relative = clean.replace(/^\//, '');
  return clean.endsWith('/') ? `${relative}index.html` : relative;
}

test('renderiza conteúdo semântico, acessível, interligado e sem alegações proibidas', () => {
  const pages = [
    ['index.html', 300],
    ['planos/index.html', 220],
    ['como-funciona/index.html', 250],
    ['dispositivos/index.html', 250],
    ['guia-streaming/index.html', 650],
    ['faq/index.html', 300],
    ['contato/index.html', 140],
    ['privacidade/index.html', 280],
    ['termos/index.html', 300],
    ['404.html', 20],
  ];
  const banned = /\bIPTV\b|cariocaoplay|Netflix|Premiere|SporTV|Combate|18\.000|90 mil|4\.9\/5|1\.847|melhor (?:serviço|streaming) do Brasil|sem travamentos/iu;

  for (const [output, minimumWords] of pages) {
    const html = readHtml(output);
    assert.match(html, /<a class="skip-link" href="#conteudo">/i, `${output}: link de pular conteúdo`);
    assert.match(html, /<header\b/i, `${output}: header semântico`);
    assert.match(html, /<nav[^>]+aria-label="Navegação principal"/i, `${output}: navegação acessível`);
    assert.match(html, /<main id="conteudo"/i, `${output}: main com destino do skip link`);
    assert.match(html, /<footer\b/i, `${output}: footer semântico`);
    const headingLevels = [...html.matchAll(/<h([1-6])(?:\s|>)/gi)].map((match) => Number(match[1]));
    for (let index = 1; index < headingLevels.length; index += 1) {
      assert.ok(headingLevels[index] <= headingLevels[index - 1] + 1, `${output}: salto de heading H${headingLevels[index - 1]}→H${headingLevels[index]}`);
    }
    assert.ok(visibleWordCount(html) >= minimumWords, `${output}: conteúdo raso (${visibleWordCount(html)}/${minimumWords} palavras)`);
    assert.doesNotMatch(html, banned, `${output}: alegação ou marca proibida`);

    const internalHrefs = [...html.matchAll(/href="(\/[^"\s]*)"/gi)].map((match) => match[1]);
    assert.ok(internalHrefs.length >= 6, `${output}: poucos links internos (${internalHrefs.length})`);
    for (const href of internalHrefs) {
      const target = resolveInternalHref(href);
      assert.ok(existsSync(join(DIST, target)), `${output}: link interno quebrado ${href} -> ${target}`);
    }
  }

  const commercialPages = ['index.html', 'planos/index.html', 'como-funciona/index.html', 'dispositivos/index.html', 'guia-streaming/index.html', 'faq/index.html', 'contato/index.html'];
  for (const output of commercialPages) {
    const html = readHtml(output);
    const whatsappAnchors = [...html.matchAll(/<a([^>]+)href="(https:\/\/wa\.me\/5511915011527\?text=[^"]+)"([^>]*)>/gi)];
    assert.ok(whatsappAnchors.length >= 1, `${output}: CTA de WhatsApp ausente`);
    for (const [, before, href, after] of whatsappAnchors) {
      const attrs = before + after;
      assert.match(attrs, /target="_blank"/i, `${output}: WhatsApp sem target`);
      assert.match(attrs, /rel="noopener noreferrer"/i, `${output}: WhatsApp sem rel seguro`);
      const message = new URL(href).searchParams.get('text') ?? '';
      assert.ok(message.length >= 20, `${output}: mensagem de WhatsApp genérica`);
    }
  }

  const plans = readHtml('planos/index.html');
  assert.equal((plans.match(/<article class="plan-card/g) ?? []).length, 3, 'planos: três cards');
  for (const name of ['Mensal', 'Trimestral', 'Anual']) {
    const messages = [...plans.matchAll(/href="(https:\/\/wa\.me\/[^"]+)"/g)]
      .map((match) => new URL(match[1]).searchParams.get('text') ?? '');
    assert.ok(messages.some((message) => message.includes(name)), `planos: CTA específico para ${name}`);
  }

  assert.equal((readHtml('como-funciona/index.html').match(/<li class="step"/g) ?? []).length, 4, 'como funciona: quatro etapas');
  assert.equal((readHtml('dispositivos/index.html').match(/<article class="device-panel"/g) ?? []).length, 4, 'dispositivos: quatro categorias');
  assert.equal((readHtml('faq/index.html').match(/<details class="faq-item"/g) ?? []).length, 8, 'FAQ: oito perguntas visíveis');
  assert.match(readHtml('guia-streaming/index.html'), /<article class="guide"/i, 'guia: artigo semântico');
  assert.doesNotMatch(readHtml('contato/index.html'), /href="mailto:/i, 'contato: não publicar e-mail não confirmado');
  assert.match(readHtml('privacidade/index.html'), /<time datetime="2026-08-19">/i, 'privacidade: data de atualização');
  assert.match(readHtml('termos/index.html'), /<time datetime="2026-08-19">/i, 'termos: data de atualização');
});

test('aplica design responsivo, PWA, desempenho e proteção de borda', () => {
  const cssPath = join(DIST, 'assets/site.css');
  const css = readFileSync(cssPath, 'utf8');
  for (const token of ['--color-ink', '--color-paper', '--color-signal', '--container', '--space-section']) {
    assert.ok(css.includes(token), `CSS: token ${token} ausente`);
  }
  assert.match(css, /:focus-visible\s*\{/i, 'CSS: foco visível');
  assert.match(css, /--color-focus-inner:\s*#ffffff/i, 'CSS: foco interno branco');
  assert.match(css, /--color-focus-outer:\s*#000000/i, 'CSS: foco externo preto');
  assert.match(css, /:focus-visible\s*\{[^}]*outline:\s*3px solid var\(--color-focus-inner\)[^}]*box-shadow:\s*0 0 0 7px var\(--color-focus-outer\)/si, 'CSS: foco bicolor independente da superfície');
  const focusOverrides = [...css.matchAll(/([^{}]+:focus-visible[^{}]*)\{([^}]*)\}/gsi)]
    .filter(([, selector, body]) => selector.trim() !== ':focus-visible' && /\b(?:outline(?:-[a-z-]+)?|box-shadow)\s*:/i.test(body))
    .map(([, selector]) => selector.trim());
  assert.deepEqual(focusOverrides, [], `CSS: regras específicas sobrescrevem o foco bicolor: ${focusOverrides.join(', ')}`);
  assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)/i, 'CSS: movimento reduzido');
  assert.match(css, /@media\s*\(max-width:\s*960px\)/i, 'CSS: breakpoint tablet');
  assert.match(css, /@media\s*\(max-width:\s*720px\)/i, 'CSS: breakpoint celular');
  assert.doesNotMatch(css, /gradient\s*\(/i, 'CSS: não usar gradiente tech/decorativo');
  assert.ok(statSync(cssPath).size < 65_000, `CSS acima de 65 KB: ${statSync(cssPath).size}`);

  const manifest = JSON.parse(readFileSync(join(DIST, 'manifest.webmanifest'), 'utf8'));
  assert.equal(manifest.lang, 'pt-BR', 'manifest: idioma');
  assert.equal(manifest.scope, '/', 'manifest: scope');
  assert.equal(manifest.display, 'standalone', 'manifest: display');
  assert.deepEqual(manifest.icons?.map((item) => item.sizes), ['192x192', '512x512'], 'manifest: ícones');
  assert.deepEqual(manifest.icons?.map((item) => item.purpose), ['any', 'any'], 'manifest: ícones não são maskable');
  for (const iconFile of ['assets/icon-192.png', 'assets/icon-512.png']) {
    assert.ok(existsSync(join(DIST, iconFile)), `PWA: ${iconFile} ausente`);
  }

  const sitemap = readFileSync(join(DIST, 'sitemap.xml'), 'utf8');
  assert.equal((sitemap.match(/<loc>/g) ?? []).length, 9, 'sitemap: nove páginas indexáveis');
  assert.equal((sitemap.match(/<lastmod>2026-08-19<\/lastmod>/g) ?? []).length, 9, 'sitemap: lastmod em todas as páginas');
  assert.doesNotMatch(sitemap, /404\.html/, 'sitemap: 404 não deve aparecer');

  const netlify = readFileSync(join(ROOT, 'netlify.toml'), 'utf8');
  assert.match(netlify, /command\s*=\s*"npm run verify"/i, 'Netlify: testes obrigatórios antes do deploy');
  for (const header of ['Content-Security-Policy', 'Permissions-Policy', 'Strict-Transport-Security', 'X-Frame-Options', 'X-Content-Type-Options', 'Referrer-Policy']) {
    assert.ok(netlify.includes(header), `Netlify: header ${header} ausente`);
  }
  assert.match(netlify, /for\s*=\s*"\/assets\/\*"[\s\S]*Cache-Control\s*=\s*"public, max-age=0, must-revalidate"/i, 'Netlify: assets com revalidação segura');

  for (const [output] of [
    ['index.html'], ['planos/index.html'], ['como-funciona/index.html'], ['dispositivos/index.html'],
    ['guia-streaming/index.html'], ['faq/index.html'], ['contato/index.html'], ['privacidade/index.html'], ['termos/index.html'], ['404.html'],
  ]) {
    const html = readHtml(output);
    assert.doesNotMatch(html, /<script[^>]+src=/i, `${output}: JavaScript externo`);
    assert.doesNotMatch(html, /<link[^>]+rel="stylesheet"[^>]+href="https?:/i, `${output}: CSS externo`);
    for (const match of html.matchAll(/<img\b([^>]+)>/gi)) {
      assert.match(match[1], /\balt="[^"]*"/i, `${output}: imagem sem alt`);
      assert.match(match[1], /\bwidth="\d+"/i, `${output}: imagem sem width`);
      assert.match(match[1], /\bheight="\d+"/i, `${output}: imagem sem height`);
    }
  }
});

test('não publica preços, e-mail ou horário sem confirmação do responsável', () => {
  const html = [
    'index.html', 'planos/index.html', 'como-funciona/index.html', 'dispositivos/index.html',
    'guia-streaming/index.html', 'faq/index.html', 'contato/index.html', 'privacidade/index.html', 'termos/index.html',
  ].map(readHtml).join('\n');

  for (const placeholder of [
    'R$ 29,90', 'R$ 79,90', 'R$ 279,90', '29.90', '79.90', '279.90',
    'contato@vipstreaming.com.br', 'todos os dias, das 8h às 22h', 'Escolha equilibrada',
  ]) {
    assert.ok(!html.includes(placeholder), `placeholder comercial publicado: ${placeholder}`);
  }
  assert.match(readHtml('planos/index.html'), /Consultar (?:valor|condições)/i, 'planos: orientar consulta comercial');

  for (const output of ['index.html', 'planos/index.html']) {
    for (const schema of schemas(readHtml(output))) {
      const offers = schema.offers ?? schema.hasOfferCatalog?.itemListElement ?? [];
      for (const offer of offers) {
        assert.equal(offer.price, undefined, `${output}: preço não confirmado no schema`);
      }
    }
  }
});
