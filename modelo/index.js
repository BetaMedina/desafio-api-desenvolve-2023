const http = require('http');
const { constants } = require('http2')
const tasks = [
  { id: 1, description: 'Comprar leite', status: 'pendente' },
  { id: 2, description: 'Pagar conta de luz', status: 'concluída' },
];
const ENDPOINT = '/tasks'
const server = http.createServer((req, res) => {
  const { method, url } = req;
  res.setHeader('Content-Type', 'application/json');
  if (method === constants.HTTP2_METHOD_GET && url === ENDPOINT) {
    //deve listar o todo List
    res.statusCode = 200;
    res.end(JSON.stringify(tasks));
  }
  if (method === constants.HTTP2_METHOD_POST && url === ENDPOINT) {
    let body = '';
    req.on('end', () => {
      const { description, status } = JSON.parse(body);
      //deve criar um item do todo list
      res.end(JSON.stringify(tasks));
    });
  }
  if (method === constants.HTTP2_METHOD_PUT && /^\/tasks\/\d+$/.test(url)) {
    const id = parseInt(url.split('/').pop());
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const { description, status } = JSON.parse(body);
      //deve atualizar um item do todo list
      res.end(JSON.stringify(tasks));
    });
  }
  res.statusCode = 404;
  res.end();
  return;
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});