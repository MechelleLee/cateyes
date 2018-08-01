import Vue from 'vue'
import Router from 'vue-router'

import Movies from '../components/Movies.vue'
import Cinema from '../components/Cinema.vue'
import Description from '../components/Description.vue'
import Cinemadetails from '../components/Cinemadetails.vue'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    // {
    //   path: '/',
    //   name: 'Hello',
    //   component: HelloWorld
    // }
    {path: '/movies', name: 'movies', component: Movies},
    {path: '/cinema', name: 'cinema', component: Cinema},
    {path: '/description', name: 'description', component: Description},
    {path: '/cinemadetails', name: 'cinemadetails', component: Cinemadetails}
  ]
})
