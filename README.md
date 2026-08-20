# Vip Streaming — site institucional

Site estático da Vip Streaming, reconstruído com arquitetura SEO-first, conteúdo em pt-BR e publicação automática pelo Netlify.

## Estrutura

- `build.mjs` — compila as páginas para `dist/`
- `src/data/site.mjs` — contato, planos, dispositivos, etapas e FAQ
- `src/pages.mjs` — rotas e metadados SEO
- `src/lib/seo.mjs` — dados estruturados Schema.org
- `src/templates/components.mjs` — cabeçalho, rodapé, cards e CTAs
- `src/templates/content.mjs` — conteúdo de cada rota
- `public/assets/site.css` — sistema visual responsivo
- `tests/site.test.mjs` — testes de arquitetura, SEO, conteúdo, acessibilidade, desempenho e Netlify

## Comandos

```bash
npm test
npm run build
npm run verify
```

O diretório `dist/` é gerado e não deve ser editado diretamente.

## Atualização e publicação

1. Altere os arquivos em `src/` ou `public/`.
2. Rode `npm run verify`.
3. Faça commit e `git push origin main`.
4. O Netlify executa `npm run verify`; só publica `dist/` se todos os testes e o build passarem.
5. Confirme a URL ao vivo: <https://vip-streaming.netlify.app>.

## Rotas indexáveis

- `/`
- `/planos/`
- `/como-funciona/`
- `/dispositivos/`
- `/guia-streaming/`
- `/faq/`
- `/contato/`
- `/privacidade/`
- `/termos/`

## Segurança de edição

- Não coloque tokens, senhas ou chaves no repositório.
- Não invente métricas, avaliações ou depoimentos.
- Não cite catálogos, canais ou marcas de terceiros sem comprovação de autorização.
- Confirme preços e condições em `src/data/site.mjs` antes de publicar alterações comerciais.

A versão anterior à reconstrução está preservada na tag GitHub `backup/pre-gpt56-rebuild-20260819-192637`.
