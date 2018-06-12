import model from '../../model/client-model'
import bus from '../../util/bus'
import notify from '../../components/notification/func'

const handleError = (err) => {
  if (err.code === 401) {
    notify({
      content: '还没有登录哟'
    })
    bus.$emit('auth')
  }
}

export default {
  updateCountAsync (store, payload) {
    // setTimeout(() => {
    store.commit('updateCount', payload)
    // }, 2000)
  },
  login ({commit}, {username, password}) {
    return new Promise((resolve, reject) => {
      model.login(username, password)
        .then(data => {
          commit('doLogin', data)
          notify({
            content: '登陆成功'
          })
          resolve()
        })
        .catch(err => {
          handleError(err)
          reject(err)
        })
    })
  },
  fetchTodos ({commit}) {
    commit('startLoading')
    model.getAllTodos()
      .then(data => {
        commit('endLoading')
        commit('fillTodos', data)
      })
      .catch(err => {
        commit('endLoading')
        handleError(err)
      })
  },
  addTodo ({commit}, todo) {
    model.createTodo(todo)
      .then(data => {
        commit('addTodo', data)
        notify({
          content: '您新增了一条事务要处理'
        })
      })
      .catch(err => {
        handleError(err)
      })
  },
  updateTodo ({commit}, {id, todo}) {
    model.updateTodo(id, todo)
      .then(data => {
        commit('updateTodo', {id, todo: data})
        notify({
          content: '您修改了一条事务'
        })
      })
      .catch(err => {
        handleError(err)
      })
  },
  deleteTodo ({commit}, id) {
    commit('startLoading')
    model.deleteTodo(id)
      .then(data => {
        commit('endLoading')
        commit('deleteTodo', id)
        notify({
          content: '您删除了一条事务'
        })
      })
      .catch(err => {
        commit('endLoading')
        handleError(err)
      })
  },
  deleteAllCompleted ({commit, state}) {
    commit('startLoading')
    const ids = state.todos.filter(t => t.completed).map(t => t.id)
    model.deleteAllCompleted(ids)
      .then(data => {
        commit('endLoading')
        commit('deleteAllCompleted')
        notify({
          content: '您删除了所有已完成事务'
        })
      })
      .catch(err => {
        commit('endLoading')
        handleError(err)
      })
  }
}
