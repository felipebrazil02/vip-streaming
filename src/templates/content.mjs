import { DISPOSITIVOS, FAQ, PASSOS, PLANOS, SITE } from '../data/site.mjs';
import { escapeHtml, icon } from '../lib/html.mjs';
import { arrowLink, ctaBand, faqList, plansGrid, whatsappButton } from './components.mjs';

function pageIntro(page, eyebrow, lead, note = '') {
  return `<section class="page-intro">
    <div class="shell page-intro-grid">
      <div>
        <p class="eyebrow">${escapeHtml(eyebrow)}</p>
        <h1>${escapeHtml(page.h1)}</h1>
      </div>
      <div class="page-intro-copy">
        <p class="lead">${escapeHtml(lead)}</p>
        ${note ? `<p class="fine-print">${escapeHtml(note)}</p>` : ''}
      </div>
    </div>
  </section>`;
}

function renderHome(page) {
  return `<section class="home-hero">
    <div class="shell hero-grid">
      <div class="hero-copy">
        <p class="eyebrow">Vip Streaming</p>
        <h1>${escapeHtml(page.h1)}</h1>
        <p class="hero-lead">Planos por período, orientação para configurar e atendimento direto quando surgir uma dúvida. Você entende as condições antes de decidir.</p>
        <div class="hero-actions">
          ${whatsappButton('Planos no WhatsApp', 'Olá! Quero conhecer os planos e confirmar as condições do Vip Streaming.')}
          ${arrowLink('Comparar opções', '/planos/', 'button button--ghost')}
        </div>
        <ul class="hero-notes" aria-label="Diferenciais do atendimento">
          <li>${icon('check', 'check-icon')} Condições confirmadas antes do pagamento</li>
          <li>${icon('check', 'check-icon')} Orientação de configuração</li>
          <li>${icon('check', 'check-icon')} Atendimento pelo WhatsApp</li>
        </ul>
      </div>
      <div class="brand-stage" aria-label="Jornada Vip Streaming: escolher, confirmar e começar">
        <div class="stage-mark" aria-hidden="true">
          <span class="stage-v">V</span><span class="stage-play"></span>
        </div>
        <p class="stage-label">Sua experiência começa com clareza.</p>
        <ol class="stage-flow">
          <li><span>01</span><strong>Escolha</strong><small>um ciclo</small></li>
          <li><span>02</span><strong>Confirme</strong><small>as condições</small></li>
          <li><span>03</span><strong>Configure</strong><small>com orientação</small></li>
        </ol>
      </div>
    </div>
  </section>

  <section class="assurance-strip" aria-label="Compromissos de atendimento">
    <div class="shell assurance-grid">
      <p><strong>Atendimento humano</strong><span>Converse antes de contratar.</span></p>
      <p><strong>Informação direta</strong><span>Planos e ciclos sem letras miúdas no caminho.</span></p>
      <p><strong>Configuração acompanhada</strong><span>Receba orientação para um aparelho compatível.</span></p>
    </div>
  </section>

  <section class="section section--light">
    <div class="shell split-story">
      <div class="section-heading section-heading--sticky">
        <p class="eyebrow">Sem adivinhação</p>
        <h2>Primeiro você entende. Depois você escolhe.</h2>
      </div>
      <div class="story-copy">
        <p class="lead-dark">Um serviço de streaming não deve começar com dúvida sobre aparelho, ciclo ou atendimento.</p>
        <p>Por isso, o Vip Streaming organiza a contratação em etapas simples. Você compara as opções, confirma a compatibilidade do dispositivo e recebe as condições aplicáveis antes do pagamento.</p>
        <p>Não prometemos que todo aparelho funciona da mesma forma. Modelo, sistema, qualidade da conexão e rede doméstica influenciam a experiência. O atendimento existe justamente para avaliar esses pontos com você.</p>
        ${arrowLink('Veja como funciona', '/como-funciona/')}
      </div>
    </div>
  </section>

  <section class="section section--dark">
    <div class="shell">
      <div class="section-heading section-heading--wide">
        <div><p class="eyebrow">Uma escolha para cada momento</p><h2>Comece pelo período que combina com a sua rotina.</h2></div>
        <p>Mensal para mais flexibilidade, trimestral para equilíbrio e anual para quem prefere um ciclo mais longo. Confirme o valor e as condições no atendimento.</p>
      </div>
      ${plansGrid(true)}
      <div class="section-after">${arrowLink('Ver comparação completa dos planos', '/planos/')}</div>
    </div>
  </section>

  <section class="section section--paper">
    <div class="shell editorial-panels">
      <article class="editorial-panel editorial-panel--large">
        <p class="eyebrow">Compatibilidade</p>
        <h2>O melhor plano começa pelo aparelho certo.</h2>
        <p>Smart TV, celular, tablet, computador e dispositivo de mídia podem ter requisitos diferentes. Antes de contratar, informe o tipo e o modelo do aparelho para receber uma orientação mais precisa.</p>
        ${arrowLink('Ver orientações por dispositivo', '/dispositivos/')}
      </article>
      <article class="editorial-panel editorial-panel--signal">
        ${icon('wifi', 'panel-icon')}
        <h3>Conexão estável importa</h3>
        <p>A distância do roteador, o uso simultâneo da rede e a atualização do aparelho podem afetar o uso diário.</p>
      </article>
      <article class="editorial-panel editorial-panel--ink">
        ${icon('chat', 'panel-icon')}
        <h3>Dúvida antes de pagar?</h3>
        <p>Melhor perguntar agora. O atendimento confirma plano, compatibilidade, avaliação disponível e forma de pagamento.</p>
      </article>
    </div>
  </section>

  <section class="section section--light">
    <div class="shell split-story">
      <div class="section-heading section-heading--sticky">
        <p class="eyebrow">Decida com contexto</p>
        <h2>Um guia curto para evitar escolhas no escuro.</h2>
      </div>
      <div class="story-copy">
        <p>Além de preço, vale observar suporte, regras do plano, privacidade, qualidade da conexão e compatibilidade. Reunimos esses pontos em uma página prática para você comparar com calma.</p>
        <p>O guia não substitui a confirmação comercial. Ele ajuda a preparar as perguntas certas antes de escolher qualquer serviço por assinatura.</p>
        ${arrowLink('Ler o guia de streaming', '/guia-streaming/')}
      </div>
    </div>
  </section>

  <section class="section section--dark">
    <div class="shell faq-preview">
      <div class="section-heading"><p class="eyebrow">Respostas diretas</p><h2>Antes de chamar, veja as dúvidas mais comuns.</h2></div>
      ${faqList(FAQ.slice(0, 3))}
      <div class="section-after">${arrowLink('Ver todas as perguntas', '/faq/')}</div>
    </div>
  </section>

  ${ctaBand()}`;
}

function renderPlans(page) {
  return `${pageIntro(
    page,
    'Compare antes de decidir',
    'Três ciclos, a mesma proposta: contratação clara, orientação de configuração e atendimento direto pelo WhatsApp.',
    'Os valores não são publicados sem confirmação. Consulte as condições atuais antes de realizar qualquer pagamento.',
  )}
  <section class="section section--dark section--first">
    <div class="shell">
      <h2 class="sr-only">Opções de ciclos disponíveis</h2>
      ${plansGrid(false)}
      <div class="commercial-note">
        ${icon('shield', 'note-icon')}
        <div><h2>Confirme antes de pagar</h2><p>O atendimento deve informar valor final, período de acesso, forma de pagamento, compatibilidade e condições aplicáveis. Se algo não estiver claro, pergunte.</p></div>
      </div>
    </div>
  </section>

  <section class="section section--light">
    <div class="shell comparison-layout">
      <div class="section-heading section-heading--sticky">
        <p class="eyebrow">Comparação rápida</p>
        <h2>O que muda entre os planos?</h2>
        <p>O principal diferencial é o período contratado e o custo proporcional. A orientação e o canal de atendimento permanecem disponíveis nas três opções.</p>
      </div>
      <div class="table-wrap" role="region" aria-label="Comparação dos planos" tabindex="0">
        <table>
          <thead><tr><th>Plano</th><th>Período</th><th>Condição comercial</th><th>Indicado para</th></tr></thead>
          <tbody>
            <tr><th>Mensal</th><td>30 dias</td><td>Consultar valor</td><td>Quem prefere decidir a cada mês</td></tr>
            <tr><th>Trimestral</th><td>90 dias</td><td>Consultar valor</td><td>Quem busca um ciclo intermediário</td></tr>
            <tr><th>Anual</th><td>12 meses</td><td>Consultar valor</td><td>Quem prefere um ciclo mais longo</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <section class="section section--paper">
    <div class="shell decision-list">
      <div><span>01</span><h3>Pense no período</h3><p>Escolha um ciclo que você pretende usar de verdade, sem assumir um compromisso maior só pelo desconto proporcional.</p></div>
      <div><span>02</span><h3>Confirme o aparelho</h3><p>Informe tipo, modelo e sistema do dispositivo para evitar uma contratação incompatível com o que você já possui.</p></div>
      <div><span>03</span><h3>Leia as condições</h3><p>Pergunte sobre avaliação, renovação, cancelamento, pagamento e suporte antes de concluir a contratação.</p></div>
    </div>
  </section>
  ${ctaBand({ title: 'Ainda não sabe qual plano escolher?', text: 'Informe seu aparelho e o período que procura. O atendimento ajuda a comparar as opções sem compromisso.', label: 'Pedir orientação', message: 'Olá! Preciso de ajuda para escolher entre os planos Mensal, Trimestral e Anual do Vip Streaming.' })}`;
}

function renderHowItWorks(page) {
  return `${pageIntro(
    page,
    'Quatro etapas',
    'Da comparação à configuração, cada etapa existe para reduzir dúvida e deixar as condições registradas antes do início do serviço.',
  )}
  <section class="section section--dark section--first">
    <div class="shell process-layout">
      <ol class="steps-list">
        ${PASSOS.map((step, index) => `<li class="step" id="passo-${index + 1}">
          <span class="step-number">${String(index + 1).padStart(2, '0')}</span>
          <div><h2>${escapeHtml(step.titulo)}</h2><p>${escapeHtml(step.texto)}</p></div>
        </li>`).join('\n')}
      </ol>
      <aside class="process-aside">
        <p class="eyebrow">Tenha em mãos</p>
        <h2>O atendimento consegue ajudar melhor com contexto.</h2>
        <ul class="plain-list">
          <li>Tipo e modelo do aparelho que pretende usar</li>
          <li>Sistema do dispositivo, quando souber</li>
          <li>Tipo de conexão disponível no local</li>
          <li>Plano e período que deseja comparar</li>
        </ul>
      </aside>
    </div>
  </section>

  <section class="section section--light">
    <div class="shell split-story">
      <div class="section-heading section-heading--sticky">
        <p class="eyebrow">Antes da configuração</p>
        <h2>Prepare o aparelho e a rede.</h2>
      </div>
      <div class="story-copy">
        <p class="lead-dark">Uma boa experiência depende de mais do que a assinatura.</p>
        <p>Atualize o sistema do dispositivo, verifique o espaço disponível e confirme se a rede está estável. Quando possível, aproxime o aparelho do roteador ou use uma conexão cabeada.</p>
        <p>Outros aparelhos conectados podem disputar a internet. Se houver lentidão, faça um teste com menos dispositivos usando a rede ao mesmo tempo. Essas verificações simples ajudam o suporte a identificar a causa de uma dificuldade.</p>
        ${arrowLink('Consultar orientações por dispositivo', '/dispositivos/')}
      </div>
    </div>
  </section>

  <section class="section section--paper">
    <div class="shell support-block">
      <div class="support-mark">${icon('chat', 'support-icon')}</div>
      <div><p class="eyebrow">Depois de começar</p><h2>O suporte continua por perto.</h2><p>Se uma etapa não funcionar como esperado, envie a mensagem recebida, informe o aparelho e descreva o que aparece na tela. Quanto mais claro o relato, mais objetiva tende a ser a orientação.</p></div>
      ${whatsappButton('Falar com o suporte', 'Olá! Preciso de orientação sobre a configuração do Vip Streaming. Meu aparelho é: ')}
    </div>
  </section>
  ${ctaBand({ title: 'Quer confirmar o processo no seu aparelho?', text: 'Explique qual dispositivo pretende usar e tire as dúvidas antes de escolher o plano.', message: 'Olá! Quero confirmar como funciona o Vip Streaming no meu dispositivo antes de contratar.' })}`;
}

function renderDevices(page) {
  const iconBySlug = { 'smart-tv': 'tv', 'celular-tablet': 'phone', computador: 'monitor', 'dispositivo-midia': 'cast' };
  return `${pageIntro(
    page,
    'Compatibilidade primeiro',
    'O tipo de aparelho é apenas o começo. Modelo, sistema, atualização e rede também influenciam a configuração e o uso diário.',
    'Não compre um aparelho novo antes de confirmar os requisitos com o atendimento.',
  )}
  <section class="section section--paper section--first">
    <div class="shell device-list">
      ${DISPOSITIVOS.map((device, index) => `<article class="device-panel" id="${device.slug}">
        <div class="device-index">${String(index + 1).padStart(2, '0')}</div>
        <div class="device-icon">${icon(iconBySlug[device.slug], 'device-svg')}</div>
        <div><h2>${escapeHtml(device.nome)}</h2><p>${escapeHtml(device.resumo)}</p></div>
        <a href="/contato/">Confirmar compatibilidade <span aria-hidden="true">→</span></a>
      </article>`).join('\n')}
    </div>
  </section>

  <section class="section section--dark">
    <div class="shell readiness-grid">
      <div class="readiness-copy">
        <p class="eyebrow">Aparelho pronto?</p>
        <h2>Faça quatro verificações antes de configurar.</h2>
        <p>Pequenos detalhes podem determinar se a instalação será simples ou se o dispositivo precisará de ajustes. Faça essa checagem antes de iniciar.</p>
      </div>
      <ol class="readiness-list">
        <li><span>Atualização</span><p>Use uma versão recente do sistema e reinicie o aparelho depois de atualizar.</p></li>
        <li><span>Armazenamento</span><p>Confirme que há espaço livre suficiente para instalar e manter o recurso necessário.</p></li>
        <li><span>Rede</span><p>Teste a conexão no mesmo cômodo e observe se há quedas ou grandes variações.</p></li>
        <li><span>Acesso</span><p>Tenha os dados enviados pelo atendimento e não compartilhe credenciais com terceiros.</p></li>
      </ol>
    </div>
  </section>

  <section class="section section--light">
    <div class="shell split-story">
      <div class="section-heading section-heading--sticky"><p class="eyebrow">Sobre a internet</p><h2>Velocidade anunciada não conta toda a história.</h2></div>
      <div class="story-copy">
        <p>O plano contratado com a operadora de internet é apenas um dos fatores. Distância do roteador, paredes, interferência, aparelhos conectados e qualidade do equipamento também afetam a estabilidade.</p>
        <p>Se possível, compare o funcionamento perto do roteador e em outro ponto da casa. Uma conexão cabeada costuma reduzir variações, mas nem todo aparelho oferece essa opção.</p>
        <p>Durante o atendimento, descreva como a rede está organizada. Assim fica mais fácil separar uma questão de compatibilidade de um problema de conexão local.</p>
        ${arrowLink('Leia o guia completo de escolha', '/guia-streaming/')}
      </div>
    </div>
  </section>
  ${ctaBand({ title: 'Quer verificar seu dispositivo?', text: 'Envie o tipo, modelo e sistema do aparelho. O atendimento informa o que precisa ser confirmado antes da contratação.', label: 'Consultar meu aparelho', message: 'Olá! Quero consultar a compatibilidade do meu aparelho com o Vip Streaming. Tipo e modelo: ' })}`;
}

function renderGuide(page) {
  return `${pageIntro(
    page,
    'Conteúdo editorial',
    'Preço importa, mas compatibilidade, suporte, transparência e privacidade também. Use este roteiro para comparar com mais segurança.',
  )}
  <article class="guide">
    <div class="section section--light section--first">
    <div class="shell guide-layout">
      <aside class="guide-toc" aria-label="Nesta página">
        <p class="eyebrow">Neste guia</p>
        <a href="#compatibilidade">1. Compatibilidade</a>
        <a href="#conexao">2. Conexão e rede</a>
        <a href="#planos-condicoes">3. Planos e condições</a>
        <a href="#atendimento">4. Atendimento</a>
        <a href="#privacidade-seguranca">5. Privacidade</a>
        <a href="#checklist">6. Checklist final</a>
      </aside>
      <div class="guide-body">
        <p class="guide-meta">Publicado pela equipe Vip Streaming · <time datetime="2026-08-19">19 de agosto de 2026</time> · leitura aproximada de 6 minutos</p>
        <p class="guide-opening">Escolher um serviço de streaming parece simples quando a comparação fica restrita ao preço. Na prática, a experiência também depende do aparelho disponível, da rede doméstica, das regras do plano e da qualidade do atendimento. Uma decisão melhor começa por perguntas concretas, não por promessas amplas.</p>

        <section class="guide-section" id="compatibilidade">
          <p class="eyebrow">01 — Compatibilidade</p>
          <h2>Comece pelo aparelho que você já possui.</h2>
          <p>Antes de olhar o plano, identifique onde pretende usar o serviço. Anote o tipo do dispositivo, o modelo e, se possível, a versão do sistema. Dois aparelhos que parecem semelhantes podem oferecer possibilidades diferentes de configuração.</p>
          <p>Evite aceitar uma resposta genérica como “funciona em tudo”. Peça uma confirmação específica para o seu modelo. Pergunte se existe algum requisito de atualização, armazenamento ou recurso adicional. Se a resposta não for clara, não faça o pagamento até entender.</p>
          <p>Também vale decidir qual tela será a principal. Uma pessoa que usa apenas o celular tem necessidades diferentes de uma família que pretende usar a televisão da sala. A escolha do plano deve partir do uso real.</p>
        </section>

        <section class="guide-section" id="conexao">
          <p class="eyebrow">02 — Conexão e rede</p>
          <h2>A estabilidade da casa pesa tanto quanto a velocidade contratada.</h2>
          <p>A velocidade informada pela operadora de internet não garante que o mesmo desempenho chegue a todos os cômodos. Distância do roteador, paredes, interferência e muitos aparelhos conectados podem reduzir a qualidade da rede.</p>
          <p>Faça testes no lugar em que pretende assistir. Observe não apenas o número máximo, mas também se a conexão oscila ou cai. Quando possível, compare o uso no Wi‑Fi com uma conexão cabeada. Reiniciar equipamentos antigos e atualizar o roteador também pode resolver problemas que parecem vir do serviço.</p>
          <p>Ao pedir ajuda, descreva a rede com detalhes. Diga quantos aparelhos costumam estar conectados e onde o roteador fica. Isso torna a orientação mais útil e evita trocar de plano sem necessidade.</p>
        </section>

        <section class="guide-section" id="planos-condicoes">
          <p class="eyebrow">03 — Planos e condições</p>
          <h2>Compare o período total, não apenas o valor mensal aparente.</h2>
          <p>Planos mais longos costumam ter custo proporcional menor, mas exigem uma decisão por um período maior. Antes de escolher, confirme duração, valor final, forma de pagamento, renovação e regras de cancelamento.</p>
          <p>Pergunte o que acontece ao fim do ciclo e se a renovação é automática ou depende de nova confirmação. Se houver período de avaliação, verifique a duração, os requisitos e o que muda quando ele termina. Guarde as condições recebidas no atendimento.</p>
          <p>Desconfie de urgência artificial. Uma contratação séria permite tempo para ler, perguntar e comparar. O melhor plano é aquele cujas condições você entende e pretende usar, não necessariamente o de maior duração.</p>
        </section>

        <section class="guide-section" id="atendimento">
          <p class="eyebrow">04 — Atendimento</p>
          <h2>O suporte deve ser avaliado antes de ser necessário.</h2>
          <p>Observe se o canal de atendimento é identificado, se os horários estão publicados e se as respostas tratam da sua pergunta. Mensagens automáticas podem iniciar a conversa, mas dúvidas sobre compatibilidade e condições precisam de respostas objetivas.</p>
          <p>Antes da contratação, pergunte como solicitar ajuda, quais informações devem ser enviadas e qual é o horário normal de resposta. Depois, mantenha os dados do aparelho e uma descrição do problema à mão. Capturas da tela podem ajudar, desde que não exponham senhas.</p>
          <p>Um bom atendimento também sabe dizer “precisamos verificar”. Prometer solução instantânea para qualquer situação costuma ser menos confiável do que explicar limites e próximos passos.</p>
        </section>

        <section class="guide-section" id="privacidade-seguranca">
          <p class="eyebrow">05 — Privacidade</p>
          <h2>Proteja seus dados e confirme com quem está falando.</h2>
          <p>Use apenas os canais publicados no site e confira o número antes de enviar qualquer informação. Não compartilhe senha pessoal, código de autenticação de banco ou acesso remoto ao aparelho sem entender exatamente a necessidade.</p>
          <p>Leia a política de privacidade para saber quais dados o site recebe diretamente e o que acontece quando você sai para um aplicativo de mensagens. Plataformas externas possuem regras próprias e podem processar dados de conexão e conta.</p>
          <p>Guarde comprovantes, mensagens com condições comerciais e identificação do pagamento. Se receber um link inesperado, volte ao site pelo endereço digitado no navegador em vez de confiar apenas na mensagem encaminhada.</p>
        </section>

        <section class="guide-section guide-section--checklist" id="checklist">
          <p class="eyebrow">06 — Checklist final</p>
          <h2>Seis respostas para ter antes do pagamento.</h2>
          <ol>
            <li>Meu dispositivo e sistema foram confirmados como compatíveis?</li>
            <li>Minha rede é estável no local em que pretendo usar?</li>
            <li>Entendi o período, o valor final e a forma de renovação?</li>
            <li>Sei como funcionam avaliação e cancelamento, quando aplicáveis?</li>
            <li>Tenho o canal oficial e o horário normal de atendimento?</li>
            <li>Recebi as condições por escrito e sei quem receberá o pagamento?</li>
          </ol>
          <p>Se uma resposta ainda estiver vaga, peça esclarecimento. Decidir com calma costuma ser mais barato do que resolver uma incompatibilidade depois.</p>
        </section>
        <div class="guide-related"><h2>Continue a pesquisa</h2><p>Compare os <a href="/planos/">planos disponíveis</a>, consulte as orientações para <a href="/dispositivos/">dispositivos</a> e leia as <a href="/faq/">perguntas frequentes</a>.</p></div>
      </div>
    </div>
    </div>
  </article>
  ${ctaBand({ title: 'Terminou o checklist?', text: 'Leve suas perguntas para o atendimento e confirme as condições específicas do seu aparelho e do plano escolhido.', message: 'Olá! Li o guia do Vip Streaming e quero confirmar algumas condições antes de escolher um plano.' })}`;
}

function renderFaq(page) {
  return `${pageIntro(
    page,
    'Informação antes da contratação',
    'Reunimos as perguntas mais comuns sobre planos, aparelhos, internet, avaliação, pagamento, cancelamento e suporte.',
  )}
  <section class="section section--dark section--first">
    <div class="shell faq-page-grid">
      <div class="faq-side">
        <p class="eyebrow">Oito respostas</p>
        <h2>Não encontrou o que precisa?</h2>
        <p>Envie o tipo do aparelho, o plano que pretende comparar e sua pergunta. O atendimento consegue responder com mais contexto.</p>
        ${whatsappButton('Enviar minha dúvida', 'Olá! Tenho uma dúvida sobre o Vip Streaming. Minha pergunta é: ')}
      </div>
      ${faqList(FAQ)}
    </div>
  </section>
  <section class="section section--light">
    <div class="shell split-story">
      <div class="section-heading section-heading--sticky"><p class="eyebrow">Antes de pagar</p><h2>Peça confirmação por escrito.</h2></div>
      <div class="story-copy"><p>Mesmo depois de ler esta página, confirme as condições que dependem do seu caso: dispositivo, ciclo, valor final, avaliação disponível, pagamento, renovação e cancelamento.</p><p>Guarde a conversa comercial e o comprovante. Essas informações ajudam a evitar ruído e tornam qualquer atendimento posterior mais objetivo.</p>${arrowLink('Leia os termos de uso', '/termos/')}</div>
    </div>
  </section>
  ${ctaBand({ title: 'Sua pergunta não está aqui?', text: `${SITE.atendimento}. Envie a dúvida com o máximo de detalhes possível.`, message: 'Olá! Consultei as perguntas frequentes e ainda preciso de ajuda sobre: ' })}`;
}

function renderContact(page) {
  return `${pageIntro(
    page,
    'Atendimento direto',
    'Use o WhatsApp para consultar planos, compatibilidade, condições comerciais, privacidade e orientação de configuração.',
  )}
  <section class="section section--paper section--first">
    <div class="shell contact-grid">
      <article class="contact-card contact-card--primary">
        ${icon('chat', 'contact-icon')}
        <p class="eyebrow">Canal principal</p>
        <h2>WhatsApp</h2>
        <p>É o caminho mais rápido para consultar planos, confirmar um aparelho e pedir orientação de configuração.</p>
        <p class="contact-detail">${SITE.whatsappLabel}<br>${SITE.atendimento}</p>
        ${whatsappButton('Iniciar conversa', 'Olá! Vim pela página de contato do Vip Streaming e quero informações sobre: ')}
      </article>
      <article class="contact-card">
        ${icon('shield', 'contact-icon')}
        <p class="eyebrow">Transparência</p>
        <h2>Antes de contratar</h2>
        <p>Consulte as regras gerais e como o site trata dados. Condições específicas devem ser confirmadas no WhatsApp antes do pagamento.</p>
        <div class="contact-policy-links"><a href="/termos/">Termos de uso</a><a href="/privacidade/">Política de privacidade</a></div>
      </article>
      <aside class="contact-prep">
        <p class="eyebrow">Para agilizar</p>
        <h2>Inclua estas informações.</h2>
        <ul class="plain-list">
          <li>Tipo e modelo do dispositivo</li>
          <li>Sistema do aparelho, quando souber</li>
          <li>Plano que deseja comparar</li>
          <li>Descrição objetiva da sua dúvida</li>
        </ul>
        <p>Não envie senha bancária, código de autenticação ou credencial pessoal. Dados de acesso devem ser tratados apenas quando necessários e pelo canal confirmado.</p>
      </aside>
    </div>
  </section>
  <section class="section section--dark">
    <div class="shell service-hours">
      <div>${icon('clock', 'hours-icon')}</div>
      <div><p class="eyebrow">Disponibilidade</p><h2>Confirme o atendimento pelo WhatsApp.</h2><p>O tempo de resposta varia conforme a disponibilidade, a demanda e a complexidade da dúvida. Envie contexto suficiente para facilitar a orientação.</p></div>
    </div>
  </section>`;
}

function renderPrivacy(page) {
  return `${pageIntro(page, 'Transparência', 'Esta política explica o que o site recebe diretamente, o que acontece ao abrir canais externos e como solicitar informações sobre dados pessoais.')}
  <section class="section section--light section--first legal-section">
    <div class="shell legal-layout">
      <aside><p class="eyebrow">Última atualização</p><p><time datetime="2026-08-19">19 de agosto de 2026</time></p><a href="/contato/">Falar sobre privacidade</a></aside>
      <div class="legal-copy">
        <section><h2>1. Escopo desta política</h2><p>Esta política se aplica às páginas públicas do site Vip Streaming. O site apresenta informações, planos e links de contato. Ele não possui área de login, formulário próprio de cadastro ou pagamento incorporado.</p><p>Ao abrir o WhatsApp, você passa a interagir também com o respectivo provedor. Esse serviço possui políticas e configurações próprias, que devem ser consultadas quando necessário.</p></section>
        <section><h2>2. Dados enviados por você</h2><p>O site não solicita dados pessoais diretamente em campos próprios. Ao clicar em um link de contato, você decide quais informações enviar. Para consultar compatibilidade, normalmente bastam tipo, modelo e sistema do aparelho.</p><p>Evite enviar senhas, códigos bancários, documentos ou outras informações que não sejam necessárias para a dúvida. Se uma contratação exigir dados adicionais, a finalidade e o canal devem ser informados antes do envio.</p></section>
        <section><h2>3. Registros técnicos de hospedagem</h2><p>O provedor de hospedagem pode processar registros técnicos, como endereço de rede, data, horário, página acessada, navegador e informações de segurança. Esses registros ajudam a entregar o site, prevenir abuso e diagnosticar falhas.</p><p>O tratamento realizado pela infraestrutura de hospedagem segue os termos e políticas do respectivo provedor. O Vip Streaming não utiliza esses registros para criar perfis publicitários no site.</p></section>
        <section><h2>4. Cookies e medição</h2><p>Nesta versão, o site não possui ferramenta própria de análise de audiência, publicidade comportamental ou personalização baseada em cookies. Recursos técnicos do navegador ou da hospedagem podem operar conforme suas próprias regras.</p><p>Se ferramentas de medição forem adicionadas futuramente, esta política deverá ser atualizada para descrever finalidade, base de tratamento e opções disponíveis ao visitante.</p></section>
        <section><h2>5. Finalidade e compartilhamento</h2><p>Informações enviadas no atendimento são usadas para responder perguntas, verificar condições comerciais, orientar configuração e tratar solicitações relacionadas ao serviço. Elas não devem ser vendidas como cadastro de publicidade.</p><p>O compartilhamento pode ocorrer quando necessário para operar o canal escolhido, cumprir obrigação legal, proteger direitos ou atender uma solicitação autorizada por você.</p></section>
        <section><h2>6. Seus direitos e contato</h2><p>Você pode solicitar confirmação de tratamento, acesso, correção ou eliminação quando aplicável, além de esclarecimentos sobre uso e compartilhamento. A análise considera a legislação brasileira e obrigações de conservação existentes.</p><p>Use o canal indicado na <a href="/contato/">página de contato</a>. Para proteger o titular, pode ser necessário confirmar a identidade antes de responder.</p></section>
      </div>
    </div>
  </section>`;
}

function renderTerms(page) {
  return `${pageIntro(page, 'Regras do site', 'Leia estas condições junto com as informações comerciais apresentadas antes da contratação. Em caso de dúvida, peça esclarecimento no atendimento.')}
  <section class="section section--light section--first legal-section">
    <div class="shell legal-layout">
      <aside><p class="eyebrow">Última atualização</p><p><time datetime="2026-08-19">19 de agosto de 2026</time></p><a href="/contato/">Solicitar esclarecimento</a></aside>
      <div class="legal-copy">
        <section><h2>1. Finalidade do site</h2><p>O site Vip Streaming apresenta informações gerais sobre um serviço de streaming por assinatura, seus ciclos, orientações de compatibilidade e canais de atendimento. O conteúdo ajuda na comparação inicial, mas não substitui a confirmação comercial aplicável ao caso concreto.</p><p>O acesso ao site não cria automaticamente uma relação de contratação. A contratação depende da confirmação das condições, identificação das partes, forma de pagamento e demais informações necessárias.</p></section>
        <section><h2>2. Informações comerciais</h2><p>Valores, períodos e condições são confirmados no atendimento. Antes de pagar, confirme valor final, duração, forma de renovação, possibilidade de avaliação, cancelamento e suporte. Guarde a mensagem que contém essas condições.</p><p>Quando houver diferença entre uma informação antiga e a confirmação comercial mais recente apresentada antes do pagamento, peça esclarecimento e só prossiga depois de entender qual condição será aplicada.</p></section>
        <section><h2>3. Compatibilidade e conexão</h2><p>A compatibilidade depende do tipo, modelo, sistema e estado de atualização do aparelho. A qualidade de uso também pode variar conforme internet, roteador, distância, interferência e quantidade de dispositivos conectados.</p><p>O site oferece orientações gerais, mas não garante desempenho idêntico em todos os ambientes. Informe corretamente o aparelho e a rede para receber uma avaliação mais útil antes da contratação.</p></section>
        <section><h2>4. Responsabilidades do usuário</h2><p>O usuário deve fornecer informações corretas, proteger credenciais, manter aparelhos atualizados e seguir as orientações recebidas. O uso deve respeitar a legislação, os direitos de terceiros e as condições informadas no momento da contratação.</p><p>Não é permitido tentar comprometer a segurança do site, automatizar acessos abusivos, distribuir credenciais sem autorização ou utilizar os canais de contato para fraude, assédio ou envio de conteúdo malicioso.</p></section>
        <section><h2>5. Canais externos</h2><p>Links para WhatsApp levam a um serviço operado por terceiro. Disponibilidade, segurança, armazenamento e recursos desse canal são regidos também pelo respectivo provedor.</p><p>Confira o número publicado no site antes de compartilhar informações. Não envie senha bancária, código de autenticação ou acesso remoto sem compreender a finalidade e confirmar a identidade do contato.</p></section>
        <section><h2>6. Propriedade e conteúdo</h2><p>Marca, textos, identidade visual e código do site são protegidos na forma aplicável. O visitante pode consultar e compartilhar links das páginas, mas não deve copiar o site para se apresentar como o Vip Streaming ou induzir terceiros a erro.</p><p>Menções descritivas a tipos de aparelho e tecnologias têm finalidade informativa e não criam vínculo ou endosso por fabricantes.</p></section>
        <section><h2>7. Alterações e legislação</h2><p>Estes termos podem ser atualizados para refletir mudanças no site, no serviço ou na legislação. A data no início desta página indica a versão publicada. Alterações relevantes devem ser avaliadas antes de uma nova contratação.</p><p>Direitos previstos na legislação brasileira permanecem aplicáveis. Dúvidas podem ser enviadas pela <a href="/contato/">página de contato</a>.</p></section>
      </div>
    </div>
  </section>`;
}

function renderNotFound(page) {
  return `<section class="not-found">
    <div class="shell not-found-grid">
      <div><p class="eyebrow">Erro 404</p><h1>${escapeHtml(page.h1)}</h1><p>O endereço pode ter mudado ou sido digitado incorretamente. Volte ao início, compare os planos ou use a página de contato para encontrar o que procura.</p><div class="hero-actions">${arrowLink('Voltar ao início', '/', 'button button--primary')}${arrowLink('Ver planos', '/planos/', 'button button--ghost')}</div></div>
      <div class="error-mark" aria-hidden="true">404</div>
    </div>
  </section>`;
}

export function renderPageContent(page) {
  switch (page.route) {
    case '/': return renderHome(page);
    case '/planos/': return renderPlans(page);
    case '/como-funciona/': return renderHowItWorks(page);
    case '/dispositivos/': return renderDevices(page);
    case '/guia-streaming/': return renderGuide(page);
    case '/faq/': return renderFaq(page);
    case '/contato/': return renderContact(page);
    case '/privacidade/': return renderPrivacy(page);
    case '/termos/': return renderTerms(page);
    default: return renderNotFound(page);
  }
}
