import Vuex from 'vuex'

// export default () => {
//   return new Vuex.Store({
//     state: {
//       count: 0
//     },
//     mutations: {
//       updateCount (state, num) {
//         state.count = num
//       }
//     }
//   })
// }

import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'

export default () => {
  const store = new Vuex.Store({
    state: defaultState,
    mutations,
    getters,
    actions,
    modules: {
      a: {
        namespaced: true,
        state: {
          text: 'module a - text'
        },
        mutations: {
          updateText (state, text) {
            // console.log(state)
            state.text = text
          }
        }
      }
    },
    // vuex 插件
    plugins: [
      // store 即 上面声明的 store
      (store) => {
        console.log('plugin invoked', store)
      }
    ]
  })
  if (module.hot) {
    module.hot.accept([
      './state/state',
      './mutations/mutations',
      './actions/actions',
      './getters/getters'
    ], () => {
      const newState = require('./state/state').default
      const newMutations = require('./mutations/mutations').default
      const newActions = require('./actions/actions').default
      const newGetters = require('./getters/getters').default

      store.hotUpdate({
        state: newState,
        mutations: newMutations,
        actions: newActions,
        getters: newGetters
      })
    })
  }
  return store
}
console.log(module)
