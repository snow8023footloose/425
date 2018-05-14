import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'
import Goods from '@/components/goods/goods'
import Order from '@/components/order/order'
import Tables from '@/components/tables/tables'
import Finance from '@/components/finance/finance'
import Apply from '@/components/test/apply'
import Setting from '@/components/setting/setting'
import Xwfcustom from '@/components/xwfcustom/xwfcustom'
import upLoad from '@/components/upload/upload'
import Touch from '@/components/test/touch'
import Coupon from '@/components/coupon/coupon'


Vue.use(Router)
Vue.use(Resource)

export default new Router({
  mode: 'history',
  routes: [
    {
      path:'/manager/xwfs/coupon',
      name:'Coupon',
      component: Coupon
    },
    {
      path:'/touch',
      name:'Touch',
      component: Touch
    },
    {
      path:'/manager/xwfs/goods',
      name:'Goods',
      component: Goods
    },
    {
      path:'/manager/xwfs/finance',
      name:'Finance',
      component: Finance
    },
    {
      path:'/manager/',
      name:'Tables',
      component:Tables
    },
    {
      path:'/manager/xwfs/order',
      name:'Order',
      component: Order
    },
    {
      path:'/manager/xwfs/apply',
      name:'Apply',
      component: Apply
    },
    {
      path:'/manager/xwfs/setting',
      name:'Setting',
      component: Setting
    },
    {
      path:'/platform/xwfer/xwfcustom',
      name:'Xwfcustom',
      component: Xwfcustom
    },
    {
      path:'/up',
      name:'upLoad',
      component: upLoad
    }
  ]
})
