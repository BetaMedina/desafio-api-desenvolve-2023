const http = require('http');
const { constants } = require('http2');
const { randomUUID } = require("crypto")

const tasks = [
  { id: 1, description: 'Comprar leite', status: 'pendente' },
  { id: 2, description: 'Pagar conta de luz', status: 'concluída' },
];

const ENDPOINT = '/tasks'

const server = http.createServer((req, res) => {

  const { method, url } = req;

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  // res.setHeader('Access-Control-Allow-Headers', 'Content-Type');


  if (method === constants.HTTP2_METHOD_GET && url === ENDPOINT) {
    res.statusCode = 200;
    res.end(JSON.stringify(tasks));
    return
  }

  if (method === constants.HTTP2_METHOD_POST && url === ENDPOINT) {
    req.on("data", (body) => {
      const { description, status } = JSON.parse(body);

      const task = {
        id: randomUUID(),
        description,
        status
      }

      tasks.push(task)
    })

      .on('end', () => {
        res.end(JSON.stringify(tasks));
        return
      });
  }

  if (url.startsWith("/tasks")) {
    const splitURL = url.split("/")

    const idTask = splitURL[2]

    const taskIndex = tasks.findIndex((task) => task.id == idTask)

    if (method === constants.HTTP2_METHOD_PUT) {

      req.on("data", (body) => {
        const { description, status } = JSON.parse(body);

        tasks[taskIndex] = {
          id: idTask,
          description,
          status
        }
      })
        .on("end", () => {
          res.end(JSON.stringify(tasks))
        })
    }

    if (method === constants.HTTP2_METHOD_DELETE) {
      req.on("data", () => {
        tasks.splice(taskIndex, 1)
      })

      .on("end", () => {
        res.end(JSON.stringify(tasks))
      })
    }    
  }
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});