import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import SecondPage from '@/components/SecondPage'
import Goods from '@/components/Goods'
import Material from '@/components/Material'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/second',
      name: 'SecondPage',
      component: SecondPage
    },
    {
      path: '/goods',
      name: 'Goods',
      component: Goods
    },
    {
      path: '/material',
      name: 'Material',
      component: Material
    }
  ]
})
