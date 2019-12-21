import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from "vuex-persist";

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

export default new Vuex.Store({
  plugins:[vuexLocal.plugin],
  state: {
    formInscription: false,
    user: null
  },
  mutations: {
    changeFormInscriConnex(state) {
      state.formInscription = !state.formInscription
    },
    saveUserLocalStorage(state,user){
      state.user = user;
    }
  },
  actions: {
  },
  modules: {
  }
})
