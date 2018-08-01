import * as types from '../mutation-types'

const state = {
  description: {}
}

const getters = {
  getData: state => state.description
}

const mutations = {
  [types.SEND_DATA] (state, data) {
    state.description = data
  }
}

export default {
  state,
  getters,
  mutations
}
