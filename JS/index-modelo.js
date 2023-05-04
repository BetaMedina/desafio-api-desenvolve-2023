const { Console } = require('console');
const http = require('http');
const { constants } = require('http2')
let tasks = [
  { id: 1, description: 'Barraca', status: true },
  { id: 2, description: 'Pederneira', status: false },
];


const ENDPOINT = '/tasks'

const server = http.createServer((request, response) => {
  const { method, url } = request;

  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (method === constants.HTTP2_METHOD_OPTIONS && url.startsWith(ENDPOINT)) {
    response.writeHead(200);
    response.end();
    return

  }

  if (method === constants.HTTP2_METHOD_GET && url.startsWith(ENDPOINT)) {
    //lista o todo List
    response.statusCode = 200;
    response.end(JSON.stringify(tasks));
    return
  }


  if (method === constants.HTTP2_METHOD_POST && url.startsWith(ENDPOINT)) {

    let body = '';
    request.on('data', (chunk) => {
      body += chunk.toString()
    });

    request.on('end', () => {
      const { description, status } = JSON.parse(body);

      const id = !tasks.lenght ? tasks[tasks.length - 1].id + 1 : 1

      //cria um item do todo list
      tasks.push({ id, description, status })

      response.statusCode = 201
      response.end(JSON.stringify(tasks));
    });
    return
  }


  if (method === constants.HTTP2_METHOD_PUT && url.startsWith(ENDPOINT)) {
    // console.log(url)
    const id = url.split('/')[2]
    let body = '';

    request.on('data', (chunk) => {
      body += chunk.toString()
    });

    request.on('end', () => {
      const { description, status } = JSON.parse(body);

      const updatedTasks = tasks.map((task) => {
        if (task.id === parseInt(id)) {
          return {
            id: task.id,
            description: !!description ? description : task.description,
            status: status === undefined ? task.status : status,
          }
        }
        return task
      })

      tasks = updatedTasks
      console.log(tasks);
      const testado = tasks.find(task => task.id === parseInt(id))
      console.log('testado: ', testado);
      response.statusCode = 200
      response.end(JSON.stringify(testado));
    });
    return
  }


  if (method === constants.HTTP2_METHOD_DELETE && url.startsWith(ENDPOINT)) {

    const id = url.split('/')[2]

    const updatedTasks = tasks.filter((task) => {
      if (task.id !== parseInt(id)) {
        return task
      }
    })

    tasks = updatedTasks

    response.statusCode = 200
    response.end(JSON.stringify(tasks));
    return
  }

});


server.listen(3000, () => {
  console.log('Server listening on port 3000');
});