//about vuex
//you can find greater example in https://vuex.vuejs.org/zh-cn/

const state = {
  count: 0
}

const getters = {
  getCount: (state) => {
    return state.count
  }
}

const mutations = {
  increment (state) {
    state.count++
  }
}

const actions= {
  increment_a (context) {
    context.commit('increment')
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}