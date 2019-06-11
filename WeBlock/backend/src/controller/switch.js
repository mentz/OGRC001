var config_switch = require('../../config/switches');

function getSwitches() {
  console.log(config_switch.switches);
}

module.exports = {getSwitches}