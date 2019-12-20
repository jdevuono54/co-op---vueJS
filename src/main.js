import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'


Vue.config.productionTip = false;

const base = axios.create({
  baseURL: 'https://tools.sopress.net/iut/coop/api',
  headers: {
    Authorization: '86260c9cde63e0589418c8d61bcc377a256f922d'
  }
})

Vue.prototype.$http = base

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
