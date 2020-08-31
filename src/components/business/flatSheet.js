/**
 * 扁平风格弹窗
 * author chennan
 * data 9/16
 * data 10/17 按需加载
 */
// import Vue from 'vue'
// import FlatSheet from './FlatSheet.vue'
const FLATSHEET = {};

// 注册扁平风格弹窗
FLATSHEET.install = function(Vue) {
  // 构造器
  // const FlatSheetConstructor = Vue.extend(FlatSheet)
  // // 实例
  // const instance1 = new FlatSheetConstructor()
  // console.log('16', instance1)
  // // 挂载
  // instance.$mount(document.createElement('div'));
  // // 添加到body
  // document.body.appendChild(instance.$el);
  // // 核心业务处理
  // const fs_main = {
  //   instance: instance,
  //   open(options) {
  //     instance.open(options)
  //   }
  // }
  const Bus = Vue.extend({
    template: '',
    data: function () {
      return {
        show: false,
      }
    }
  })
   const fs_main = {
    instance: new Bus(),
    open(options) {
      import('./FlatSheet.vue').then(FlatSheet => {
        // 构造器
      const FlatSheetConstructor = Vue.extend(FlatSheet.default)
      // // 实例
      const instance = new FlatSheetConstructor()
      this.instance.show = true
      instance.$mount(document.createElement('div'));
      // 删除旧的
      if(document.querySelector('.flat_sheet_container'))  document.body.removeChild(document.querySelector('.flat_sheet_container'))
      // 添加到body
      document.body.appendChild(instance.$el);
      instance.open(options)
      })
    }
  }
  Vue.prototype.$flatSheet = fs_main
  // options tipId: 类型, msg: 奖品名, giftID: 奖品id, callback: 弹窗关闭的回调(或者监听弹窗show)
  // 使用 this.$flatSheet.open({tipId: 1, msg: 'iphone', giftId: 123456 callback: () => {}})
} 

export default FLATSHEET
