const Router = require('koa-router')

const apiRouter = new Router({prefix: '/api'}) // 只处理 /api 的路径

const vilidateUser = async (ctx, next) => {
  if (!ctx.session.user) {
    ctx.status = 401 // 未登录
    ctx.body = 'need login'
  } else {
    await next()
  }
}
// apiRouter 像是子 app 会处理自己的请求逻辑， 也可以注册中间件，只在它处理请求时调用，其他并行路由不会处理中间件
apiRouter.use(vilidateUser)

const successResponse = (data) => {
  return {
    success: true,
    data
  }
}

apiRouter
  .get('/todos', async (ctx) => {
    const todos = await ctx.db.getAllTodos()
    ctx.body = successResponse(todos)
  })
  .post('/todo', async (ctx) => {
    const data = await ctx.db.addTodo(ctx.request.body)
    ctx.body = successResponse(data)
  })
  .put('/todo/:id', async (ctx) => {
    const data = await ctx.db.updateTodo(ctx.params.id, ctx.request.body)
    ctx.body = successResponse(data)
  })
  .delete('/todo/:id', async (ctx) => {
    const data = await ctx.db.deleteTodo(ctx.params.id)
    ctx.body = successResponse(data)
  })
  .post('/delete/completed', async (ctx) => {
    const data = await ctx.db.deleteCompleted(ctx.request.body.ids)
    ctx.body = successResponse(data)
  })

module.exports = apiRouter
