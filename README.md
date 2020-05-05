## Back-End da aplicação GoBarber!

### Como rodar?
Para rodar o projeto, basta clonar o repositório e executar yarn install para instalar as dependências. Para inciar o servidor, basta executar yarn dev:server, e o servidor deverá abrir na porta 3333!
### Mudando a porta
Para mudar a porta, basta ir até o arquivo src/server.ts e mudar o número na função app.listen(port).

## Rotas
### /appointments
__get__ - lista todos os horários marcados

__post__ - cria um novo horário

### /users
__get__ - lista todos os usuários

__post__ - cria um novo usuário

### /auth
__post__ - autentica um usuário criando um token jwt
