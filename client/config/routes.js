// 路由映射关系
// import Todo from '../views/todo/todo.vue'
// import Login from '../views/login/login.vue'
// 上面是同步调用组件，不同页面都加载了
//  下面是异步加载组件
export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app',
    props: true,
    // component: Todo,
    components: {
      default: () => import('../views/todo/todo.vue')
      // a: Login
    },
    name: 'todo',
    meta: {
      title: 'TODO - app',
      description: 'app todo mianshi'
    }
  },
  {
    path: '/login',
    components: {
      default: () => import('../views/login/login.vue')
    }
  }
]
