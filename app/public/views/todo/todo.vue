<template>
  <div id="content">
      <section class="q-wrap">
        <transition-group name="slide-fade" tag="ul">
          <li
            v-for="item in list"
            :key="item.id"
            v-if="item.show"
            :class="item.fold ? '' : 'unfold'"
            @click="open(item.id)">
            {{item.q}}
            <span></span>
            <p v-if="item.show">答：_____</p>
          </li>
        </transition-group>
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
      list: [
        {
          id: 11,
          q: '原生js实现数组拷贝的方法有哪些？',
          show: false,
          fold: true
        },
        {
          id: 12,
          q: '原生js数组删除元素的方法有哪些？',
          show: false,
          fold: true
        },
        {
          id: 13,
          q: '谈谈栈溢出的情况？',
          show: false,
          fold: true
        },
        {
          id: 14,
          q: '说一下函数的作用域？ 垃圾回收机制 ？',
          show: false,
          fold: true
        },
        {
          id: 15,
          q: '原型链是什么 ？ 怎样实现继承 ？这里面有个坑，你说下？',
          show: false,
          fold: true
        },
        {
          id: 16,
          q: 'es6 都使用了哪些新的语法或者特性？',
          show: false,
          fold: true
        },
        {
          id: 17,
          q: 'vue-router 哪几种跳转方式？',
          show: false,
          fold: true
        },
        {
          id: 18,
          q: 'vue双向绑定的实现原理？',
          show: false,
          fold: true
        },
        {
          id: 19,
          q: '刷新页面，vuex存储的状态还存在吗，vuex是只能用在单页面应用中吗？',
          show: false,
          fold: true
        },
        {
          id: 20,
          q: '说一下对vue的生命周期理解',
          show: false,
          fold: true
        },
        {
          id: 21,
          q: '使用webpack让你自己完整搭建 ok吗？',
          show: false,
          fold: true
        }
      ]
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
  beforeMount () {
    this.list.forEach((item, index) => {
      let timer = setTimeout(() => { item.show = true; clearTimeout(timer) }, index * 100)
    })
  },
  methods: {
    open (id) {
      this.list.filter(item => {
        if (item.id === id) {
          item.fold = !item.fold
        }
      })
    },
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
    li {
      position relative
      height 28px
      overflow hidden
      padding-left 20px
      span {
        position absolute
        content ""
        left 6px
        top 8px
        cursor pointer
        border 5px solid transparent
        border-left 6px solid white
      }
      p {
        margin 0
        font-size 16px
      }
      &.unfold {
        height auto
        span {
          left 3px
          border 5px solid transparent
          border-top 6px solid white
        }
      }
    }
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

