const switches = require('../../config/switches');
const snmp = require('./snmp');

function getSwitch(switch_name) {
  for (let s in switches) {
    let session = snmp.createSession(s.ip, s.community);
    let portas = [];
    for (let i = 1; i <= s.port_quantity; i++) {
      let ps = snmp.getPortStatus(session, i);
      portas.push({
        number: i,
        admin_status: ps.admin_status,
        oper_status: ps.oper_status
      });
    }
  }
}

module.exports = {getSwitch}