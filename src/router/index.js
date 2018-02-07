import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: () => import('@/page/homepage'),
      children: [
        {
          path: '',
          redirect: 'editHomepageDate'
        },
        {
          path: 'editHomepageDate',
          name: 'editHomepageDate',
          component: () => import('@/page/homepage/editHomepageDate')
        }
      ]
    },
    {
      path: '/author',
      name: 'author',
      component: () => import('@/page/author')
    },
    {
      path: '/articleEditor',
      name: 'articleEditor',
      component: () => import('@/page/articleEditor')
    }
  ]
})
