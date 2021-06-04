import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import homeArticle from '../components/homeArticle.vue'
import homeDetails from '../components/homeDetails.vue'
import Admin from '../views/Admin.vue'
import AticleList from '../components/admin/AticleList.vue'
import NewList from '../components/admin/NewList.vue'
import Authority from '../components/admin/Authority.vue'
import NewCategory from '../components/admin/NewCategory.vue'
import CategoryList from '../components/admin/CategoryList.vue'
import AdminHome from '../components/admin/AdminHome.vue'
import Login from '../components/admin/login.vue'
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
  {
    path:'/Admin',
    name:'Admin',
    component:Admin,
    children:[
      {
        path:'/AticleList',
        name:'AticleList',
        component:AticleList
      },
      {
        path:'/NewList',
        name:'NewList',
        component:NewList
      },
      {
        path:'/Authority',
        name:'Authority',
        component:Authority
      },
      {
        path:'/NewCategory',
        name:'NewCategory',
        component:NewCategory
      },
      {
        path:'/CategoryList',
        name:'CategoryList',
        component:CategoryList
      },
      {
        path:'/',
        name:'AdminHome',
        component:AdminHome
      },
    ]
  },
  {
    path:'/Login',
    name:'Login',
    component:Login
  }
]

const router = new VueRouter({
  routes
})

export default router
