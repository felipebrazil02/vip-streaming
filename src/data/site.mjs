// ============================================================
// CONFIG CENTRAL DO SITE — edite aqui e rode `node build.mjs`
// ============================================================

export const SITE = {
  nome: 'Vip Streaming',
  tagline: 'Serviço de streaming por assinatura',
  descricao:
    'Assine o Vip Streaming e tenha entretenimento em alta qualidade em qualquer tela: Smart TV, celular, tablet, TV Box ou computador. Ativação rápida e suporte via WhatsApp.',
  // TODO: trocar pelo domínio comprado (ex: https://vipstreaming.com.br)
  dominio: 'https://vip-streaming.netlify.app',
  whatsapp: '5511915011527',
  whatsappLabel: '(11) 91501-1527',
  email: 'contato@vipstreaming.com.br',
  horario: 'todos os dias, das 8h às 22h',
  ano: 2026,
};

export const PLANOS = [
  {
    slug: 'mensal',
    nome: 'Mensal',
    preco: 'R$ 29,90',
    periodo: 'por mês',
    destaque: false,
    beneficios: [
      'Qualidade HD e 4K',
      'Acesso em todos os dispositivos',
      'Ativação em minutos',
      'Suporte via WhatsApp 7 dias por semana',
      'Sem fidelidade',
    ],
  },
  {
    slug: 'trimestral',
    nome: 'Trimestral',
    preco: 'R$ 79,90',
    periodo: 'a cada 3 meses',
    destaque: true,
    beneficios: [
      'Tudo do plano Mensal',
      'Equivale a R$ 26,63 por mês',
      'Prioridade no suporte',
      'Acesso em todos os dispositivos',
    ],
  },
  {
    slug: 'anual',
    nome: 'Anual',
    preco: 'R$ 279,90',
    periodo: 'por ano',
    destaque: false,
    beneficios: [
      'Tudo do plano Trimestral',
      'Equivale a R$ 23,32 por mês',
      'Melhor custo-benefício',
      'Suporte VIP',
    ],
  },
];

export const DISPOSITIVOS = [
  { nome: 'Smart TV', detalhe: 'Samsung, LG, TCL, Philco e mais' },
  { nome: 'TV Box Android', detalhe: 'Qualquer modelo com Android' },
  { nome: 'Celular e Tablet', detalhe: 'Android e iOS' },
  { nome: 'Computador', detalhe: 'Windows, Mac e Linux' },
  { nome: 'Chromecast e Apple TV', detalhe: 'Assista na TV sem fio' },
];

export const PASSOS = [
  {
    titulo: 'Escolha seu plano',
    texto:
      'Mensal, trimestral ou anual — sem fidelidade. Você escolhe o que cabe no seu bolso.',
  },
  {
    titulo: 'Chame no WhatsApp',
    texto:
      'Fale com a gente pelo WhatsApp ' +
      SITE.whatsappLabel +
      ' e peça seu acesso. Atendimento rápido, todos os dias.',
  },
  {
    titulo: 'Receba seu acesso',
    texto:
      'Em poucos minutos você recebe os dados de acesso e o passo a passo de instalação.',
  },
  {
    titulo: 'Assista em qualquer tela',
    texto:
      'Configure na sua Smart TV, celular, tablet, TV Box ou computador e aproveite.',
  },
];

export const FAQ = [
  {
    p: 'O que é o Vip Streaming?',
    r: 'O Vip Streaming é um serviço de streaming por assinatura que leva entretenimento em alta qualidade para a sua casa, em qualquer tela conectada à internet.',
  },
  {
    p: 'Quais dispositivos são compatíveis?',
    r: 'O serviço funciona em Smart TVs (Samsung, LG, TCL, Philco e outras), TV Box Android, celulares e tablets (Android e iOS), computadores, Chromecast e Apple TV.',
  },
  {
    p: 'Preciso de antena ou cabo para usar?',
    r: 'Não. O Vip Streaming funciona 100% pela internet. Basta ter uma conexão estável: recomendamos a partir de 10 Mbps para HD e 25 Mbps para 4K.',
  },
  {
    p: 'Quanto custa a assinatura?',
    r: 'Os planos custam a partir de R$ 29,90 por mês, com opções trimestral (R$ 79,90) e anual (R$ 279,90) com melhor custo-benefício.',
  },
  {
    p: 'Tem período de teste?',
    r: 'Sim! Oferecemos um período de avaliação para você conhecer o serviço antes de assinar. Solicite pelo WhatsApp e liberamos rapidinho.',
  },
  {
    p: 'Como recebo meu acesso?',
    r: 'Você chama a gente no WhatsApp, escolhe o plano e recebe os dados de acesso em poucos minutos, junto com o passo a passo de instalação.',
  },
  {
    p: 'Posso usar em mais de um aparelho?',
    r: 'Sim, a assinatura funciona nos seus dispositivos principais. Em caso de dúvida, nosso suporte te ajuda a configurar todos.',
  },
  {
    p: 'Como funciona o suporte?',
    r: 'Nosso suporte é feito pelo WhatsApp, todos os dias da semana. Qualquer dúvida de instalação ou uso, é só chamar.',
  },
  {
    p: 'Como falo com o Vip Streaming?',
    r:
      'Pelo WhatsApp ' +
      SITE.whatsappLabel +
      ' ou pelo e-mail ' +
      SITE.email +
      '. Atendimento ' +
      SITE.horario +
      '.',
  },
  {
    p: 'Preciso pagar algo além da assinatura?',
    r: 'Não. A assinatura cobre o serviço completo. Você só precisa de uma conexão de internet para assistir.',
  },
];
