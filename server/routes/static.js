const Router = require('koa-router')
const koaSend = require('koa-send')

const staticRouter = new Router({
  prefix: '/public'
})
// koa Router 只处理/public开头的路径

staticRouter.get('*', async ctx => {
  await koaSend(ctx, ctx.path)
})

module.exports = staticRouter
