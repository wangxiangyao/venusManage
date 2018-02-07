// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import './globalField.js'
import App from './App'
import router from './router'
import store from './store'
import { Upload, Button, Select, Radio, Input, RadioGroup, Option, Row, Col } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { apolloProvider } from './serverLink.js'

console.log(apolloProvider)
console.log(process.env)
console.log(global)

Vue.config.productionTip = false
Vue.use(Upload)
Vue.use(Button)
Vue.use(Select)
Vue.use(Radio)
Vue.use(Input)
Vue.use(RadioGroup)
Vue.use(Option)
Vue.use(Row)
Vue.use(Col)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  apolloProvider,
  template: '<App/>',
  components: { App }
})
