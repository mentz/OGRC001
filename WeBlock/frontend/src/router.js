import Vue from 'vue';
import Router from 'vue-router';

import Agendamento from './views/Agendamento.vue';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Perfil from './views/Perfil.vue';
import PortConfig from './views/PortConfig.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ './views/Home.vue')
    },

    // {
    //   path: '/agendamento',
    //   name: 'agendamento',
    //   component: () => import(
    //       /* webpackChunkName: "agendamentos" */ './views/Agendamento.vue')
    // },

    {
      path: '/login',
      name: 'login',
      component: () =>
          import(/* webpackChunkName: "login" */ './views/Login.vue')
    },

    // {
    //   path: '/perfil',
    //   name: 'perfil',
    //   component: () =>
    //       import(/* webpackChunkName: "perfil" */ './views/Perfil.vue')
    // },

    {
      path: '/port-config',
      name: 'port-config',
      component: () =>
          import(/* webpackChunkName: "portconfig" */ './views/PortConfig.vue')
    }
  ]
});
