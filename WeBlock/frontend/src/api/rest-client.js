import axios from 'axios';
import * as Config from '../config';
import store from '../store';

const Client = axios.create({baseURL: Config.BACKEND_URL});

// Se existe JWT no store, mandar junto com qualquer solicitação
Client.interceptors.request.use((request) => {
  if (store.getters.token) {
    request.headers['Authorization'] = `Bearer ${store.getters.token}`;
  }
  return request;
});

Client.interceptors.response.use(
    (response) => {
      // Guardar token se for recebido
      if (response.data.token) {
        // eslint-disable-next-line
        // console.log(`Veio token: ${response.data.token.token}`);
        store.commit('setToken', response.data.token.token);
      }
      return response;
    },
    (error) => {
      // A linha abaixo é mega importante
      return Promise.reject(error);
    });

export {Client};