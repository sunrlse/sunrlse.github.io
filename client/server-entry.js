import createApp from './create-app'

export default (context) => {
  return new Promise((resolve, reject) => {
    const { app, router } = createApp()

    router.push(context.url)
    // 路由记录推进去后，所有异步操作，如异步加载组件，完成后回调，eg:获取数据
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        return reject(new Error('no component matched'))
      }
      context.meta = app.$meta()
      resolve(app)
    })
  })
}
