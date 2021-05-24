import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store';
import axios from 'axios';
import api from './request/index.js';

Vue.use(ElementUI)
Vue.config.productionTip = false;
Vue.prototype.$ajax = axios;
Vue.prototype.$api = api;
// Vue.prototype.store = store;

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
