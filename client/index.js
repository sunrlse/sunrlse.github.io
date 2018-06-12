import Vue from 'vue'
import Vuex from 'vuex'
import App from './app.vue'
import VueRouter from 'vue-router'

import './assets/styles/global.styl'
import createRouter from './config/router'
import createStore from './store/store'
// import mutations from './store/mutations/mutations';

Vue.use(VueRouter)
Vue.use(Vuex)

const router = createRouter()
const store = createStore()

store.registerModule('c', {
  state: {
    text: 'c-module'
  }
})

// store.unregisterModule('c')

// store.watch((state) => state.count + 10, (newCount) => {
//   console.log('count freshed ', newCount)
// })

// store.subscribe((mutation, state) => {
//   console.log(mutation.type)
//   console.log(mutation.payload)
// })
// // 订阅，主要用于 开发vuex插件(就是个函数)
// store.subscribeAction((action, state) => {
//   console.log(action.type)
//   console.log(action.payload)
// })

const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount(root)
