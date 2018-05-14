import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'
import Goods from '@/components/goods/goods'
import Order from '@/components/order/order'
import Tables from '@/components/tables/tables'
import Finance from '@/components/finance/finance'
import Apply from '@/components/test/apply'
import Setting from '@/components/setting/setting'
import Xwfer from '@/components/xwfer/xwfer'
import Xwfcustom from '@/components/xwfcustom/xwfcustom'
import Xwffunction from '@/components/xwffunction/xwffunction'
import upLoad from '@/components/upload/upload'
import Modle from '@/components/test/modle'
import Computer from '@/components/comput/computer'
import Touch from '@/components/test/touch'


Vue.use(Router)
Vue.use(Resource)

export default new Router({
  mode: 'history',
  routes: [
    {
      path:'/Computer',
      name:'Computer',
      component: Computer
    },
    {
      path:'/touch',
      name:'Touch',
      component: Touch
    },
    {
      path:'/manager/XWFs/goods',
      name:'Goods',
      component: Goods
    },
    {
      path:'/manager/XWFs/finance',
      name:'Finance',
      component: Finance
    },
    {
      path:'/manager/',
      name:'Tables',
      component:Tables
    },
    {
      path:'/manager/XWFs/order',
      name:'Order',
      component: Order
    },
    {
      path:'/manager/XWFs/apply',
      name:'Apply',
      component: Apply
    },
    {
      path:'/manager/XWFs/setting',
      name:'Setting',
      component: Setting
    },
    {
      path:'/platform/XWFer/xwfer',
      name:'Xwfer',
      component: Xwfer
    },
    {
      path:'/platform/XWFer/xwfcustom',
      name:'Xwfcustom',
      component: Xwfcustom
    },
    {
      path:'/platform/XWFer/xwffunction',
      name:'Xwffunction',
      component: Xwffunction
    },
    {
      path:'/up',
      name:'upLoad',
      component: upLoad
    }
    ,
    {
      path:'/modle',
      name:'Modle',
      component: Modle
    }
  ]
})
