<template>
  <div id="content">
      <section class="q-wrap">
        <!-- <img :src="require('../../assets/images/banner'+pic+'.jpeg')" alt=""> -->
        <transition-group name="slide-fade" tag="ul">
          <li
            v-for="item in list"
            :key="item.id"
            v-if="item.show"
            :class="item.fold ? '' : 'unfold'"
            >
            {{item.q}}
            <span @click="open(item.id)"></span>
            <p v-if="item.show" v-html="'答：' + (item.a || '_____')"></p>
          </li>
        </transition-group>
      </section>
    <section class="todo-wrap">
      <div id="loading" v-show="loading">
        <loading></loading>
      </div>
      <tabs :value="filter" @change="tabChange">
        <tab v-for="tab in states" :label="tab" :key="tab" :index="tab"></tab>
        <!-- <tab label="tab0" index="0">
          <p>content 1 {{haha}}</p>
        </tab>
        <tab label="tab1" index="1">
          <span slot="label" style="color: orange">tab1</span>
          <p>content 2</p>
        </tab>
        <tab label="tab2" index="2">
          <p>content 3</p>
        </tab> -->
      </tabs>
      <input
        type="text"
        class="add-input"
        autofocus="autofocus"
        placeholder="to do sth."
        @keyup.enter="handleAdd"
      >
      <Item
        v-for="todo in shownTodos"
        :todo="todo"
        :key="todo.id"
        @delItem="deleteTodo"
        @toggle="toggleTodoState"
      />
      <Helper
        :todos="todos"
        @clearAllCompleted="clearAllCompleted"
      />
      <!-- <Helper
        :todos="todos"
        :filter="filter"
        @filterList="filterList"
        @clearAllCompleted="clearAllCompleted"
      /> -->
    </section>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import Item from './item.vue'
import Helper from './helper.vue'
import Loading from '../../components/loading/loading.vue'
export default {
  metaInfo: {
    title: 'Todo Page'
  },
  mounted () {
    this.fetchTodos()
  },
  data () {
    return {
      filter: 'all',
      states: ['all', 'active', 'completed'],
      haha: '',
      pic: '1',
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
          a: '',
          show: false,
          fold: true
        },
        {
          id: 21,
          q: 'vue-router url中有个#是什么原因',
          a: '因为vue-router默认是用哈希路由，服务器是不会解析#后面的东西，所以页面才能正常显示（不然就会出现404了），去掉的话就得把路由改成history模式，并且修改服务器的配置，官方文档 <a href="https://router.vuejs.org/zh-cn/essentials/history-mode.html" rel="nofollow noreferrer" target="_blank">https://router.vuejs.org/zh-c...</a>',
          show: false,
          fold: true
        }
      ]
    }
  },
  components: {
    Item,
    Helper,
    Loading
  },
  computed: {
    ...mapState([
      'todos',
      'loading'
    ]),
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
    ...mapActions([
      'fetchTodos',
      'addTodo',
      'updateTodo',
      'deleteTodo',
      'deleteAllCompleted'
    ]),
    open (id) {
      this.list.filter(item => {
        if (item.id === id) {
          item.fold = !item.fold
        }
      })
    },
    tabChange (value) {
      this.filter = value
    },
    handleAdd (e) {
      let val = e.target.value.trim()
      if (!val) {
        this.$notify({
          content: '请输入事务内容'
        })
        return
      }
      let todo = {
        content: val,
        completed: false
      }
      this.addTodo(todo)
      e.target.value = ''
    },
    // filterList (state) {
    //   this.filter = state
    // },
    toggleTodoState (todo) {
      this.updateTodo({
        id: todo.id,
        todo: Object.assign({}, todo, {
          completed: !todo.completed
        })
      })
    },
    clearAllCompleted () {
      this.deleteAllCompleted()
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
        top 10px
        cursor pointer
        border 5px solid transparent
        border-left 6px solid white
      }
      p {
        margin 0
        font-size 16px
      }
      .ll {
        color orange}
      >>> a {
        color white
        text-decoration none
        &:hover {
          text-decoration underline
        }
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
  .todo-wrap
    width 600px
    margin 100px auto 0
    box-shadow 0 0 5px #666
    position relative
  .add-input
    position relative
    width 100%
    font-size 20px
    font-family inherit
    line-height 1.4em
    border 0
    outline 0
    color #666
    padding 8px 15px
    text-align center
    border 1px solid #999
    box-shadow inset 0 -1px 5px 0 rgba(0,0,0,.5)
    box-sizing border-box
  .slide-fade-enter-active
    transition: all 1s ease
  .slide-fade-enter
    transform translateX(50px)
    opacity 0
</style>

