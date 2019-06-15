var config = require('../config');
var users = require('../config/users');

async function login(username, password, sala) {
  let ret_token = null;
  for (let u in users) {
    if (u.username == username) {
      if (u.password == password) {
        let data = {usuario: username, sala: sala};
        await jwt.sign(
            data, config.JWT_SECRET, {expiresIn: '365d'}, (err, token) => {
              let {iat, exp} = jwt.decode(token);
              ret_token = {iat, exp, token};
            });
      }
    }
  }

  return ret_token;
}

module.exports = {login}