<template>
  <div>
      <Header title="我的喵喵"></Header>
      <Login></Login>
      <tar-bar></tar-bar>
  </div>
</template>

<script>
import Header from '@/components/Header'
import TarBar from '@/components/TarBar'
import Login from '@/components/Login'


export default {
  name: 'Mine',
  components: {
    Header,
    TarBar,
    Login
  },
  created () {
    console.log('我是喵喵');
    this.$axios.get('http://127.0.0.1:8000/car_info_base/')
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
      console.log('错了');
    })
  }
}
</script>

<style>

</style>