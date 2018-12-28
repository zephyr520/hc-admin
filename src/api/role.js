import http from './http'
const perfix = 'hc-admin'

// 获取所有用户角色列表
export const allRoleList = (params) => http.get(`/${perfix}/admin/role/all/list`)

// 分页查询用户角色信息
export const queryRoleList = (params) => http.post(`/${perfix}/admin/role/list`, params)
