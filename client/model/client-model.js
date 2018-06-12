import axios from 'axios'
import {createError} from './util'

const request = axios.create({
  baseURL: '/' // 本地向服务请求，绝对路径,不需要host port
})

const handleRequest = (request) => {
  return new Promise((resolve, reject) => {
    request.then(resp => {
      const data = resp.data
      if (!data) {
        return reject(createError(400, 'no data'))
      }
      if (!data.success) {
        return reject(createError(400, data.message))
      }
      resolve(data.data)
    }).catch(err => {
      const resp = err.response
      if (resp.status === 401) {
        reject(createError(401, 'need login'))
      }
    })
  })
}

export default {
  login (username, password) {
    return handleRequest(request.post('/user/login', {username, password}))
  },
  getAllTodos () {
    return handleRequest(request.get('/api/todos'))
  },
  updateTodo (id, todo) {
    return handleRequest(request.put(`/api/todo/${id}`, todo))
  },
  createTodo (todo) {
    return handleRequest(request.post('/api/todo/', todo))
  },
  deleteTodo (id) {
    return handleRequest(request.delete(`/api/todo/${id}`))
  },
  deleteAllCompleted (ids) {
    return handleRequest(request.post('/api/delete/completed', {ids}))
  }
}
