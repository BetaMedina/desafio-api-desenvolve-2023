const { Console } = require('console');
const http = require('http');
const { constants } = require('http2')
const tasks = [
  { id: 1, description: 'Barraca', status: true },
  { id: 2, description: 'Pederneira', status: false },
];


const ENDPOINT = '/tasks'

const server = http.createServer((require, response) => {
  const { method, url } = require;

  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (method === constants.HTTP2_METHOD_OPTIONS && url === ENDPOINT) {
    // console.log("aksdas");
    response.writeHead(200);
    response.end();
    return

  }





  if (method === constants.HTTP2_METHOD_GET && url === ENDPOINT) {
    //lista o todo List
    response.statusCode = 200;
    response.end(JSON.stringify(tasks));
  }


  if (method === constants.HTTP2_METHOD_POST && url === ENDPOINT) {

    let body = '';
    require.on('data', (chunk) => {
      body += chunk.toString()
    });

    require.on('end', () => {
      const { description, status } = JSON.parse(body);

      const id = tasks[tasks.length - 1].id + 1
      //cria um item do todo list
      tasks.push({ id, description, status })
      console.log(tasks)

      response.statusCode = 201
      response.end(JSON.stringify(tasks));
    });
    return
  }




  // if (request.method === "POST")
  if (method === constants.HTTP2_METHOD_PUT && require.url.startsWith(ENDPOINT)) {

    const url = require.url.split(ENDPOINT, 1)

    return response.end('ALTERA ESSE INFERNO' + url);
  }




  //   if (method === constants.HTTP2_METHOD_PUT && /^\/tasks\/\d+$/.test(url)) {
  //     const id = parseInt(url.split('/').pop());
  //     let body = '';
  //     require.on('data', chunk => {
  //       body += chunk.toString();
  //     });
  //     require.on('end', () => {
  //       const { description, status } = JSON.parse(body);
  //       //deve atualizar um item do todo list
  //       response.end(JSON.stringify(tasks));
  //     });
  //   }
  //   response.statusCode = 404;
  //   response.end();
  //   return;
});


server.listen(3000, () => {
  console.log('Server listening on port 3000');
});