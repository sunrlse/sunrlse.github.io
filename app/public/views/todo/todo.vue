<template>
  <div id="content">
    <img src="../../assets/images/banner1.jpeg" alt="">
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
      filter: 'all'
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
  .todo-wrap {
    width 600px
    margin 200px auto 
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
</style>

