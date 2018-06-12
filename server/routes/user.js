const Router = require('koa-router')

const userRouter = new Router({prefix: '/user'}) // 只处理 /user 的路径

userRouter
  .post('/login', async ctx => {
    const user = ctx.request.body
    if (user.username === 'enj' && user.password === 'enj123') {
      ctx.session.user = {
        username: 'enj'
      }
      ctx.body = {
        success: true,
        data: {
          username: 'enj'
        }
      }
    } else {
      ctx.status = 400
      ctx.body = {
        success: false,
        message: 'username or password error'
      }
    }
  })

module.exports = userRouter
