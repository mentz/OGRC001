const error = require('restify-errors');
const cSwitch = require('../controllers/switch');
const cUsers = require('../controllers/users');
const cSalas = require('../controllers/salas');

module.exports = (server) => {
  // POST /login
  server.post('/login', (req, res, next) => {
    let {username, password, sala} = req.body;

    let token = cUsers.login(username, password);
    if (token == null) {
      res.status(403);
      res.send('Credenciais incorretas');
    } else {
      res.status(200);
      res.send(token);
    }

    next();
  });

  // GET /sala
  // Obtem lista de salas
  server.get('/sala', (req, res, next) => {
    res.status(200);
    res.send(cSalas.getSalas());

    next();
  });

  // GET /sala/:sid
  // Obtem lista das portas para aquela sala
  server.get('/sala/:sid', (req, res, next) => {
    let sala = req.params.sid;

    res.status(200);
    res.send(cSalas.getSwitchesDaSala(sala));

    next();
  });
};
