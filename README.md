# MarcaAgenda

Projeto novo e independente para agendamento multiempresa.

## Backend
- Supabase project: `MarcaAgenda`
- Project ref: `xdbnwojiwrjsoxmzuosu`
- Region: São Paulo (`sa-east-1`)
- API URL: `https://xdbnwojiwrjsoxmzuosu.supabase.co`

## Segurança aplicada
- RLS nas tabelas expostas.
- Nenhum INSERT público direto em `clients` ou `appointments`.
- Reserva pública feita por RPC com validação de serviço, profissional, horário, bloqueios e limite por telefone.
- Constraint de exclusão no Postgres impede sobreposição de horários do mesmo profissional.
- Chave usada no frontend é somente a chave publicável.
- Funções privilegiadas ficam fora do schema público; wrappers públicos são `SECURITY INVOKER`.
- Security Advisor do Supabase revisado sem alertas após o hardening.

## Demo
A página abre por padrão o estabelecimento `studio-aurora`.
Também aceita `?b=slug-do-estabelecimento`.

## Arquivos
- `index.html`: fluxo de agendamento
- `admin.html`: login/painel profissional
- `privacidade.html`: política de privacidade
- `termos.html`: termos
- `styles.css`: identidade visual clara/neutra
- `app.js`: fluxo público
- `admin.js`: autenticação e painel

## Publicação
Pode ser hospedado como site estático com HTTPS e domínio próprio. Para produção comercial, configurar um domínio novo e revisar textos jurídicos com profissional habilitado conforme o modelo de negócio e os dados efetivamente tratados.


## V2
A página inicial agora é uma vitrine comercial do MarcaAgenda. O fluxo de agendamento de demonstração está em `demo.html`.


## V3
- Página inicial com exemplos genéricos (barbearia, clínica, estética, etc.).
- Planos alterados para pagamento vitalício.
- `demo.html` virou uma demonstração estática de experiência do cliente com Profissional 1, 2 e 3 e CTA para WhatsApp.

## V4 — Planos vitalícios reais
O Supabase agora possui:
- `plans`: Essencial, Profissional e Premium.
- `business_licenses`: licença por empresa, com pagamento único e `lifetime_access`.
- bloqueio de quantidade de profissionais no próprio banco.
- Essencial: 1 profissional.
- Profissional: até 5.
- Premium: profissionais ilimitados.
- recursos por plano: identidade personalizada, domínio próprio, painel avançado e suporte prioritário.
- painel profissional mostra plano e status da licença.
- licença demo do `studio-aurora` está ativa como Premium vitalício.

Observação: a cobrança ainda precisa de um meio de pagamento externo. Após a confirmação, a licença pode ser ativada no banco; o modelo já está pronto para registrar provedor, ID do pagamento, valor pago e data.

## V5 — pagamento único + Pix
- Valores corrigidos:
  - Essencial: R$ 39,99
  - Profissional: R$ 79,99
  - Premium: R$ 99,99
- Sem mensalidade do MarcaAgenda.
- Criado `pagamento.html` e `pagamento.js`.
- Banco separado logicamente no schema `payments` dentro do mesmo Supabase.
- Cobranças Pix ficam separadas da agenda.
- O QR Code e o Pix Copia e Cola são gerados no navegador.
- Para ativar Pix real, configure `PIX_KEY`, `MERCHANT_NAME` e `MERCHANT_CITY` em `pagamento.js`.
- Confirmação automática exige integração com um provedor de pagamento/webhook.


## V6
Chave Pix aleatória configurada no fluxo de pagamento. O QR Code e o Pix Copia e Cola agora usam a chave configurada em `pagamento.js`.

## V7
- Horários da demonstração separados em Manhã e Tarde.
- Horários disponíveis até 18:00.
- Corrigida a função `create_pix_order` no Supabase.
- Teste técnico confirmou criação de cobrança para o plano Essencial por R$ 39,99.
- Área profissional renomeada para Painel do Negócio, deixando claro que não é login do cliente final.

## V8 — fluxo completo de venda e acesso
- `gestao.html`: painel exclusivo do dono do MarcaAgenda para acompanhar compras e confirmar Pix manualmente.
- `ativar.html`: comprador cria sua conta e ativa o negócio depois do pagamento confirmado.
- `agendar.html`: página pública real de cada negócio usando `?b=slug`.
- Ao ativar uma compra, o banco cria automaticamente:
  - empresa;
  - vínculo do proprietário;
  - licença do plano comprado;
  - Profissional 1;
  - serviço Atendimento;
  - horário inicial de segunda a sexta, 08:00–18:00.
- Painel do negócio mostra o link público para enviar aos clientes.
- Cliente final não precisa ter conta.
- O Pix continua com confirmação manual até existir integração com gateway/webhook.

## V9 — entrega real dos recursos comprados
O painel do negócio agora permite:
- editar informações do negócio;
- copiar e abrir o link público de agendamento;
- cadastrar e ativar/desativar serviços;
- cadastrar e ativar/desativar profissionais;
- limite de profissionais aplicado no banco por plano;
- configurar horários por profissional;
- personalização visual apenas para Profissional/Premium;
- painel avançado apenas quando o plano inclui esse recurso;
- Premium usa link personalizado do negócio; domínio próprio foi removido da oferta até existir infraestrutura multi-domínio apropriada.
- ativação de compra exige o mesmo e-mail usado no pedido.

## V10 — QR Code Pix local
- QR Codes Pix dos três planos foram gerados e incluídos no próprio projeto.
- Não depende mais de biblioteca externa/CDN para desenhar o QR.
- Essencial: R$ 39,99.
- Profissional: R$ 79,99.
- Premium: R$ 99,99.
- O pedido continua sendo criado no Supabase antes de exibir o Pix.
- QR Code e Pix Copia e Cola usam a chave Pix configurada.

## V11 — QR incorporado + acesso admin corrigido
- QR Codes Pix agora estão embutidos no próprio `pagamento.js` como Data URI.
- Não dependem de CDN, arquivo PNG separado ou caminho relativo do GitHub Pages.
- A conta principal de administrador criada foi confirmada no Supabase para permitir login.
- Fluxo de gestão continua exigindo autenticação e o código de bootstrap na primeira ativação.

## V12 — fluxo de pagamento e diagnóstico do QR
- O QR é exibido após o banco devolver um pedido com referência, plano e valor corretos.
- Se a imagem incorporada não carregar, a página usa o PNG local do mesmo plano.
- Erros no cadastro do pedido aparecem na página com a mensagem retornada pelo banco; não se mostra um Pix sem pedido associado.
- A chamada ao banco tem limite de 15 segundos e o botão é reativado para tentar novamente.
- A versão do script na página mudou para evitar que o navegador continue usando o JavaScript antigo em cache.
- Para publicar, substitua todos os arquivos na raiz do site, inclusive `pagamento.html`, `pagamento.js` e os três `pix-*.png`.
- A confirmação do Pix continua manual no painel de gestão; o QR sozinho não confirma o pagamento.
