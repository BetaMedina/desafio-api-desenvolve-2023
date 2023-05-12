# Projeto To Do List

### Sobre o Projeto
Você foi contratado para desenvolver uma API de TodoList em Node.js, utilizando somente as ferramentas nativas da linguagem. 
Para implementar a API, você deve utilizar apenas as ferramentas nativas do Node.js, sem o uso de bibliotecas de terceiros. Além disso, é importante que a API seja bem documentada e que utilize boas práticas de desenvolvimento, como tratamento de erros e validação de entradas.

### O que foi concluído:

- [x] `/tasks` *(GET)*: este endpoint deve retornar todas as tarefas cadastradas na lista, com as informações de id, descrição e status.

- [x] `/tasks` *(POST)*: este endpoint deve permitir a criação de uma nova tarefa na lista, recebendo como parâmetros o campo description (descrição da tarefa) e o campo status (status da tarefa, que pode ser "pendente" ou "concluída").

- [x] `/tasks/:id` *(PUT)*: este endpoint deve permitir a atualização de uma tarefa existente na lista, identificada pelo parâmetro id, recebendo como parâmetros os campos description e status.

### O que ainda vou implementar:
- [ ] Endpoint DELETE no backend
- [ ] Refatorar melhorando a arquitetura do backend
- [ ] Verificar o por que do erro quando separo as responsabilidades no frontend
