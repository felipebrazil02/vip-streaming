import { FAQ, PLANOS, SITE } from '../data/site.mjs';
import { escapeHtml, icon, whatsappUrl } from '../lib/html.mjs';

const PRIMARY_NAV = [
  ['/', 'Início'],
  ['/planos/', 'Planos'],
  ['/como-funciona/', 'Como funciona'],
  ['/dispositivos/', 'Dispositivos'],
  ['/guia-streaming/', 'Guia'],
  ['/faq/', 'Dúvidas'],
];

function navLinks(currentRoute, className = '') {
  return PRIMARY_NAV.map(([href, label]) => {
    const current = currentRoute === href ? ' aria-current="page"' : '';
    return `<a class="${className}" href="${href}"${current}>${label}</a>`;
  }).join('\n');
}

export function siteHeader(currentRoute) {
  const message = 'Olá! Quero conhecer os planos e confirmar as condições do Vip Streaming.';
  return `<a class="skip-link" href="#conteudo">Pular para o conteúdo</a>
<header class="site-header">
  <div class="shell header-inner">
    <a class="brand" href="/" aria-label="Vip Streaming — página inicial">
      <img src="/assets/logo-vip.svg" width="244" height="52" alt="Vip Streaming">
    </a>
    <nav class="desktop-nav" aria-label="Navegação principal">
      ${navLinks(currentRoute, 'nav-link')}
    </nav>
    <a class="header-cta" href="${whatsappUrl(message)}" target="_blank" rel="noopener noreferrer" aria-label="Falar no WhatsApp">
      ${icon('chat', 'button-icon')}<span>Falar no WhatsApp</span>
    </a>
    <details class="mobile-menu">
      <summary aria-label="Abrir menu"><span></span><span></span></summary>
      <nav aria-label="Navegação móvel">
        ${navLinks(currentRoute, 'mobile-link')}
        <a class="mobile-contact" href="/contato/">Contato</a>
      </nav>
    </details>
  </div>
</header>`;
}

export function breadcrumb(page) {
  if (page.route === '/' || !page.indexable) return '';
  return `<nav class="breadcrumb shell" aria-label="Breadcrumb">
    <a href="/">Início</a><span aria-hidden="true">/</span><span aria-current="page">${escapeHtml(page.label)}</span>
  </nav>`;
}

export function siteFooter() {
  const message = 'Olá! Vim pelo site Vip Streaming e quero tirar uma dúvida.';
  return `<footer class="site-footer">
  <div class="shell footer-grid">
    <div class="footer-brand">
      <img src="/assets/logo-vip.svg" width="244" height="52" alt="Vip Streaming">
      <p>${SITE.tagline}</p>
      <p class="footer-note">Informações claras antes da contratação, com atendimento direto para confirmar planos, compatibilidade e condições.</p>
    </div>
    <div>
      <h2>Conheça</h2>
      <a href="/planos/">Planos</a>
      <a href="/como-funciona/">Como funciona</a>
      <a href="/dispositivos/">Dispositivos</a>
      <a href="/guia-streaming/">Guia de streaming</a>
      <a href="/faq/">Dúvidas frequentes</a>
    </div>
    <div>
      <h2>Atendimento</h2>
      <a href="/contato/">Página de contato</a>
      <a href="${whatsappUrl(message)}" target="_blank" rel="noopener noreferrer">WhatsApp ${SITE.whatsappLabel}</a>
      ${SITE.email ? `<a href="mailto:${SITE.email}">${SITE.email}</a>` : ''}
      <p>${SITE.atendimento}</p>
    </div>
    <div>
      <h2>Transparência</h2>
      <a href="/privacidade/">Política de privacidade</a>
      <a href="/termos/">Termos de uso</a>
      <p>Valores, compatibilidade e condições devem ser confirmados antes do pagamento.</p>
    </div>
  </div>
  <div class="shell footer-bottom">
    <p>© 2026 Vip Streaming. Todos os direitos reservados.</p>
    <a href="/">Voltar ao início</a>
  </div>
</footer>`;
}

export function whatsappButton(label, message, className = 'button button--primary') {
  return `<a class="${className}" href="${whatsappUrl(message)}" target="_blank" rel="noopener noreferrer">${icon('chat', 'button-icon')}<span>${escapeHtml(label)}</span></a>`;
}

export function arrowLink(label, href, className = 'text-link') {
  return `<a class="${className}" href="${href}"><span>${escapeHtml(label)}</span>${icon('arrow', 'link-icon')}</a>`;
}

export function planCard(plan, compact = false) {
  const message = `Olá! Quero confirmar as condições do plano ${plan.nome} do Vip Streaming.`;
  return `<article class="plan-card${compact ? ' plan-card--compact' : ''}" id="${plan.slug}">
    <div class="plan-heading">
      <p class="eyebrow">Plano</p>
      <h3>${escapeHtml(plan.nome)}</h3>
      <p>${escapeHtml(plan.resumo)}</p>
    </div>
    <p class="plan-price${plan.preco === 'Consultar valor' ? ' plan-price--consult' : ''}"><strong>${escapeHtml(plan.preco)}</strong><span> / ${escapeHtml(plan.ciclo)}</span></p>
    <ul class="check-list">
      ${plan.beneficios.map((item) => `<li>${icon('check', 'check-icon')}<span>${escapeHtml(item)}</span></li>`).join('\n')}
    </ul>
    ${whatsappButton(`Consultar ${plan.nome} no WhatsApp`, message, 'button button--secondary button--wide')}
  </article>`;
}

export function plansGrid(compact = false) {
  return `<div class="plans-grid">${PLANOS.map((plan) => planCard(plan, compact)).join('\n')}</div>`;
}

export function faqList(items = FAQ) {
  return `<div class="faq-list">${items.map((item, index) => `<details class="faq-item"${index === 0 ? ' open' : ''}>
    <summary><span>${escapeHtml(item.pergunta)}</span><span class="faq-marker" aria-hidden="true"></span></summary>
    <div class="faq-answer"><p>${escapeHtml(item.resposta)}</p></div>
  </details>`).join('\n')}</div>`;
}

export function ctaBand({ title = 'Quer confirmar se faz sentido para você?', text = 'Converse com o atendimento antes de contratar. Tire dúvidas sobre plano, aparelho, conexão e condições.', label = 'Falar com o atendimento', message = 'Olá! Quero confirmar os planos, a compatibilidade e as condições do Vip Streaming.' } = {}) {
  return `<section class="cta-band" aria-labelledby="cta-title">
    <div class="shell cta-band-inner">
      <div>
        <p class="eyebrow">Próximo passo</p>
        <h2 id="cta-title">${escapeHtml(title)}</h2>
        <p>${escapeHtml(text)}</p>
      </div>
      ${whatsappButton(label, message)}
    </div>
  </section>`;
}
