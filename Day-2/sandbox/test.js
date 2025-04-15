var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('Hello World!');
}).listen(8080);
// Le code indique à l'ordinateur d'écrire « Hello World ! » si quelqu'un (par exemple un navigateur Web) tente d'accéder à votre ordinateur sur le port 8080.