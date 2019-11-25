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
}
</script>

<style>

</style>