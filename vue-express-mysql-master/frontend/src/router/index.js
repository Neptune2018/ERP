import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld'
import SecondPage from '@/components/SecondPage'
import Goods from '@/components/Goods'
import Material from '@/components/Material'
import Category from '@/components/Category'
import CostManageProduct from '@/components/CostManage_product'
import CostManageMatrial from '@/components/CostManage_matrial'
import Group from '@/components/Group'
import ParticularizeGroup from '@/components/ParticularizeGroup'
import UserInfor from '@/components/UserInfor'
import Signin from '@/components/Signin'
import Generate from '@/components/Generate'
import MatrialLack from '@/components/MatrialLack'
import SafeStock from '@/components/SafeStock'

import State from '@/components/State'

import Supplier from '@/components/SupplierMange'
import OfferList from '@/components/OfferList'
import ImportWare from '@/components/ImportWare'
//import ExportWare from '@/components/ExportWare'



//import ThresholdWarning from '@/components/ThresholdWarning'

import Stocks from '@/components/Stocks'

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
      path: '/category',
      name: 'Category',
      component: Category
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
      path: '/state',
      name: 'State',
      component: State
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
    /* {
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
    }, */
    /* {
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
    }, */
    /* {
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
    }, */
    {
      path: '/offerlist',
      name: 'OfferList',
      component: OfferList
    },
    {
      path: '/supplier',
      name: 'supplier',
      component: Supplier
    },
    {
      path: '/ioinfo',
      name: 'IOList',
      component: IOList
    },
    {
      path: '/inventory',
      name: 'Stocks',
      component: Stocks
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