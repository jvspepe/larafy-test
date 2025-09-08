Repositório feito para a realização de teste para desenvoledor full stack.

# Principais tecnologias utilizadas:

- Front-end

  - TypeScript
  - React.js
  - TailwindCSS
  - ShadcnUI
  - React Router
  - Tanstack React Query
  - Zod
  - React Hook Form
  - Papaparse
  - Axios
  - Vite.js

- Backend

  - TypeScript
  - Node.js
  - Express.js
  - Drizzle ORM
  - Better-Auth
  - Resend
  - Zod

- Banco de Dados
  - PostgreSQL

Objetivo:
Desenvolver uma aplicação web com autenticação de usuários e um painel principal contendo uma tabela dinâmica que consome dados de um banco externo.

Escopo Funcional

1. Login e Autenticação:

- [FEITO] Tela de login com usuário e senha.
- [FEITO] Persistência de sessão após autenticação bem-sucedida.
- [FEITO] Possibilidade de cadastro de novos usuários.

2. Tela Principal:

- [FEITO] Exibir uma tabela populada a partir de dados vindos de um banco externo (ex: MySQL, PostgreSQL ou SQLite).
- [FEITO] Permitir edição inline das células da tabela.
- [FEITO] Disponibilizar a opção de exportar/baixar os dados em formato .csv ou .xlsx.

3. Banco de Dados Externo:

- [FEITO] Criar uma tabela simples (ex: lista de produtos, clientes ou funcionários).
- [FEITO] Expor dados por meio de API própria ou acesso direto ao banco.

Requisitos Técnicos Mínimos

- [FEITO / Node.js] Framework backend sugerido: Flask, Django, Node.js ou Spring Boot.
- [FEITO / React.js] Framework frontend sugerido: React, Angular ou Vue.js.
- [FEITO / Drizzle ORM] Uso de ORM ou queries diretas para manipulação dos dados.
- [FEITO] Persistência no banco para alterações feitas na tabela.
- [FEITO] Controle de autenticação (cookies, JWT ou sessões).

Diferenciais (não obrigatórios, mas pontuam):

- [FEITO] Paginação e busca na tabela.
- Validação de campos editados.
- [FEITO] Upload de arquivos para atualizar os dados(Sobrepor com outro arquivo .csv?).
- Dockerfile para facilitar a execução.
- Deploy em algum serviço gratuito (Heroku, Render, Vercel, Railway, etc.).

Critérios de Avaliação

1. Organização do código – clareza, legibilidade e boas práticas.
2. Estrutura do projeto – separação de camadas (backend, frontend, banco).
3. Funcionalidade – se os requisitos principais foram atendidos.
4. Documentação – instruções claras para rodar o projeto.
5. Qualidade da interface – usabilidade e experiência do usuário.

Como executar o projeto:

## Frontend

1. Configurar rota da API direcionada à URL do backend em uma variável ambiente `VITE_API_URL=`

2. Inicializar o projeto

```bash
cd frontend
pnpm i
pnpm build
pnpm preview
```

## Backend

1. Configurar variáveis ambiente, exemplo:

```
PORT=3000
DATABASE_URL=postgres://postgres:admin@localhost:5432
BETTER_AUTH_SECRET=chave-secreta
BETTER_AUTH_URL=http://localhost:3000
RESEND_API_KEY=chave-api
```

2. Inicializar o projeto

```
pnpm i
pnpm db:migrate
pnpm build
pnpm start
```
