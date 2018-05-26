import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import SecondPage from '@/components/SecondPage'
import ThresholdWarning from '@/components/ThresholdWarning'
import IOList from '@/components/IOList'
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
          path: '/inventory',
          name: 'IOList',
          component: IOList
    },
    {
          path: '/inventory/stocks',
          name: 'ThresholdWarning',
          component: ThresholdWarning
    }
  ]
})
