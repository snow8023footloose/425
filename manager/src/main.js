// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import store from './store/store'
import axios from 'axios'
import {request} from 'api/api'
import {urlColletion} from 'api/api'
import {getUID} from 'api/api'
import {goodsArr} from 'api/api'
import {cashier60,cashier80,kitchen60,kitchen80} from 'api/printermodels'
import {goeasy} from 'api/goeasy'

Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$request = request
Vue.prototype.url = urlColletion()
Vue.prototype.getUID = getUID
Vue.prototype.goodsArr = goodsArr
Vue.prototype.cashier60 = cashier60
Vue.prototype.cashier80 = cashier80
Vue.prototype.kitchen60 = kitchen60
Vue.prototype.kitchen80 = kitchen80
Vue.prototype.goeasy = goeasy

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})
