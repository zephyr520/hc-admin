import Vue from 'vue'

Vue.directive('access', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el, binding) {
    const accessList = JSON.stringify(sessionStorage.getItem('accessList'))
    if (accessList.indexOf(binding.value) <= -1) {
      const parent = el.parentNode
      parent.removeChild(el)
    }
  }
})
