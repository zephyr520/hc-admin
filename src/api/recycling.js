import http from './http'
const perfix = 'hc-admin'

// 获取回收单列表
export const queryRecyclingList = (params) => http.post(`/${perfix}/back/recycling/list/page`, params)

// 对回收单派单
export const dispatchRecyclingList = (params) => http.post(`/${perfix}/back/recycling/list/dispatch`, params)
