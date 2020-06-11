import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
// import Rule from './views/Rule.vue'
// import GiftDes from './views/GiftDes.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
  ]
})
