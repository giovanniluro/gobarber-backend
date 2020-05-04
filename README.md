## Back-End da aplicação GoBarber!

Para rodar o projeto, basta clonar o repositório e executar yarn install para instalar as dependências. Para inciar o servidor, basta executar yarn dev:server, e o servidor deverá abrir na porta 3333! Para mudar a porta, basta ir até o arquivo src/server.ts e mudar o número na função app.listen(port).

## Rotas
### /appointments
__get__ - lista todos os horários marcados
__post__ - cria um novo horário
