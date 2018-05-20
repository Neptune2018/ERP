// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//这是一个vue实例，可以说是整个前端的内容都包含在这个实例里面
//具体请看VUE官方文档

import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './store'
import  VueResource  from 'vue-resource'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import '../my-theme/index.less'

Vue.use(VueResource)
Vue.use(iView)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  http: {
    root: '/root',
    headers: {
      //Authorization: 'Basic YXBpOnBhc3N3b3Jk'
    }
  }

})
