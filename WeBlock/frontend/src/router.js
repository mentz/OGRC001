import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("./views/Home.vue")
    },

    {
      path: "/home",
      name: "home",
      component: () => import("./views/Home.vue")
    },

    {
       path: "/agendamento",
       name: "agendamento",
       component: () => import("./views/Agendamento.vue")
    },

    {
      path: "/login",
      name: "login",
      component: () => import("./views/Login.vue")
    },

    // {
    //   path: "/perfil",
    //   name: "perfil",
    //   component: () =>
    //       import(/* webpackChunkName: "perfil" */ "./views/Perfil.vue")
    // },

    {
      path: "/port-config",
      name: "port-config",
      component: () => import("./views/PortConfig.vue")
    }
  ]
});
