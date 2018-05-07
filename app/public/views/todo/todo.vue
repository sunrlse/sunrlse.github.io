<template>
  <div id="content">
      <section class="q-wrap">
        <ul>
          <transition name="slide-fade">
            <li v-if="show0">原生js实现数组拷贝的方法有哪些？</li>
            </transition>
          <transition name="slide-fade">
            <li v-if="show1">原生js数组删除元素的方法有哪些？</li>
            </transition>
          <transition name="slide-fade">
            <li v-if="show2">说一下函数的作用域？ 垃圾回收机制 ？</li>
            </transition>
          <transition name="slide-fade">
            <li v-if="show3">原型链是什么 ？ 怎样实现继承 ？这里面有个坑，你说下？</li>
            </transition>
          <transition name="slide-fade">
            <li v-if="show4">es6 都使用了哪些新的语法或者特性？</li>
            </transition>
          <transition name="slide-fade">
            <li v-if="show5">vue-router 哪几种跳转方式？</li>
            </transition>
          <transition name="slide-fade">
            <li v-if="show6">vue双向绑定的实现原理？</li>
            </transition>
          <transition name="slide-fade">
            <li v-if="show7">刷新页面，vuex存储的状态还存在吗，vuex是只能用在单页面应用中吗</li>
            </transition>
          <transition name="slide-fade">
            <li v-if="show8">说一下对vue的生命周期理解</li>
            </transition>
          <transition name="slide-fade">
            <li v-if="show9">你们为什么非要用nodejs？</li>
            </transition>
          <transition name="slide-fade">
            <li v-if="show10">使用webpack让你自己完整搭建 ok吗？</li>
          </transition>
        </ul>
      </section>
    <section class="todo-wrap">
      <input
        type="text"
        class="add-input"
        autofocus="autofocus"
        placeholder="to do sth."
        @keyup.enter="addTodo"
      >
      <Item
        v-for="todo in shownTodos"
        :todo="todo"
        :key="todo.id"
        @delItem="delTodo"
      />
      <Tabs
        :todos="todos"
        :filter="filter"
        @filterList="filterList"
        @clearAllCompleted="clearAllCompleted"
      />
    </section>
  </div>
</template>
<script>
import Item from './item.vue'
import Tabs from './tabs.vue'
let id = 0
export default {
  data () {
    return {
      todos: [],
      filter: 'all',
      show0: false,
      show1: false,
      show2: false,
      show3: false,
      show4: false,
      show5: false,
      show6: false,
      show7: false,
      show8: false,
      show9: false,
      show10: false
    }
  },
  components: {
    Item,
    Tabs
  },
  computed: {
    shownTodos () {
      if (this.filter === 'all') {
        return this.todos
      }
      let completed = this.filter === 'completed'
      return this.todos.filter(todo => todo.completed === completed)
    }
  },
  mounted () {
    setTimeout(() => { this.show0 = true }, 0)
    setTimeout(() => { this.show1 = true }, 100)
    setTimeout(() => { this.show2 = true }, 200)
    setTimeout(() => { this.show3 = true }, 300)
    setTimeout(() => { this.show4 = true }, 400)
    setTimeout(() => { this.show5 = true }, 500)
    setTimeout(() => { this.show6 = true }, 600)
    setTimeout(() => { this.show7 = true }, 700)
    setTimeout(() => { this.show8 = true }, 800)
    setTimeout(() => { this.show9 = true }, 900)
    setTimeout(() => { this.show10 = true }, 1000)
  },
  methods: {
    addTodo (e) {
      let val = e.target.value.trim()
      if (!val) return
      this.todos.unshift({
        id: id++,
        content: val,
        completed: false
      })
      e.target.value = ''
    },
    delTodo (id) {
      this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1)
    },
    filterList (state) {
      this.filter = state
    },
    clearAllCompleted () {
      this.todos = this.todos.filter(todo => !todo.completed)
    }
  }
}
</script>

<style lang="stylus" scoped>
  #content {
    height 100%
  }
  .q-wrap {
    width 900px
    margin 100px auto
    font-size 20px
    font-weight 300
    -webkit-font-smoothing antialiased
  }
  .todo-wrap {
    width 600px
    margin 100px auto 0
    box-shadow 0 0 5px #666
  }
  .add-input {
    position relative
    width 100%
    font-size 20px
    font-family inherit
    line-height 1.4em
    border 0
    outline 0
    color #666
    padding 5px
    border 1px solid #999
    box-shadow inset 0 -1px 5px 0 rgba(0,0,0,.5)
    box-sizing border-box
  }
  .slide-fade-enter-active {
    transition: all 1s ease
  }
  .slide-fade-enter {
    transform translateX(50px)
    opacity 0
  }
</style>

