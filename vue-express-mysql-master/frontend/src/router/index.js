import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import SecondPage from '@/components/SecondPage'
import CostManageProduct from '@/components/CostManage_product'
import CostManageMatrial from '@/components/CostManage_matrial'
import Group from '@/components/Group'
import ParticularizeGroup from '@/components/ParticularizeGroup'
import UserInfor from '@/components/UserInfor'
import Signin from '@/components/Signin'
import Generate from '@/components/Generate'

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
      path: '/costmanage_product',
      name: 'CostManageProduct',
      component: CostManageProduct
    },
    {
      path: '/costmanage_matrial',
      name: 'CostManageMatrial',
      component: CostManageMatrial
    },
    {
      path: '/group',
      name: 'Group',
      component: Group
    },
    {
      path: '/group/ParticularizeGroup',
      name: 'ParticularizeGroup',
      component: ParticularizeGroup
    },
    {
      path: '/userInfor',
      name: 'UserInfor',
      component: UserInfor
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/generate',
      name: 'Generate',
      component: Generate
    }
  ]
})
