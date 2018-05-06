<template>
  <div id="app">
    <Header></Header>
    <Todo></Todo>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
import Todo from './views/todo/todo.vue'
export default {
  data () {
    return {
      text: 'now vue!'
    }
  },
  components: {
    Header,
    Footer,
    Todo
  }
}
</script>

<style lang="stylus" scoped>
  #app {
    height 100%
  }
</style>
