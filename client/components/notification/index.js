import Notification from './notification.vue'
import notify from './func'

export default (Vue) => {
  Vue.component(Notification.name, Notification)
  Vue.prototype.$notify = notify
  // 赋值给prototype 这样就可以this.$notify 直接调用
}
