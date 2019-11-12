import Vue from 'vue'
import VueRouter from 'vue-router'
import movieRouter from './movie'
import mineRouter from './mine'
import cinemaRouter from './cinema'

Vue.use(VueRouter)

const routes = [
  movieRouter,
  mineRouter,
  cinemaRouter,
  {
    path: '/*',   // 当你输入一个错的url地址，会自动跳转到 /movie 的页面
    redirect: '/movie/nowPlaying'
  }
 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
