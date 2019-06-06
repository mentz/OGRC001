import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Agendamento from "./views/Agendamento.vue";
import Perfil from "./views/Perfil.vue";
import PortConfig from "./views/PortConfig.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/home",
      name: "home",
      component: Home
    },
    /*{
      path: "/agendamentos",
      name: "agendamentos",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(// webpackChunkName: "agendamentos"  "./views/About.vue")
    },
    */
    {
      path: "/agendamento",
      name: "agendamento",
      component: Agendamento
    },

    {
      path: "/login",
      name: "login",
      component: Login
    },
    
    {
      path: "/perfil",
      name: "perfil",
      component: Perfil
    },

    {
      path: "/port-config",
      name: "port-config",
      component: PortConfig
    }
  ]
});
