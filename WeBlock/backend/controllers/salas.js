var salas = require('../config/salas');
var switches = require('../config/switches');

function getSalas() {
  return salas;
}

function getSwitchesDaSala(sala) {
  let sws = [];
  for (let s of salas) {
    if (s.sala == sala) {
      for (let sw of switches) {
        // console.log(sw);
        if (s.switches.includes(sw.name)) {
          sws.push({
            name: sw.name,
            dont_block: sw.dont_block,
            port_quantity: sw.port_quantity
          });
        }
      }
      return sws;
    }
  }
  return `Sala ${sala} not found`;
}

module.exports = {
  getSalas,
  getSwitchesDaSala
}