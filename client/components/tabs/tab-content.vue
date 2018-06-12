<script>
export default {
  name: 'TabContent',
  props: {
    panes: {
      type: Array,
      required: true
    }
  },
  render () {
    const content = this.panes.map(pane => {
      return pane.active ? pane.$slots.default : null
    })
    return (
      <div class="tabs-content">
        {content}
      </div>
    )
  }
}
</script>
