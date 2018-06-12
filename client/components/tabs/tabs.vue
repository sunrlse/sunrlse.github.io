<script>
import TabContent from './tab-content.vue'
export default {
  name: 'Tabs',
  // provide () {
  //   return {
  //     value: this.value
  //   }
  // },
  props: {
    value: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      panes: []
    }
  },
  components: {
    TabContent
  },
  render () {
    return (
      <div class="tabs">
        <ul class="tabs-panel">
          {this.$slots.default}
        </ul>
        <tab-content panes={this.panes} />
      </div>
    )
  },
  methods: {
    onChange (index) {
      this.$emit('change', index)
    }
  }
}
</script>
<style lang="stylus" scoped>
.tabs-panel
  display flex
  list-style none
  margin 0
  padding 0 15px
</style>
