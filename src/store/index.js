import Vue from 'vue'
import Vuex from 'vuex'
import movies from './modules/movies'
import description from './modules/description'
import cinemadetails from './modules/cinemadetails'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    movies,
    description,
    cinemadetails
  }
})
