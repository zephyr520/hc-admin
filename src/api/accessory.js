import http from './http'
const perfix = 'hc-admin'

// 分页获取配件列表
export const queryRecyclingAccessoryList = (params) => http.post(`/${perfix}/back/recycling/accessory/list`, params)

// 标记 or 撤销配件回收失败 /back/recycling/accessory/failure
export const accessoryRecyclingFailure = (params) => http.post(`/${perfix}/back/recycling/accessory/failure`, params)

// 配件回收是否需要拍照
export const accessoryTakePhoto = (params) => http.post(`/${perfix}/back/recycling/accessory/take/photo`, params)

// 配件标记为已回收
export const accessoryHasRecycled = (id) => http.post(`/${perfix}/back/accessory/${id}/has/recycled`)

// 配件撤销回收
export const accessoryCancelRecycled = (id) => http.post(`/${perfix}/back/accessory/${id}/cancel/recycled`)

// 配件标记入库
export const accessoryHasStorage = (id) => http.post(`/${perfix}/back/accessory/${id}/has/storage`)

// 配件撤销入库
export const accessoryCancelStorage = (id) => http.post(`/${perfix}/back/accessory/${id}/cancel/storage`)

// 配件图片保存
export const accessoryImageSave = (params) => http.post(`/${perfix}/accessory/file/create`, params)

// 配件图片上传
export const accessoryImageUpload = (params) => http.post(`/${perfix}/accessory/image/upload`, params)

// 删除配件
export const accessoryDelete = (id) => http.post(`/${perfix}/back/accessory/${id}/delete`)
