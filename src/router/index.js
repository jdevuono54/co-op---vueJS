import Vue from 'vue'
import VueRouter from 'vue-router'
import Channels from "../views/Channels";
import Inscription from "../views/Inscription";
import Login from "../views/Login";
import Channel_conv from "../views/Channel_conv";
import Members from "../views/Members";

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
    path: '/channels',
    name: 'channels',
    alias: '/',
    component: Channels
  },
  {
    path: '/channels/:id',
    name: 'channel_conv',
    component: Channel_conv
  },
  {
    path: '/members',
    name: 'members',
    component: Members
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

  next();
})

export default router
