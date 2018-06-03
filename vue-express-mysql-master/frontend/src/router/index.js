import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld'
import SecondPage from '@/components/SecondPage'
import Goods from '@/components/Goods'
import Material from '@/components/Material'

import CostManageProduct from '@/components/CostManage_product'
import CostManageMatrial from '@/components/CostManage_matrial'
import Group from '@/components/Group'
import ParticularizeGroup from '@/components/ParticularizeGroup'
import UserInfor from '@/components/UserInfor'
import Signin from '@/components/Signin'
import Generate from '@/components/Generate'
import MatrialLack from '@/components/MatrialLack'
import SafeStock from '@/components/SafeStock'

import ThresholdWarning from '@/components/ThresholdWarning'
import ImportWare from '@/components/ImportWare'
import ExportWare from '@/components/ExportWare'
import IOList from '@/components/IOList'

import store from '../store'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
    },
    {
      path: '/second',
      name: 'SecondPage',
      component: SecondPage
    },
    {
      path: '/goods',
      name: 'Goods',
      component: Goods,
      beforeEnter: (to, from, next) => {
        store.dispatch('hasFeature', 'Production').then(function(){
            next()
        }, function(){
            alert('You Dont have Authority!')
            next('/userInfor')
        })
      }
    },
    {
      path: '/material',
      name: 'Material',
      component: Material,
      beforeEnter: (to, from, next) => {
        store.dispatch('hasFeature', 'Production').then(function(){
            next()
        }, function(){
            alert('You Dont have Authority!')
            next('/userInfor')
        })
      }
    },
    {
      path: '/costmanage_product',
      name: 'CostManageProduct',
      component: CostManageProduct,
      beforeEnter: (to, from, next) => {
        store.dispatch('hasFeature', 'Cost').then(function(){
            next()
        }, function(){
            alert('You Dont have Authority!')
            next('/userInfor')
        })
      }
    },
    {
      path: '/costmanage_matrial',
      name: 'CostManageMatrial',
      component: CostManageMatrial,
      beforeEnter: (to, from, next) => {
        store.dispatch('hasFeature', 'Cost').then(function(){
            next()
        }, function(){
            alert('You Dont have Authority!')
            next('/userInfor')
        })
      }
    },
    {
      path: '/group',
      name: 'Group',
      component: Group,
      beforeEnter: (to, from, next) => {
        store.dispatch('hasFeature', 'User').then(function(){
            next()
        }, function(){
            alert('You Dont have Authority!')
            next('/userInfor')
        })
      }
    },
    {
      path: '/group/ParticularizeGroup',
      name: 'ParticularizeGroup',
      component: ParticularizeGroup,
      beforeEnter: (to, from, next) => {
        store.dispatch('hasFeature', 'User').then(function(){
            next()
        }, function(){
            alert('You Dont have Authority!')
            next('/userInfor')
        })
      }
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
      component: Generate,
      beforeEnter: (to, from, next) => {
        store.dispatch('hasFeature', 'Production').then(function(){
            next()
        }, function(){
            alert('You Dont have Authority!')
            next('/userInfor')
        })
      }
    },
    {
      path: '/starving',
      name: 'MatrialLack',
      component: MatrialLack,
      beforeEnter: (to, from, next) => {
        store.dispatch('hasFeature', 'Purchase').then(function(){
            next()
        }, function(){
            alert('You Dont have Authority!')
            next('/userInfor')
        })
      }
    },{
      path: '/safeStock',
      name: 'SafeStock',
      component: SafeStock,
      beforeEnter: (to, from, next) => {
        store.dispatch('hasFeature', 'Purchase').then(function(){
            next()
        }, function(){
            alert('You Dont have Authority!')
            next('/userInfor')
        })
      }
    },
    {
      path:'/ImportWare',
      name: 'ImportWare',
      component: ImportWare,
      beforeEnter: (to, from, next) => {
        store.dispatch('hasFeature', 'Keep').then(function(){
            next()
        }, function(){
            alert('You Dont have Authority!')
            next('/userInfor')
        })
      }
    },
    {
      path:'/ExportWare',
      name: 'ExportWare',
      component: ExportWare,
      beforeEnter: (to, from, next) => {
        store.dispatch('hasFeature', 'Keep').then(function(){
            next()
        }, function(){
            alert('You Dont have Authority!')
            next('/userInfor')
        })
      }
    },
    {
      path: '/inventory',
      name: 'IOList',
      component: IOList,
      beforeEnter: (to, from, next) => {
        store.dispatch('hasFeature', 'Keep').then(function(){
            next()
        }, function(){
            alert('You Dont have Authority!')
            next('/userInfor')
        })
      }
    },
    {
      path: '/inventory/stocks',
      name: 'ThresholdWarning',
      component: ThresholdWarning,
      beforeEnter: (to, from, next) => {
        store.dispatch('hasFeature', 'Keep').then(function(){
            next()
        }, function(){
            alert('You Dont have Authority!')
            next('/userInfor')
        })
      }
    }
  ]
})


router.beforeResolve((to, from, next) => {
  if (to.path === '/signin') {
    next();
  }
  else {
    console.log(store)
    if (store.state.isSignin === false) {
      alert('NOT SIGN IN!');
      next('/signin')
    }
    else {
      next()
    }
  }
})

export default router;