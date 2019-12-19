import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from "../views/Auth";
import Channel from "../views/Channel";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'auth',
    component: Auth
  },
  {
    path: '/channel',
    name: 'channel',
    component: Channel
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
