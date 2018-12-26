import http from './http'
const perfix = 'hc-admin'

// 登录
export const login = (params) => http.post(`/${perfix}/login`, params)

// 分页查询用户列表
export const queryUserList = (params) => http.post(`/${perfix}/admin/user/list`, params)
