import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import SecondPage from '@/components/SecondPage'
import Group from '@/components/Group'
import ParticularizeGroup from '@/components/ParticularizeGroup'

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
      path: '/group',
      name: 'Group',
      component: Group
    },
    {
      path: '/group/ParticularizeGroup',
      name: 'ParticularizeGroup',
      component: ParticularizeGroup
    }
  ]
})
