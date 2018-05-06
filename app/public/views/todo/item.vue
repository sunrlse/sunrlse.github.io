<template>
  <div :class="['todo-item', todo.completed ? 'completed' : '']">
    <input type="checkbox"
      class="toggle"
      v-model="todo.completed"
    >
    <label for="">{{todo.content}}</label>
    <button class="remove" @click="delTodo"></button>
  </div>
</template>
<script>
export default {
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  methods: {
    delTodo () {
      this.$emit('delItem', this.todo.id)
    }
  }
}
</script>
<style lang="stylus" scoped>
  .todo-item {
    position relative
    background #ffffff
    font-size 20px
    color #666
    padding-left 20px
    border-bottom 1px solid #d5d5d5
    &:hover {
      .remove:after {
        content 'x'
        cursor pointer
      }
    }
    &.completed {
      color #ccc
      label {
        text-decoration line-through
      }
    }
    label {
      display inline-block
      white-space pre-line
      word-break break-all
      padding 10px 60px 10px 15px
      margin-left 45px
      line-height 1.2
      text-align center
      transition color 0.4s
    }
  }
  .remove {
    position absolute
    top 0
    right 10px
    bottom 0
    width 40px
    height 40px
    margin-bottom 10px
    font-size 28px
    color #999
    border 0
    outline 0
    background transparent
  }
</style>
