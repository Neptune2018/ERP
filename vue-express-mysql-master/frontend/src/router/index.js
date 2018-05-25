import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld'
import SecondPage from '@/components/SecondPage'
import MatrialLack from '@/components/MatrialLack'
import SafeStock from '@/components/SafeStock'

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
      name: 'MatrialLack',
      component: MatrialLack
    },{
      path: '/safeStock',
      name: 'SafeStock',
      component: SafeStock
    }
  ]
})
