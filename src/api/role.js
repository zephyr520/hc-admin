import http from './http'
const perfix = 'hc-admin'

// 获取所有用户角色列表
export const allRoleList = (params) => http.get(`/${perfix}/admin/role/all/list`)
