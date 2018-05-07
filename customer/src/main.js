// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import axios from 'axios'
import {request, urlColletion, getUID, goodsArr,formatDateTime} from 'api/api'
// import {urlColletion} from 'api/api'
// import {getUID} from 'api/api'
// import {goodsArr} from 'api/api'

// import VueRouter from 'vue-router'
Vue.prototype.$axios = axios
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$request = request
Vue.prototype.url = urlColletion()
Vue.prototype.getUID = getUID()
Vue.prototype.goodsArr = goodsArr
Vue.prototype.formatDateTime = formatDateTime
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
