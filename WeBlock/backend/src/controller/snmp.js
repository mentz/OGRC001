var snmp = require('net-snmp');

var session = null;

/**
 * Retorna 0 para sucesso ou outro para fracasso.
 * @param {String no formato ipv4} ip
 * @param {String de comunidade com permissão de leitura e escrita} community
 */
function createSession(ip, community) {
  if (!session) {
    try {
      session = snmp.createSession(ip, community);
      return 0;
    } catch (err) {
      return err;
    }
  } else {
    return ('Já existe uma sessão');
  }
}

/**
 * Fecha a sessão
 */
function closeSession() {
  session.close();
}

/**
 * getPortStatus retorna ifAdminStatus e ifOperStatus
 * @param {Sessão snmp aberta} session
 * @param {Inteiro, porta física do Switch} port
 * @param {Retorno: (erro, resultado)} callback
 */
function getPortStatus(port, callback) {
  let oids = [`1.3.6.1.2.1.2.2.1.7.${port}`, `1.3.6.1.2.1.2.2.1.8.${port}`];
  session.get(oids, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
    session.close();
  });
}

/**
 *
 * @param {Inteiro, porta física do Switch} port
 * @param {Inteiro, 1 é up e 2 é down} status
 * @param {Retorno: (erro, resultado)} callback
 */
function setPortStatus(port, status, callback) {
  let varbind = [{
    oid: `1.3.6.1.2.1.2.2.1.7.${port}`,
    type: snmp.ObjectType.Integer32,
    value: status
  }];
  session.set(varbind, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
}

// session.trap(snmp.TrapType.LinkDown, function(error) {
//   if (error) console.error(error);
// });

module.exports = {
  createSession,
  closeSession,
  getPortStatus,
  setPortStatus
}