const restify = require('restify');
const rjwt = require('restify-jwt-community');
const corsMiddleware = require('restify-cors-middleware');
// const mongoose = require('mongoose');
const config = require('./config');

const server = restify.createServer();

// ----- Middleware -----
// Habilitar CORS
const cors = corsMiddleware({origins: ['*'], allowHeaders: ['Authorization']});
server.pre(cors.preflight);
server.pre(cors.actual);

// bodyParser
server.use(restify.plugins.bodyParser());

// Proteção de rotas
server.use(rjwt({secret: config.JWT_SECRET}).unless({
  path: ['/login', '/sala', '/sala/*']
}));

server.listen(config.PORT);
require('./src/routes/all')(server);
console.log(`Server started on port ${config.PORT}`);
