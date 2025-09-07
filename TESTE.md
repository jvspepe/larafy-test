Objetivo:
Desenvolver uma aplicação web com autenticação de usuários e um painel principal contendo uma tabela dinâmica que consome dados de um banco externo.

Escopo Funcional

1. Login e Autenticação:

- Tela de login com usuário e senha.
- Persistência de sessão após autenticação bem-sucedida.
- (Bônus) Possibilidade de cadastro de novos usuários.

2. Tela Principal:

- Exibir uma tabela populada a partir de dados vindos de um banco externo (ex: MySQL, PostgreSQL ou SQLite).
- Permitir edição inline das células da tabela.
- Disponibilizar a opção de exportar/baixar os dados em formato .csv ou .xlsx.

3. Banco de Dados Externo:

- Criar uma tabela simples (ex: lista de produtos, clientes ou funcionários).
- Expor dados por meio de API própria ou acesso direto ao banco.

Requisitos Técnicos Mínimos

- Framework backend sugerido: Flask, Django, Node.js ou Spring Boot.
- Framework frontend sugerido: React, Angular ou Vue.js.
- Uso de ORM ou queries diretas para manipulação dos dados.
- Persistência no banco para alterações feitas na tabela.
- Controle de autenticação (cookies, JWT ou sessões).

Diferenciais (não obrigatórios, mas pontuam):

- Paginação e busca na tabela.
- Validação de campos editados.
- Upload de arquivos para atualizar os dados.
- Dockerfile para facilitar a execução.
- Deploy em algum serviço gratuito (Heroku, Render, Vercel, Railway, etc.).

Critérios de Avaliação

1. Organização do código – clareza, legibilidade e boas práticas.
2. Estrutura do projeto – separação de camadas (backend, frontend, banco).
3. Funcionalidade – se os requisitos principais foram atendidos.
4. Documentação – instruções claras para rodar o projeto.
5. Qualidade da interface – usabilidade e experiência do usuário.
