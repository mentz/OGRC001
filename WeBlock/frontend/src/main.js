import '@babel/polyfill';
import 'mutationobserver-shim';
import './plugins/bootstrap-vue';
import '../node_modules/flatpickr/dist/flatpickr.css';

import {library} from '@fortawesome/fontawesome-svg-core'
import {faClock, faEthernet, faNetworkWired, faUserSecret} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import FlashMessage from '@smartweb/vue-flash-message';
import $ from 'jquery';
import Vue from 'vue';
import flatPickr from 'vue-flatpickr-component';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(FlashMessage, $);

library.add(faUserSecret, faEthernet, faNetworkWired, faClock);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('flat-pickr', flatPickr);

Vue.config.productionTip = false;

new Vue({router, store, render: h => h(App)}).$mount('#app');
