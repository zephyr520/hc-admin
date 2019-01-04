import http from './http'
const perfix = 'hc-admin'

// 分页获取配件列表
export const queryRecyclingAccessoryList = (params) => http.post(`/${perfix}/back/recycling/accessory/list`, params)
