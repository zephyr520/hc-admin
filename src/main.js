// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import './common/stylus/index.styl' // 全局引入公共样式
import './assets/theme/theme-green/index.css'
import 'font-awesome/css/font-awesome.min.css'
import axios from './api/http'
import { getToken, Error, Success } from './common/js/uilt'
import './api'
import config from './config'
Vue.prototype.$config = config

// 将axios挂载到prototype上，那么组件就可以直接使用this.axios使用
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(ElementUI)
NProgress.configure({showSpinner: false})

// 利用router的beforeEach方法检测sessionStorege中是否存在token 检测用户登陆
router.beforeEach(({ meta, path }, from, next) => {
  let {auth = true} = meta
  const msg = '您还未获取权限，请登录'
  let isLogin = Boolean(getToken()) // true用户已登录， false用户未登录
  if (auth && !isLogin && path !== '/login') {
    Error(msg)
    return next({ path: '/login' })
  }
  NProgress.start()
  next()
})
router.afterEach(function (transition) {
  NProgress.done()
})

// 设置全局的消息提示框
Vue.prototype.$error = Error
Vue.prototype.$success = Success

/* eslint-disable no-new */
new Vue({
  // el: '#app',
  router,
  render: h => h(App)
}).$mount('#app')
