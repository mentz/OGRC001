const switches = require('../config/switches');
const snmp = require('./snmp');
const scheduler = require('node-schedule');

let agendamentos = [];

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

function setAgendamentoAbrir(sw_name, sw_ports, datahora) {
  scheduler.scheduleJob(datahora, executarAgendamentoAbrir({sw_name, sw_ports}));
  agendamentos.push({action: "Abrir", sw_name, sw_ports, datahora});
}

async function executarAgendamentoAbrir(job) {
  for (let sw of switches) {
    if (sw.name == job.sw_name) {
      for (let i = 0; i < sw.port_quantity; i++) {
        if (!sw.dont_block.includes(String(i+1)) && sw_ports.includes(String(i+1))) {
          try {
            await snmp.setPortStatus(sw, i, 1);
          } catch(ex) {
            console.error(ex);
          }
        }
      }
    }
  }
}

function setAgendamentoFechar(sw_name, sw_ports, datahora) {
  scheduler.scheduleJob(datahora, executarAgendamentoFechar({sw_name, sw_ports}));
  agendamentos.push({action: "Fechar", sw_name, sw_ports, datahora});
}

async function executarAgendamentoFechar(job) {
  for (let sw of switches) {
    if (sw.name == job.sw_name) {
      for (let i = 0; i < sw.port_quantity; i++) {
        if (!sw.dont_block.includes(String(i+1)) && sw_ports.includes(String(i+1))) {
          try {
            await snmp.setPortStatus(sw, i, 2);
          } catch(ex) {
            console.error(ex);
          }
        }
      }
    }
  }
}

function getAgendamentos(sala) {
  let sala = null;
  for (let s of salas) {
    if (s.sala == sala) {
      ss = s;
    }
  }
  if (ss == null) return [];
  
  let lista = [];
  for (let sw of ss.switches) {
    for (let job of agendamentos) {
      if (sw.name == job.sw_name) {
        if (new Date(datahora) > new Date()) {
          lista.push({
            sw_name: job.sw_name,
            action: job.action,
            sw_ports: job.sw_ports,
            datetime: job.datahora
          });
        }
      }
    }
  }

  return lista;
}

module.exports = {getAgendamentos, getSwitch, getPortasDoSwitch, setPortaDoSwitch, setAgendamentoAbrir, setAgendamentoFechar}