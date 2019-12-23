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

router.beforeEach((to, from, next) => {
  let publicPages = ['/'];
  let authRequired = !publicPages.includes(to.path);
  let loggedIn =  null;

  if(localStorage.getItem('vuex'))
  {
    loggedIn = JSON.parse(localStorage.getItem('vuex')).user
  }

  if (authRequired && !loggedIn) {
    return next({
      path: '/',
      query: { returnUrl: to.path }
    });
  }

  next();
})

export default router
