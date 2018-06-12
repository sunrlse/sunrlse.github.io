// 相当于computed
export default {
  fullName (state) {
    return `${state.firstName} --- ${state.lastName}`
  }
}
