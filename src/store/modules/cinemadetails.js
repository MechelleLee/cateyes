import * as types from '../mutation-types'

const state = {
  desData: {}
}

const getters = {
  getDesData: state => state.desData
}

const mutations = {
  [types.UL_TRANSLATE] (state, {ul, el, width, height, index}) {
    for (let i = 0; i < el.length; i++) {
      el[i].style.width = width / 4 + 'px'
      el[i].style.height = height / 5 + 'px'
      el[i].style.border = ''
    }
    el[index].style.width = width / 3.5 + 'px'
    el[index].style.height = height / 4.5 + 'px'
    el[index].style.border = '2px solid white'
    let elWidth = parseFloat(el[index].style.width)
    ul.style.transform = 'translateX(' + ((width - elWidth) / 2 - elWidth * index - index * 1.25 - 4) + 'px)'
  },
  [types.SEND_DESDATA] (state, data) {
    state.desData = data
    // console.log(data)
  }
}

export default {
  state,
  getters,
  mutations
}
