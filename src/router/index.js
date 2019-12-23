import Vue from 'vue'
import VueRouter from 'vue-router'
import Channel from "../views/Channel";
import Inscription from "../views/Inscription";
import Login from "../views/Login";

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/inscription',
    name: 'inscription',
    component: Inscription
  },
  {
    path: '/',
    name: 'channel',
    component: Channel
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let publicPages = ['/inscription','/login'];
  let authRequired = !publicPages.includes(to.path);
  let loggedIn =  null;

  if(localStorage.getItem('vuex'))
  {
    loggedIn = JSON.parse(localStorage.getItem('vuex')).user
  }

  if (authRequired && !loggedIn) {
    return next({
      path: '/login',
      query: { returnUrl: to.path }
    });
  }
  else if(loggedIn && to.path === '/login' || to.path === '/inscription'){
    return next({
      path: '/',
      query: { returnUrl: to.path }
    });
  }

  next();
})

export default router
