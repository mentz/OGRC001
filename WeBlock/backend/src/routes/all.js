const error = require('restify-errors');
const snmp = require('../controller/snmp');
const cSwitch = require('../controller/switches');

module.exports = (server) => {
  // POST /contato/enviar_email
  // Forma do usuário cliente enviar mensagens ao administrador/operador.
  server.get('/switch', (req, res, next) => {
    let solicitante = req.user;
    let {sala} = req.body;

    res.send(cSwitch.getSwitches());

    // cUsuario.enviarEmail(
    //     solicitante, assunto, prioridade, mensagem, (err, sucesso) => {
    //       if (err) {
    //         res.send(err);
    //       } else {
    //         if (!sucesso) {
    //           res.status(400);
    //           res.send('Todos os campos são necessários');
    //         } else {
    //           res.status(200);
    //           res.send('Contato enviado com sucesso!');
    //         }
    //       }
    //     });

    next();
  });
};
