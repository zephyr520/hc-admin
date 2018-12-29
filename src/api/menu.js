import http from './http'
const perfix = 'hc-admin'

// 获取已授权的用户菜单
export const listAuthMenu = () => http.get(`/${perfix}/admin/menu/auth/list`)

// 所有菜单信息列表
export const listAllMenu = () => http.get(`/${perfix}/admin/menu/all/list`)

// 获取已授权的菜单ID列表
export const authMenuIdList = (roleId) => http.get(`/${perfix}/admin/menu/${roleId}/auth/list`)
