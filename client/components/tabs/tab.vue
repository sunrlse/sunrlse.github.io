<script>
export default {
  name: 'Tab',
  props: {
    index: {
      type: [String, Number],
      required: true
    },
    label: {
      type: String,
      default: 'tab'
    }
  },
  // inject: ['value'],
  computed: {
    active () {
      return this.$parent.value === this.index
    }
  },
  mounted () {
    this.$parent.panes.push(this)
  },
  methods: {
    handleClick () {
      this.$parent.onChange(this.index)
    }
  },
  render () {
    const tab = this.$slots.label || <span>{this.label}</span>
    const classNames = {
      tab: true,
      active: this.active
    }
    return (
      <li class={classNames} on-click={this.handleClick}>
        {tab}
      </li>
    )
  }
}
</script>
<style lang="stylus" scoped>
.tab
  list-style none
  line-height 40px
  margin-right 30px
  position relative
  cursor pointer
  &.active
    border-bottom 2px solid orange
  &:last-child
    margin-right 0
</style>
