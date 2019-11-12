<template>
  <div>
      <Header title="喵喵电影"></Header>
      <div id="content"> 
        <!-- 电影页面的菜单栏 开始 -->
        <div class="movie_menu">
          <router-link tag="div" :to="{ name: 'city' }" class="city_name">
            <span>大连</span><i class="iconfont icon-lower-triangle"></i>
          </router-link>
          <div class="hot_swtich">
            <router-link tag="div" :to="{ name: 'nowPlaying' }" class="hot_item">正在热映</router-link>
            <router-link tag="div" :to="{ name: 'comingSoon' }" class="hot_item">即将上映</router-link>
          </div>
          <router-link tag="div" :to="{ name: 'search' }" class="search_entry">
            <i class="iconfont icon-sousuo"></i>
          </router-link>
        </div>
        <!-- 电影页面的菜单栏 结束 -->

        <keep-alive>
          <router-view></router-view>
        </keep-alive>
        
      </div>
      <tar-bar></tar-bar>
  </div>
</template>

<script>
import Header from '@/components/Header'
import TarBar from '@/components/TarBar'


export default {
  name: 'Movie',
  components: {
    Header,
    TarBar
  }
}
</script>

<style scoped>

</style>