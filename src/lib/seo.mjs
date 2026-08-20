import { DISPOSITIVOS, FAQ, PASSOS, PLANOS, SITE } from '../data/site.mjs';

const context = 'https://schema.org';
const orgId = `${SITE.url}/#organization`;
const siteId = `${SITE.url}/#website`;

export function organizationSchema() {
  return {
    '@context': context,
    '@type': 'Organization',
    '@id': orgId,
    name: SITE.nome,
    url: SITE.url,
    logo: `${SITE.url}/assets/mark-vip.svg`,
    description: SITE.descricao,
    ...(SITE.email ? { email: SITE.email } : {}),
    telephone: `+${SITE.whatsapp}`,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      telephone: `+${SITE.whatsapp}`,
      availableLanguage: 'Portuguese',
      areaServed: SITE.pais,
    },
  };
}

export function websiteSchema() {
  return {
    '@context': context,
    '@type': 'WebSite',
    '@id': siteId,
    name: SITE.nome,
    url: SITE.url,
    inLanguage: SITE.idioma,
    publisher: { '@id': orgId },
  };
}

export function serviceSchema() {
  return {
    '@context': context,
    '@type': 'Service',
    '@id': `${SITE.url}/planos/#service`,
    name: 'Serviço de streaming por assinatura Vip Streaming',
    serviceType: 'Serviço de streaming por assinatura',
    description: SITE.descricao,
    url: `${SITE.url}/planos/`,
    provider: { '@id': orgId },
    areaServed: { '@type': 'Country', name: 'Brasil' },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: `${SITE.url}/contato/`,
      servicePhone: { '@type': 'ContactPoint', telephone: `+${SITE.whatsapp}` },
    },
    offers: PLANOS.map((plano) => ({
      '@type': 'Offer',
      name: `Plano ${plano.nome}`,
      url: `${SITE.url}/planos/#${plano.slug}`,
      description: `${plano.ciclo}. ${plano.resumo}`,
    })),
  };
}

function breadcrumbSchema(page) {
  return {
    '@context': context,
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Início',
        item: `${SITE.url}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: page.label,
        item: `${SITE.url}${page.route}`,
      },
    ],
  };
}

function howToSchema(page) {
  return {
    '@context': context,
    '@type': 'HowTo',
    name: page.h1,
    description: page.description,
    step: PASSOS.map((passo, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: passo.titulo,
      text: passo.texto,
      url: `${SITE.url}${page.route}#passo-${index + 1}`,
    })),
  };
}

function collectionSchema(page) {
  return {
    '@context': context,
    '@type': 'CollectionPage',
    name: page.h1,
    description: page.description,
    url: `${SITE.url}${page.route}`,
    inLanguage: SITE.idioma,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: DISPOSITIVOS.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.nome,
        url: `${SITE.url}${page.route}#${item.slug}`,
      })),
    },
  };
}

function articleSchema(page) {
  return {
    '@context': context,
    '@type': 'Article',
    headline: page.h1,
    description: page.description,
    image: `${SITE.url}${SITE.imagemSocial}`,
    datePublished: SITE.publicadoEm,
    dateModified: SITE.publicadoEm,
    inLanguage: SITE.idioma,
    mainEntityOfPage: `${SITE.url}${page.route}`,
    author: { '@id': orgId },
    publisher: { '@id': orgId },
  };
}

function faqSchema() {
  return {
    '@context': context,
    '@type': 'FAQPage',
    mainEntity: FAQ.map((item) => ({
      '@type': 'Question',
      name: item.pergunta,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.resposta,
      },
    })),
  };
}

function contactPageSchema(page) {
  return {
    '@context': context,
    '@type': 'ContactPage',
    name: page.h1,
    description: page.description,
    url: `${SITE.url}${page.route}`,
    inLanguage: SITE.idioma,
    mainEntity: { '@id': orgId },
  };
}

function webPageSchema(page) {
  return {
    '@context': context,
    '@type': 'WebPage',
    name: page.h1,
    description: page.description,
    url: `${SITE.url}${page.route}`,
    inLanguage: SITE.idioma,
    isPartOf: { '@id': siteId },
  };
}

export function schemasFor(page) {
  switch (page.schema) {
    case 'home':
      return [organizationSchema(), websiteSchema(), serviceSchema()];
    case 'service':
      return [breadcrumbSchema(page), serviceSchema()];
    case 'howto':
      return [breadcrumbSchema(page), howToSchema(page)];
    case 'collection':
      return [breadcrumbSchema(page), collectionSchema(page)];
    case 'article':
      return [breadcrumbSchema(page), articleSchema(page)];
    case 'faq':
      return [breadcrumbSchema(page), faqSchema()];
    case 'contact':
      return [breadcrumbSchema(page), contactPageSchema(page), organizationSchema()];
    case 'webpage':
    default:
      return page.indexable ? [breadcrumbSchema(page), webPageSchema(page)] : [webPageSchema(page)];
  }
}
