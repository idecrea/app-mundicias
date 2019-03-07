import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'list',
      component: () => import('./views/List.vue')
    },
    {
      path: '/news/:pos',
      name: 'news',
      component: () => import('./views/News.vue')
    }
  ]
})
