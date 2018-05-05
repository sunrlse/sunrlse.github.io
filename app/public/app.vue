<template>
  <div id="app">
    <Header></Header>
    <Todo></Todo>
    <Footer></Footer>
  </div>
</template>

<script>
    import Header from './todo/header.vue';
    import Footer from './todo/footer.jsx';
    import Todo from './todo/todo.vue';
    export default {
        data() {
           return {
               text: 'now vue!'
           }
        },
        components: {
            Header,
            Footer,
            Todo
        }
        // render() {
        //     createElement()
        // }
    }
</script>

<style lang="stylus" scoped>
    #app {
        height 100%
    }
</style>
