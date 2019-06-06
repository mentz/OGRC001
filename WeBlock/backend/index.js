const snmp = require('./src/controller/snmp');

console.log('Estou vivo!');

snmp.createSession('10.90.90.90', 'private');
// snmp.setPortStatus(16, 2, (err, result) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log(result);

snmp.getPortStatus(16, (err, result) => {
  if (err) {
    console.error(err);
  } else {
    console.log(result);
    snmp.closeSession();

    snmp.setPortStatus(16, 1, (err, result) => {
      if (err) {
        console.error(err);
      } else {
        console.log(result);

        snmp.getPortStatus(16, (err, result) => {
          if (err) {
            console.error(err);
          } else {
            console.log(result);
          }
        });
      }
    });
  }
});
//   }
// });