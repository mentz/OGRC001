import store from "../store";

import { Client } from "./rest-client";

const login = (username, password, sala, callback) => {
  let body = { login: username, senha: password, sala: sala };

  Client.post("/login", body)
    .then(value => {
      // eslint-disable-next-line
        // console.log(value);
      value;
      callback(null, true);
    })
    .catch(err => {
      // eslint-disable-next-line
        // console.error(err);
      if (err.response.status === 401) {
        callback(null, false);
      } else {
        callback(err);
      }
    });
};

const getLogado = () => {
  // TODO: Implementar verificar se há JWT e se é válido.
  if (store.getters.token) return true;
};

const getUsuario = () => {
  if (store.getters.token) {
    return store.getters.usuario;
  }
};

export { login, getLogado, getUsuario };
