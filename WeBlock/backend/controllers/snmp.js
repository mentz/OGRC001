var snmp = require('net-snmp');

/**
 * getPortStatus retorna ifAdminStatus e ifOperStatus de uma porta do switch
 * @param {JSON, descritivo do Switch} sw
 * @param {Inteiro, porta física do Switch} port
 */
function getPortStatus(sw, port) {
  let options = {port: Number(sw.port) | 161};
  console.log(options);
  let session = snmp.createSession(sw.ip, sw.community);
  let oids = [
    `1.3.6.1.2.1.2.2.1.7.${port + Number(sw.initial_port)}`,
    `1.3.6.1.2.1.2.2.1.8.${port + Number(sw.initial_port)}`
  ];
  return new Promise(function(resolve, reject) {
    session.get(oids, (err, res) => {
      if (err) {
        session.close();
        reject(err);
      } else {
        session.close();
        resolve(res);
      }
    }, options);
  });
}

/**
 * setPortStatus define valor de ifAdminStatus de uma porta do switch
 * @param {JSON, descritivo do Switch} sw
 * @param {Inteiro, porta física do Switch} port
 * @param {Inteiro, 1 é up e 2 é down} status
 */
function setPortStatus(sw, port, status) {
  let options = {port: sw.port | 161};
  let session = snmp.createSession(sw.ip, sw.community);
  let varbind = [{
    oid: `1.3.6.1.2.1.2.2.1.7.${port + Number(sw.initial_port)}`,
    type: snmp.ObjectType.Integer32,
    value: status
  }];
  return new Promise(function(resolve, reject) {
    session.set(varbind, (err, result) => {
      if (err) {
        session.close();
        reject(err);
      } else {
        session.close();
        resolve(result);
      }
    }, options);
  });
}

module.exports = {
  getPortStatus,
  setPortStatus
}