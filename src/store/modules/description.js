import * as types from '../mutation-types'

const state = {
  star: [],
  ratStar: {}
}

const getters = {
  sendStar: state => state.star,
  sendRatStar: state => state.ratStar
}

const mutations = {
  [types.SEND_SC] (state, {el, des}) {
    state.star = []
    let on = parseInt(des.detailMovie.sc / 2)
    let half = des.detailMovie.sc % 2
    let off = 5 - Math.ceil(des.detailMovie.sc / 2)
    for (let i = 0; i < on; i++) {
      state.star.push('on')
    }
    if (half >= 0.5) {
      state.star.push('half')
    } else {
      state.star.push('off')
    }
    for (let i = 0; i < off; i++) {
      state.star.push('off')
    }
    // console.log(state.star)
  },
  [types.SEND_RATSTAR] (state, data) {
    for (let i = 0; i < data.length; i++) {
      let starArr = []
      let on = parseInt(data[i].score)
      let half = data[i].score % 1
      let off = 5 - Math.ceil(data[i].score)
      for (let j = 0; j < on; j++) {
        starArr.push('on')
      }
      if (half >= 0.5) {
        starArr.push('half')
      }
      for (let j = 0; j < off; j++) {
        starArr.push('off')
      }
      state.ratStar[i] = starArr
    }
  }
}

export default {
  state,
  getters,
  mutations
}
