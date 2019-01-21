import http from './http'
const perfix = 'hc-admin'

// 获取回收单列表
export const queryRecyclingList = (params) => http.post(`/${perfix}/back/recycling/list/page`, params)

// 对回收单派单
export const dispatchRecyclingList = (params) => http.post(`/${perfix}/back/recycling/list/dispatch`, params)

// 查看派单记录
export const queryRecyclingDispatchRecordList = (recyclingNo) => http.get(`/${perfix}/back/recycling/${recyclingNo}/dispatch/list`)

// 回收单导入
export const recyclingListImport = (params) => http.post(`/${perfix}/back/recycling/list/import`, params)

// 删除回收单
export const deleteRecyclingList = (recyclingNo) => http.post(`/${perfix}/back/recycling/list/${recyclingNo}/delete`)
