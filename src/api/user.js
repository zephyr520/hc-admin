import http from './http'
const perfix = 'hc-admin'

// 登录
export const login = (params) => http.post(`/${perfix}/login`, params)

// 退出
export const logout = () => http.post(`/${perfix}/logout`)

// 获取用户信息
export const userInfo = (params) => http.get(`/${perfix}/user/info`)

// 分页查询用户列表
export const queryUserList = (params) => http.post(`/${perfix}/admin/user/list`, params)

// 删除用户
export const deleteUser = (userId) => http.post(`/${perfix}/admin/user/${userId}/delete`)

// 新增用户
export const createUser = (params) => http.post(`/${perfix}/admin/user/create`, params)

// 修改用户
export const modifyUser = (params) => http.post(`/${perfix}/admin/user/modify`, params)

// 获取回收员用户信息列表
export const queryRecyclingUserList = () => http.get(`/${perfix}/admin/user/recycling/list`)
