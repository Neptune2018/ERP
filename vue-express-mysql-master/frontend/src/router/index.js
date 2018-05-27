import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import SecondPage from '@/components/SecondPage'
import ThresholdWarning from '@/components/ThresholdWarning'
import ImportWare from '@/components/ImportWare'
import ExportWare from '@/components/ExportWare'
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
      path: '/starving',
      name: 'ThresholdWarning',
      component: ThresholdWarning
    },
    {
      path:'/ImportWare',
      name: 'ImportWare',
      component: ImportWare
    },
    {
      path:'/ExportWare',
      name: 'ExportWare',
      component: ExportWare},
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
