import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import BootstrapVue from 'bootstrap-vue'

import { library } from "@fortawesome/fontawesome-svg-core";
import { faBars,
        faHeading,
        faKey,
        faEnvelope,
        faUser
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

Vue.use(BootstrapVue)

library.add(faBars,faHeading,faKey,faEnvelope,faUser);
Vue.component("font-awesome-icon", FontAwesomeIcon);


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
  render: h => h(App),
    methods:{
        makeToast(errorMsg) {
            this.$root.$bvToast.toast(errorMsg, {
                title: "⚠ Erreur !",
                variant: "danger",
                noCloseButton: true
            })
        }
    }
}).$mount('#app')
