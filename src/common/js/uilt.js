import { Message, Notification } from 'element-ui'
import router from '../../router'

// 从sessionStorage 中获取token
export function getToken () {
  return JSON.parse(sessionStorage.getItem('token'))
}

// 成功提示
export function Success (msg) {
  Message({
    message: msg,
    type: 'success',
    duration: 3 * 1000
  })
}

// 错误提示
export function Error (msg) {
  Message({
    message: msg,
    type: 'error',
    duration: 3 * 1000
  })
}
// token过期,直接返回登陆界面，清除token
export function BackToLogin (msg) {
  Notification({
    title: '警告',
    message: msg,
    type: 'warning',
    duration: 2000
  })
  sessionStorage.removeItem('token')
  router.push({path: '/login'})
}

// 时间处理函数
export function returnDate (val) {
  if (val === '') {
    return false
  }
  // console.log(val)
  let timesmap = val.split('-')
  //   stratTime = timesmap[0] + '/' + timesmap[1] + '/' + timesmap[2].replace(/(^\s*)|(\s*$)/g, ""),
  //   endTime = timesmap[3].replace(/(^\s*)|(\s*$)/g, "")+ '/'+timesmap[4]+'/'+timesmap[5];
  // if(stratTime===endTime){
  //   /**
  //    * 判断如果两个时间相等时 返回的时间格式是：2017-09-10 00：00：00 - 2017-09-10 00：00：00
  //    * 那么此时如果筛选区间为当天的时间区间这时就会出现筛选的bug需要把后面的那个00：00：00改为23：59：59
  //    * 每天的00：00：00为当天时间的开始时间23：59：59为当天时间的结束时间
  //    */
  //   let tm = timesmap[5].split(' '),
  //     timeds = tm[1];
  //   if(timeds=='00:00:00'){
  //     timeds = '23:59:59';
  //   }
  //   endTime = timesmap[3].replace(/(^\s*)|(\s*$)/g, "")+ '/'+timesmap[4]+'/'+tm[0]+' '+timeds;
  //
  // }
  let startTime = timesmap[0] + '-' + timesmap[1] + '-' + timesmap[2]
  let endTime = timesmap[3] + '-' + timesmap[4] + '-' + timesmap[5]
  return {startTime, endTime}
  // console.log(stratTime,endTime)
}

// 只包含字母
export function isAlpha (input) {
  return /^[a-z]+$/i.test(input)
}
// 只包含字母、空格
export function isAlphaSpace (input) {
  return /^[a-z\s]*$/i.test(input)
}
// 只包含字母、数字
export function isAlphanumeric (input) {
  return /^[a-z0-9]+$/i.test(input)
}
// 只包含字母、数字和空格
export function isAlphanumericSpace (input) {
  return /^[a-z0-9\s]*$/i.test(input)
}
// 数字
export function isNumeric (input) {
  return /^(?:[1-9]\d*|0)(?:\.\d+)?$/.test(input)
}
// 小数
export function isDecimal (input) {
  return /^[-+]?(?:0|[1-9]\d*)\.\d+$/.test(input)
}
// 负小数
export function isNegativeDecimal (input) {
  return /^\\-(?:0|[1-9]\d*)\.\d+$/.test(input)
}
// 正小数
export function isPositiveDecimal (input) {
  return /^\+?(?:0|[1-9]\d*)\.\d+$/.test(input)
}
// 整数
export function isInteger (input) {
  return /^[-+]?(?:0|[1-9]\d*)$/.test(input)
}
// 正整数
export function isPositiveInteger (input) {
  return /^\+?(?:0|[1-9]\d*)$/.test(input)
}
// 负整数
export function isNegativeInteger (input) {
  return /^\\-(?:0|[1-9]\d*)$/.test(input)
}
// 是否有子菜单
export const hasSubMenus = (item) => {
  return item.subMenus && item.subMenus.length > 0
}
