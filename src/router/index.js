import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/home/Home'
import User from '@/components/user/User'
import Wellcome from '@/components/home/Wellcome'
import Role from '@/components/role/Role'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'Login', component: Login, meta: { auth: false } },
    { path: '/login', name: 'Login', component: Login, meta: { auth: false } },
    {
      path: '/home',
      name: '首页',
      component: Home,
      meta: {
        auth: true // 添加该字段，表示进入这个路由是需要登录的
      },
      children: [
        { path: '/wellcome', component: Wellcome, name: '欢迎页' },
        { path: '/app/role', component: Role, name: '角色列表' },
        { path: '/app/user', component: User, name: '用户列表' }
      ]
    }
  ]
})
