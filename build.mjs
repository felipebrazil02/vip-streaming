// ============================================================
// Gerador estático do site Vip Streaming
// Rode:  node build.mjs   (gera tudo em dist/)
// ============================================================
import { mkdirSync, writeFileSync, copyFileSync, existsSync, rmSync, cpSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE, PLANOS, FAQ, DISPOSITIVOS, PASSOS } from './src/data/site.mjs';

const raiz = dirname(fileURLToPath(import.meta.url));
const dist = join(raiz, 'dist');
const hoje = new Date().toISOString().slice(0, 10);

// ---------- helpers ----------
const wa = (msg) => 'https://wa.me/' + SITE.whatsapp + '?text=' + encodeURIComponent(msg);

const WA_ASSINAR = wa('Olá! Quero assinar o plano do Vip Streaming.');
const WA_TESTE = wa('Olá! Quero o teste grátis do Vip Streaming.');

const PAGINAS = [
  { path: '/', titulo: 'Vip Streaming | Serviço de Streaming por Assinatura', prio: '1.0', freq: 'weekly' },
  { path: '/planos/', titulo: 'Planos Vip Streaming | Assine a partir de R$ 29,90/mês', prio: '0.9', freq: 'monthly' },
  { path: '/como-funciona/', titulo: 'Como Funciona o Vip Streaming | Ativação em Minutos', prio: '0.8', freq: 'monthly' },
  { path: '/faq/', titulo: 'Perguntas Frequentes | Vip Streaming', prio: '0.8', freq: 'monthly' },
  { path: '/contato/', titulo: 'Contato Vip Streaming | Fale Conosco no WhatsApp', prio: '0.7', freq: 'monthly' },
];

function schemaOrg() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.nome,
    url: SITE.dominio,
    logo: SITE.dominio + '/imagens/logo.png',
    email: SITE.email,
    telephone: '+' + SITE.whatsapp,
    description: SITE.descricao,
  };
}

function head(titulo, desc, path, schema) {
  const url = SITE.dominio + path;
  const ld = schema ? '\n' + JSON.stringify(schema) : '';
  return '<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n'
    + '<meta charset="UTF-8">\n'
    + '<meta name="viewport" content="width=device-width, initial-scale=1">\n'
    + '<title>' + titulo + '</title>\n'
    + '<meta name="description" content="' + desc + '">\n'
    + '<link rel="canonical" href="' + url + '">\n'
    + '<meta name="robots" content="index, follow">\n'
    + '<meta name="theme-color" content="#0a0a14">\n'
    + '<meta property="og:type" content="website">\n'
    + '<meta property="og:site_name" content="' + SITE.nome + '">\n'
    + '<meta property="og:title" content="' + titulo + '">\n'
    + '<meta property="og:description" content="' + desc + '">\n'
    + '<meta property="og:url" content="' + url + '">\n'
    + '<meta property="og:image" content="' + SITE.dominio + '/imagens/logo.png">\n'
    + '<meta property="og:locale" content="pt_BR">\n'
    + '<meta name="twitter:card" content="summary_large_image">\n'
    + '<meta name="twitter:title" content="' + titulo + '">\n'
    + '<meta name="twitter:description" content="' + desc + '">\n'
    + '<meta name="twitter:image" content="' + SITE.dominio + '/imagens/logo.png">\n'
    + '<link rel="icon" type="image/svg+xml" href="/favicon.svg">\n'
    + '<link rel="stylesheet" href="/estilo.css">\n'
    + (ld ? '<script type="application/ld+json">' + ld + '\n</script>\n' : '')
    + '</head>\n<body>\n';
}

function nav(ativo) {
  const itens = [
    ['/', 'Início'],
    ['/planos/', 'Planos'],
    ['/como-funciona/', 'Como funciona'],
    ['/faq/', 'FAQ'],
    ['/contato/', 'Contato'],
  ];
  const links = itens
    .map(([p, l]) => '<a href="' + p + '"' + (p === ativo ? ' class="ativo"' : '') + '>' + l + '</a>')
    .join('\n');
  return '<header class="topo">\n<nav class="nav">\n'
    + '<a href="/" class="marca"><img src="/imagens/logo.png" alt="' + SITE.nome + '" width="36" height="36"> <span>' + SITE.nome + '</span></a>\n'
    + '<div class="nav-links">' + links + '</div>\n'
    + '<a class="btn btn-pequeno" href="' + WA_ASSINAR + '" rel="noopener" target="_blank">Assinar</a>\n'
    + '</nav>\n</header>\n';
}

function ctaWhats() {
  return '<section class="cta">\n'
    + '<h2>Pronto para começar?</h2>\n'
    + '<p>Peça seu teste grátis ou assine agora pelo WhatsApp. Atendimento ' + SITE.horario + '.</p>\n'
    + '<a class="btn btn-grande" href="' + WA_TESTE + '" rel="noopener" target="_blank">Solicitar teste grátis</a>\n'
    + '</section>\n';
}

function rodape() {
  return '<footer class="rodape">\n<div class="rodape-grid">\n'
    + '<div>\n<h3>' + SITE.nome + '</h3>\n<p>' + SITE.tagline + '. Entretenimento em alta qualidade para toda a família, em qualquer tela.</p>\n</div>\n'
    + '<div>\n<h3>Navegação</h3>\n'
    + '<a href="/">Início</a>\n<a href="/planos/">Planos</a>\n<a href="/como-funciona/">Como funciona</a>\n<a href="/faq/">FAQ</a>\n<a href="/contato/">Contato</a>\n</div>\n'
    + '<div>\n<h3>Contato</h3>\n'
    + '<a href="' + WA_ASSINAR + '" rel="noopener" target="_blank">WhatsApp: ' + SITE.whatsappLabel + '</a>\n'
    + '<a href="mailto:' + SITE.email + '">' + SITE.email + '</a>\n'
    + '<p>Atendimento: ' + SITE.horario + '</p>\n</div>\n'
    + '</div>\n<p class="rodape-fim">© ' + SITE.ano + ' ' + SITE.nome + '. Todos os direitos reservados.</p>\n'
    + '</footer>\n'
    + '<a class="whats-float" href="' + WA_TESTE + '" rel="noopener" target="_blank" aria-label="Falar no WhatsApp">'
    + '<svg viewBox="0 0 32 32" width="28" height="28" fill="currentColor"><path d="M16 3C9.4 3 4 8.4 4 15c0 2.1.6 4.2 1.6 6L4 29l8.2-1.6c1.7.9 3.6 1.4 5.8 1.4 6.6 0 12-5.4 12-12S22.6 3 16 3zm0 21.8c-1.8 0-3.6-.5-5.1-1.4l-.4-.2-4.8 1 1-4.7-.2-.4c-1-1.6-1.5-3.4-1.5-5.2 0-5.3 4.5-9.6 10-9.6s10 4.3 10 9.6-4.5 9.9-10 9.9zm5.5-7.3c-.3-.2-1.8-.9-2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.6c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.4z"/></svg>'
    + '</a>\n'
    + '</body>\n</html>\n';
}

// ---------- schemas ----------
function schemaWebSite() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.nome,
    url: SITE.dominio,
    inLanguage: 'pt-BR',
    publisher: schemaOrg(),
  };
}

function schemaService(comPlanos) {
  const s = schemaOrg();
  if (comPlanos) {
    s['@type'] = 'Service';
    s.serviceType = 'Assinatura de streaming';
    s.hasOfferCatalog = {
      '@type': 'OfferCatalog',
      name: 'Planos ' + SITE.nome,
      itemListElement: PLANOS.map((p, i) => ({
        '@type': 'Offer',
        position: i + 1,
        name: 'Plano ' + p.nome,
        price: p.preco.replace('R$ ', '').replace(',', '.'),
        priceCurrency: 'BRL',
        description: p.beneficios.join('. '),
      })),
    };
  }
  return s;
}

function schemaHowTo() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Como assinar o Vip Streaming',
    description: 'Passo a passo para contratar e usar o serviço de streaming Vip Streaming.',
    step: PASSOS.map((p, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: p.titulo,
      text: p.texto,
    })),
  };
}

function schemaFaq() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((f) => ({
      '@type': 'Question',
      name: f.p,
      acceptedAnswer: { '@type': 'Answer', text: f.r },
    })),
  };
}

// ---------- páginas ----------
function paginaHome() {
  const cardsPlanos = PLANOS.map((p) =>
    '<article class="plano-card' + (p.destaque ? ' destaque' : '') + '">\n'
    + (p.destaque ? '<span class="selo">Mais escolhido</span>\n' : '')
    + '<h3>' + p.nome + '</h3>\n'
    + '<p class="preco">' + p.preco + ' <small>' + p.periodo + '</small></p>\n'
    + '<ul>' + p.beneficios.map((b) => '<li>' + b + '</li>').join('\n') + '</ul>\n'
    + '<a class="btn" href="' + WA_ASSINAR + '" rel="noopener" target="_blank">Assinar agora</a>\n'
    + '</article>'
  ).join('\n');

  const cardsDev = DISPOSITIVOS.map((d) =>
    '<div class="dev-card"><h3>' + d.nome + '</h3><p>' + d.detalhe + '</p></div>'
  ).join('\n');

  const faqResumo = FAQ.slice(0, 4).map((f) =>
    '<details><summary>' + f.p + '</summary><p>' + f.r + '</p></details>'
  ).join('\n');

  return head(
    'Vip Streaming | Serviço de Streaming por Assinatura',
    'Assine o Vip Streaming: entretenimento em HD e 4K na Smart TV, celular, tablet, TV Box ou computador. Planos a partir de R$ 29,90. Teste grátis pelo WhatsApp.',
    '/',
    [schemaWebSite(), schemaService(true)]
  )
    + nav('/')
    + '<main>\n'
    + '<section class="hero">\n'
    + '<h1>Seu entretenimento em <span>qualquer tela</span></h1>\n'
    + '<p>' + SITE.tagline + ' com qualidade HD e 4K, compatível com Smart TV, celular, tablet, TV Box e computador. Ativação em minutos e suporte humano pelo WhatsApp.</p>\n'
    + '<div class="hero-cta">\n'
    + '<a class="btn btn-grande" href="' + WA_TESTE + '" rel="noopener" target="_blank">Quero meu teste grátis</a>\n'
    + '<a class="btn btn-contorno" href="/planos/">Ver planos</a>\n'
    + '</div>\n'
    + '<p class="hero-nota">Sem fidelidade · Ativação rápida · Suporte todos os dias</p>\n'
    + '</section>\n'
    + '<section class="secao">\n<h2>Por que escolher o ' + SITE.nome + '?</h2>\n'
    + '<div class="grade4">\n'
    + '<div class="feat"><h3>Qualidade HD e 4K</h3><p>Imagem nítida e estável para aproveitar cada detalhe.</p></div>\n'
    + '<div class="feat"><h3>Todos os dispositivos</h3><p>Smart TV, TV Box, celular, tablet, computador, Chromecast e Apple TV.</p></div>\n'
    + '<div class="feat"><h3>Ativação em minutos</h3><p>Receba seu acesso rápido pelo WhatsApp, com passo a passo incluso.</p></div>\n'
    + '<div class="feat"><h3>Suporte 7 dias por semana</h3><p>Atendimento humano e rápido sempre que você precisar.</p></div>\n'
    + '</div>\n</section>\n'
    + '<section class="secao fundo-2">\n<h2>Escolha seu plano</h2>\n'
    + '<div class="planos">' + cardsPlanos + '</div>\n'
    + '<p class="centro"><a class="btn btn-contorno" href="/planos/">Comparar todos os planos</a></p>\n'
    + '</section>\n'
    + '<section class="secao">\n<h2>Funciona em qualquer tela</h2>\n'
    + '<div class="grade5">' + cardsDev + '</div>\n'
    + '</section>\n'
    + '<section class="secao fundo-2">\n<h2>Dúvidas frequentes</h2>\n'
    + '<div class="faq">' + faqResumo + '</div>\n'
    + '<p class="centro"><a class="btn btn-contorno" href="/faq/">Ver todas as perguntas</a></p>\n'
    + '</section>\n'
    + ctaWhats()
    + '</main>\n'
    + rodape();
}

function paginaPlanos() {
  const cards = PLANOS.map((p) =>
    '<article class="plano-card' + (p.destaque ? ' destaque' : '') + '">\n'
    + (p.destaque ? '<span class="selo">Mais escolhido</span>\n' : '')
    + '<h3>' + p.nome + '</h3>\n'
    + '<p class="preco">' + p.preco + ' <small>' + p.periodo + '</small></p>\n'
    + '<ul>' + p.beneficios.map((b) => '<li>' + b + '</li>').join('\n') + '</ul>\n'
    + '<a class="btn" href="' + WA_ASSINAR + '" rel="noopener" target="_blank">Assinar ' + p.nome + '</a>\n'
    + '</article>'
  ).join('\n');

  const linhas = PLANOS.map((p) =>
    '<tr><td><strong>Plano ' + p.nome + '</strong></td><td>' + p.preco + '</td><td>' + p.periodo + '</td><td>HD e 4K em todos os dispositivos</td></tr>'
  ).join('\n');

  return head(
    'Planos Vip Streaming | Assine a partir de R$ 29,90/mês',
    'Conheça os planos do Vip Streaming: Mensal (R$ 29,90), Trimestral (R$ 79,90) e Anual (R$ 279,90). Qualidade HD e 4K em todos os dispositivos, sem fidelidade.',
    '/planos/',
    schemaService(true)
  )
    + nav('/planos/')
    + '<main>\n'
    + '<section class="hero hero-menor">\n'
    + '<h1>Planos <span>' + SITE.nome + '</span></h1>\n'
    + '<p>Escolha o plano ideal para você. Todos incluem qualidade HD e 4K, acesso em todos os dispositivos e suporte via WhatsApp. Sem fidelidade, cancele quando quiser.</p>\n'
    + '</section>\n'
    + '<section class="secao">\n<div class="planos">' + cards + '</div>\n</section>\n'
    + '<section class="secao fundo-2">\n<h2>Comparativo de planos</h2>\n'
    + '<div class="tabela-wrap">\n<table class="tabela">\n<thead><tr><th>Plano</th><th>Preço</th><th>Periodicidade</th><th>Inclui</th></tr></thead>\n<tbody>' + linhas + '</tbody>\n</table>\n</div>\n'
    + '<p class="centro"><a class="btn" href="' + WA_TESTE + '" rel="noopener" target="_blank">Não sei qual escolher — quero testar grátis</a></p>\n'
    + '</section>\n'
    + ctaWhats()
    + '</main>\n'
    + rodape();
}

function paginaComoFunciona() {
  const passos = PASSOS.map((p, i) =>
    '<li class="passo">\n<span class="passo-num">' + (i + 1) + '</span>\n<div><h3>' + p.titulo + '</h3><p>' + p.texto + '</p></div>\n</li>'
  ).join('\n');

  return head(
    'Como Funciona o Vip Streaming | Ativação em Minutos',
    'Assinar o Vip Streaming é simples: escolha o plano, chame no WhatsApp, receba seu acesso em minutos e assista em qualquer dispositivo. Veja o passo a passo.',
    '/como-funciona/',
    schemaHowTo()
  )
    + nav('/como-funciona/')
    + '<main>\n'
    + '<section class="hero hero-menor">\n'
    + '<h1>Como <span>funciona</span></h1>\n'
    + '<p>Do primeiro contato à primeira tela: você começa a assistir em poucos minutos.</p>\n'
    + '</section>\n'
    + '<section class="secao">\n<ol class="passos">' + passos + '</ol>\n</section>\n'
    + '<section class="secao fundo-2">\n<h2>O que você precisa</h2>\n'
    + '<div class="grade3">\n'
    + '<div class="feat"><h3>Internet estável</h3><p>Recomendamos a partir de 10 Mbps para HD e 25 Mbps para 4K. Conexão por cabo é ainda mais estável.</p></div>\n'
    + '<div class="feat"><h3>Um dispositivo compatível</h3><p>Smart TV, TV Box Android, celular, tablet, computador, Chromecast ou Apple TV.</p></div>\n'
    + '<div class="feat"><h3>WhatsApp</h3><p>Todo o atendimento, ativação e suporte acontecem pelo WhatsApp.</p></div>\n'
    + '</div>\n</section>\n'
    + ctaWhats()
    + '</main>\n'
    + rodape();
}

function paginaFaq() {
  const itens = FAQ.map((f) => '<details><summary>' + f.p + '</summary><p>' + f.r + '</p></details>').join('\n');
  return head(
    'Perguntas Frequentes | Vip Streaming',
    'Tire suas dúvidas sobre o Vip Streaming: dispositivos compatíveis, velocidade de internet, planos, teste grátis, ativação e suporte. Fale com a gente no WhatsApp.',
    '/faq/',
    schemaFaq()
  )
    + nav('/faq/')
    + '<main>\n'
    + '<section class="hero hero-menor">\n'
    + '<h1>Perguntas <span>frequentes</span></h1>\n'
    + '<p>Tudo o que você precisa saber antes de assinar. Não achou sua resposta? Chame a gente no WhatsApp.</p>\n'
    + '</section>\n'
    + '<section class="secao">\n<div class="faq">' + itens + '</div>\n</section>\n'
    + ctaWhats()
    + '</main>\n'
    + rodape();
}

function paginaContato() {
  return head(
    'Contato Vip Streaming | Fale Conosco no WhatsApp',
    'Fale com o Vip Streaming pelo WhatsApp ou e-mail. Atendimento ' + SITE.horario + '. Peça seu teste grátis ou tire dúvidas com a nossa equipe.',
    '/contato/',
    schemaOrg()
  )
    + nav('/contato/')
    + '<main>\n'
    + '<section class="hero hero-menor">\n'
    + '<h1>Fale <span>conosco</span></h1>\n'
    + '<p>Atendimento rápido e humano, ' + SITE.horario + '.</p>\n'
    + '</section>\n'
    + '<section class="secao">\n<div class="contato-cards">\n'
    + '<a class="contato-card" href="' + WA_ASSINAR + '" rel="noopener" target="_blank">\n'
    + '<h3>WhatsApp</h3><p>' + SITE.whatsappLabel + '</p><p class="contato-dica">Resposta rápida — é o melhor canal para teste grátis e assinatura.</p>\n</a>\n'
    + '<a class="contato-card" href="mailto:' + SITE.email + '">\n'
    + '<h3>E-mail</h3><p>' + SITE.email + '</p><p class="contato-dica">Para assuntos comerciais e parcerias.</p>\n</a>\n'
    + '</div>\n</section>\n'
    + ctaWhats()
    + '</main>\n'
    + rodape();
}

function pagina404() {
  return head(
    'Página não encontrada | Vip Streaming',
    'A página que você procura não existe. Volte para a página inicial do Vip Streaming.',
    '/404.html',
    schemaOrg()
  )
    + nav('/404.html')
    + '<main>\n<section class="hero">\n<h1>Ops, página não <span>encontrada</span></h1>\n'
    + '<p>O endereço que você tentou acessar não existe ou foi movido.</p>\n'
    + '<a class="btn btn-grande" href="/">Voltar para a página inicial</a>\n'
    + '</section>\n</main>\n'
    + rodape();
}

// ---------- build ----------
rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });

// assets estáticos
for (const a of ['estilo.css', 'imagens', 'favicon.svg']) {
  const origem = join(raiz, 'public', a);
  if (existsSync(origem)) cpSync(origem, join(dist, a), { recursive: true });
}

// páginas
const paginas = {
  'index.html': paginaHome(),
  'planos/index.html': paginaPlanos(),
  'como-funciona/index.html': paginaComoFunciona(),
  'faq/index.html': paginaFaq(),
  'contato/index.html': paginaContato(),
  '404.html': pagina404(),
};
for (const [arquivo, html] of Object.entries(paginas)) {
  const caminho = join(dist, arquivo);
  mkdirSync(dirname(caminho), { recursive: true });
  writeFileSync(caminho, html, 'utf8');
}

// sitemap.xml
const urls = PAGINAS.map(
  (p) => '  <url>\n    <loc>' + SITE.dominio + p.path + '</loc>\n    <lastmod>' + hoje + '</lastmod>\n    <changefreq>' + p.freq + '</changefreq>\n    <priority>' + p.prio + '</priority>\n  </url>'
).join('\n');
writeFileSync(
  join(dist, 'sitemap.xml'),
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + urls + '\n</urlset>\n',
  'utf8'
);

// robots.txt
writeFileSync(
  join(dist, 'robots.txt'),
  'User-agent: *\nAllow: /\n\nSitemap: ' + SITE.dominio + '/sitemap.xml\n',
  'utf8'
);

console.log('✔ Build concluído em dist/');
console.log('  Páginas: ' + Object.keys(paginas).join(', '));
console.log('  Sitemap: ' + SITE.dominio + '/sitemap.xml');
