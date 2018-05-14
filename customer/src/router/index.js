import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'
import Goods from '@/components/goods/goods'
import Seller from '@/components/seller/seller'
import Order from '@/components/order/order'
import Star from '@/components/star/star'
import Test from '@/components/test/test'
import sellerSearch from '@/components/test/seller-search'
import Entrance from '@/components/entrance/entrance'

Vue.use(Router)
Vue.use(Resource)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/entrance',
      name: 'Entrance',
      component: Entrance
    },
    {
      path: '/mall/',
      name: 'Goods',
      component: Goods
    },
    {
      path: '/mall/order',
      name: 'Order',
      component: Order
    },
    {
      path: '/mall/seller',
      name: 'Seller',
      component: Seller
    },
    {
      path: '/star',
      name: 'Star',
      component: Star
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    },
    {
      path: '/seller-search',
      name: 'sellerSearch',
      component: sellerSearch
    }
  ]
})
