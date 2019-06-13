var salas = require('../../config/salas');

function getSalas() {
  return salas;
}

function getSwitchesDaSala(sala) {
  return salas[sala].switches;
}

module.exports = {
  getSalas,
  getSwitchesDaSala
}