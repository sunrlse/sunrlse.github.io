<template>
  <div class="filter">
    <span class="left">{{unCompletedTodoNumber}} items left</span>
    <span class="tabs">
      <span 
        v-for="state in states"
        :key="state"
        :class="['state', filter === state ? 'actived' : '']"
        @click="toggleFilter(state)"
      >
        {{state}}
      </span>
    </span>
    <span class="clear" @click="clearAllCompleted">clear completed</span>
  </div>
</template>
<script>
export default {
  props: {
    todos: {
      type: Array,
      required: true
    },
    filter: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      states: ['all', 'active', 'completed']
    }
  },
  computed: {
    unCompletedTodoNumber () {
      return this.todos.filter(todo => !todo.completed).length
    }
  },
  methods: {
    toggleFilter (state) {
      this.$emit('filterList', state)
    },
    clearAllCompleted () {
      this.$emit('clearAllCompleted')
    }
  }
}
</script>
<style lang="stylus" scoped>
  .filter {
    padding 10px 0
  }
  .state {
    margin-left 20px
    cursor pointer
    text-align center
    display inline-block
    padding 0 3px
    border 1px solid transparent
  }
  .actived {
    border-color #d5d5d5
    border-radius 3px
    cursor default
  }
  .clear {
    float right 
    cursor pointer
    &:hover {
      text-decoration underline
    }
  }
</style>
