import jwtdecode from 'jwt-decode';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {token: null},
  mutations: {
    setToken: (state, token) => {
      state.token = token;
    },
    clearToken: (state) => {
      state.token = null;
    }
  },
  actions: {},
  getters: {
    usuario: (state) => {
      if (state.token)
        return jwtdecode(state.token).usuario;
      else
        return null;
    },
    token: (state) => {
      return state.token;
    }
  },
});
