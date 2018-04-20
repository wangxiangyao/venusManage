import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations.js'

import homepage from './modules/homepage.js'
import author from './modules/author.js'
import article from './modules/article.js'
import miniHomepage from './modules/miniHomepage.js'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
const uri = global.URI

// 通常，请求数据，在对应的分片store中，接收数据，在顶层store中
export default new Vuex.Store({
  state: {
    hasMask: false,
    limit: 10,
    offset: 0,
    uri,
    brands: []
  },
  mutations,
  actions,
  modules: {
    homepage,
    author,
    article,
    miniHomepage
  },
  stric: debug
})
