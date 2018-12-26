/**
 * Created by code_Xiao on 2017/9/1.
 */

import axios from 'axios'
import router from '../router'
import { MessageBox } from 'element-ui'
import { getToken, Error, BackToLogin } from '../common/js/uilt'

// pageid对象，用于存储每个请求的生成的id
const pageIdObj = {}
// 创建axios实例
const service = axios.create({
  timeout: 50000 // 请求超时时间
})

service.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

service.interceptors.request.use(config => {
  let token = getToken()
  // Do something before request is sent
  if (token !== '') {
    config.headers['x-auth-token'] = getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  }
  // pageid 防止重复提交，请求未返回时不变更，返回后变更
  pageIdObj[config.url] = pageIdObj[config.url] ? pageIdObj[config.url] : (new Date()).getTime()
  config.headers['pageId'] = pageIdObj[config.url]

  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})
service.interceptors.response.use(
  response => {
    // 请求返回后,改变pageid
    pageIdObj[response.config.url] = (new Date()).getTime()
    let res = response
    let retcode = res.data.retCode
    switch (retcode) {
      case 200:
        return res
      case 400:
        BackToLogin('登录超时，请重新登录')
        break
      case 401:
        BackToLogin('非法Token，请重新登录')
        break
      case 411:
        BackToLogin('系统检测到您已在其它登录, 账号被踢下线, 请重新登陆')
        break
      case 412:
        BackToLogin('账户未登录, 请登陆后操作')
        break
      case 402:
        router.go(-1)
        Error('该接口没有权限访问')
        break
      default:
        return res
    }
  },
  error => {
    console.log('err' + error)// for debug
    MessageBox('赶紧联系开发小朋友,报错啦~ 先暂停会使用吧！', '系统提示', { confirmButtonText: '我晓得啦', cancelButtonText: '取消', type: 'warning'
    })
    return Promise.reject(error)
  }
)
export default service
