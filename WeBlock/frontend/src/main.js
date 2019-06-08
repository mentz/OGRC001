import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faEthernet, faNetworkWired, faClock} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import FlashMessage from '@smartweb/vue-flash-message';
import $ from 'jquery';
import flatPickr from 'vue-flatpickr-component';
import '../node_modules/flatpickr/dist/flatpickr.css';


Vue.use(FlashMessage, $);

library.add(faUserSecret, faEthernet, faNetworkWired, faClock);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('flat-pickr', flatPickr);



Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
