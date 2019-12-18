import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'


Vue.config.productionTip = false;

const base = axios.create({
  baseURL: 'http://coop.api.netlor.fr/api',
  headers: {
    Authorization: 'Token token=19259c3ebc6f44afba5aecbb361b7deb'
  }
})

Vue.prototype.$http = base

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
