import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import homeArticle from '../components/homeArticle.vue'
import homeDetails from '../components/homeDetails.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/',
        name: 'homeArticle',
        component: homeArticle
      },
      {
        path: '/homeDetails/:id',
        name: 'homeDetails',
        component: homeDetails
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
