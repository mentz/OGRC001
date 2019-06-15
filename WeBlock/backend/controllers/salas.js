var salas = require('../config/salas');

function getSalas() {
  return salas;
}

function getSwitchesDaSala(sala) {
  for (let s of salas) {
    if (s.sala == sala) {
      return s.switches;
    }
  }
  return `Sala ${sala} not found`;
}

module.exports = {
  getSalas,
  getSwitchesDaSala
}