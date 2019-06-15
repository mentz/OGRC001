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

  // GET /switch/:sw_name
  // Obtém estado das portas do switch sw_name
  server.get('/switch/:sw_name', async (req, res, next) => {
    let {sw_name} = req.params;

    let result = await cSwitch.getPortasDoSwitch(sw_name);
    if (result.length == 0) {
      res.status(400);
      res.send("No switch with that name");
    } else {
      res.status(200);
      res.send(result);
    }

    next();
  });

  // GET /agenda
  // Obtém agendamentos futuros
  server.get('/agenda/:sw_name', async (req, res, next) => {
    let {sw_name} = req.params;
    let result = await cSwitch.getAgendamentos(sw_name);

    res.status(200);
    res.send(result);

    next();
  });

  // POST /switch/:sw_name
  // Obtém estado das portas do switch sw_name
  server.post('/switch/:sw_name', async (req, res, next) => {
    let {sw_name} = req.params;
    let {sw_ports, closeTime, openTime} = req.body;
    let result;

    if (closeTime == "now" || openTime == "now") {
      // Fechar a porta imediatamente, sem agendar reabertura
      if (sw_ports.length == 1) {
        let sw_port = Number(sw_ports[0]);
        if (closeTime == "now") {
          result = await cSwitch.setPortaDoSwitch(sw_name, sw_port, 2);
        } else {
          result = await cSwitch.setPortaDoSwitch(sw_name, sw_port, 1);
        }

        if (result == null) {
          res.status(500);
          res.send("Algo de errado aconteceu");
        } else {
          res.status(200);
          res.send("Solicitação executada com sucesso");
        }
      } else {
        res.status(400);
        res.send("Não é possível acionar imediatamente mais de uma porta");
      }
    } else {
      // Agendar fechamento
      let res_fechamento = await cSwitch.setAgendamentoFechar(sw_name, sw_ports, closeTime);
      if (res_fechamento == null) {
        res.status(400);
        res.send("Fechamento precede horário atual");
      }

      // Agendar abertura
      let res_abertura = await cSwitch.setAgendamentoAbrir(sw_name, sw_ports, openTime);
      if (res_abertura == null) {
        res.status(400);
        res.send("Abertura precede horário atual");
      }
    }

    next();
  });
};
