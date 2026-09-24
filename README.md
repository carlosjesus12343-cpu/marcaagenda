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
