<template>
  <div id="app">
    <!-- <div id="cover" v-show="loading"></div> -->
    <Header></Header>
    <!-- <p>{{counter}}</p>
    <p>{{fullName}}</p>
    <p>{{textA}}</p>
    <p>---{{cm}}</p> -->
    <router-link to="/app">app</router-link>
    <router-link to="/login">login</router-link>
    <!-- vue-router内置组件 -->
    <transition name="fade">
      <router-view />
    </transition>
    <!-- <notification content="fuck it"></notification> -->
    <Footer></Footer>
    <!-- <router-view name="a" /> -->
  </div>
</template>

<script>
import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
import Todo from './views/todo/todo.vue'
// import {
//   // mapState
//   // mapGetters,
//   // mapMutations
// } from 'vuex'
export default {
  metaInfo: {
    title: 'Home Page'
  },
  data () {
    return {
      text: 'now vue!'
    }
  },
  mounted () {
    // console.log(this.$store)
    // let i = 1
    // setInterval(() => {
    //   // this.$store.commit('updateCount', i++)
    //   this.$store.dispatch('updateCountAsync', {
    //     num: i++
    //   })
    // }, 1000)
    // this['a/updateText']('new a text')
  },
  computed: {
    // ...mapState(['loading'])
    // ...mapState(['count'])
    // mapstate 中更改一个变量的值，页面热更新时 重新增加了一个值：如 counter 计时每更新一次增加一个实例值
    // ...mapState({
    //   // counter: 'count'
    //   counter: state => state.count,
    //   cm: state => state.c.text
    // }),
    // ...mapGetters(['fullName']),
    // textA () {
    //   return this.$store.state.a.text
    // }
  },
  methods: {
    // ...mapActions(['updateCountAsync']),
    // ...mapMutations(['a/updateText'])
  },
  components: {
    Header,
    Footer,
    Todo
  }
}
</script>

<style lang="stylus" scoped>
  #app{
    position absolute
    left 0
    right 0
    top 0
    bottom 0
  }
</style>
