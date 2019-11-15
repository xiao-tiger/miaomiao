import Vue from 'vue'
import App from './App.vue'
// 说明：一个文件下，出现 index.js 就会默认被导入，不需要写 ./router/index.js
// './router' 就会把 ./router/index.js 导入
import router from './router'
import store from './store'
import axios from 'axios'
import './registerServiceWorker'

Vue.config.productionTip = false
Vue.prototype.$axios = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
