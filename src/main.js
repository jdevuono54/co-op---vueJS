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
        faUser,
        faTrash
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import VueLodash from 'vue-lodash'

Vue.use(VueLodash)

Vue.use(BootstrapVue)

library.add(faBars,faHeading,faKey,faEnvelope,faUser,faTrash);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.prototype.$bus = new Vue()
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
    },
    beforeCreate() {
        this.$http.interceptors.request.use((config) => {
            if(this.$store.state.user) {
                config.url+='?token='+this.$store.state.user.token;
            }
            return config
        }, error => {
            // eslint-disable-next-line no-console
            return console.log(error)
        })
    }
}).$mount('#app')
