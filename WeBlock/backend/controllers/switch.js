const switches = require('../config/switches');
const snmp = require('./snmp');

function getSwitch(sw_name) {
  for (let s of switches) {
    if (s.name == sw_name) {
      return s;
    }
  }
  return `There's no switch named ${sw_name}`;
}

async function getPortasDoSwitch(sw_name) {
  let sw = null;
  for (let s of switches) {
    if (s.name == sw_name) {
      sw = s;
    }
  }

  if (sw == null) return [];

  let portas = [];
  for (let i = 0; i < sw.port_quantity; i++) {
    let sw_portstatus = await snmp.getPortStatus(sw, i);
    // console.log(sw_portstatus);
    portas.push({
      portNumber: i + 1,
      adminStatus: sw_portstatus[0].value,
      operStatus: sw_portstatus[1].value
    });
  }

  return portas;
}

async function getPortasDoSwitch(sw_name) {
  let sw = null;
  for (let s of switches) {
    if (s.name == sw_name) {
      sw = s;
    }
  }

  if (sw == null) return [];

  let portas = [];
  for (let i = 0; i < sw.port_quantity; i++) {
    let sw_portstatus = await snmp.getPortStatus(sw, i);
    
    portas.push({
      portNumber: i + 1,
      adminStatus: sw_portstatus[0].value,
      operStatus: sw_portstatus[1].value
    });
  }

  return portas;
}

async function setPortaDoSwitch(sw_name, sw_port, status) {
  let sw = null;
  for (let s of switches) {
    if (s.name == sw_name) {
      sw = s;
    }
  }
  if (sw == null) return null;

  let sw_portstatus = await snmp.setPortStatus(sw, sw_port, status);
  return sw_portstatus;
}

module.exports = {getSwitch, getPortasDoSwitch, setPortaDoSwitch}