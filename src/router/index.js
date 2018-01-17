import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '@/page/homepage'
import editHomepageDate from '@/page/homepage/editHomepageDate'
import author from '@/page/author'
import articleEditor from '@/page/articleEditor'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Homepage,
      children: [
        {
          path: '',
          redirect: 'editHomepageDate'
        },
        {
          path: 'editHomepageDate',
          name: 'editHomepageDate',
          component: editHomepageDate
        }
      ]
    },
    {
      path: '/author',
      name: 'author',
      component: author
    },
    {
      path: '/articleEditor',
      name: 'articleEditor',
      component: articleEditor
    }
  ]
})
