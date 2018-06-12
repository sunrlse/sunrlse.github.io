import Router from 'vue-router'
import routes from './routes'

// const router = new Router({
//   routes
// })
// export default router
// 若直接像上面这样使用，则
// 1 在全局import这个文件时，都是同一个导出的router
// 2 在使用服务端渲染时会导致 内存溢出的问题
//   我们需要每次引用这个文件时 都创建一个router
//   每次服务端渲染都会新生成一个新的app ，router又只有一个对象，就会缓存每次新建的app，
//   导致服务端渲染流程结束时 app对象没有释放掉，内存增加 或溢出
export default () => {
  return new Router({
    routes,
    mode: 'history',
    // base: '/base/',
    linkActiveClass: 'active-link',
    linkExactActiveClass: 'exact-active-link',
    fallback: false
  })
}
