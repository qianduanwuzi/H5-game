/**
 * 活动规则、我的奖品、排行榜弹窗
 * author chennan
 * date 9/25
 * date 10/17 按需
 */
// import FlatDialog from './FlatDialog.vue'
const FLATDIALOG = {};

// 注册
FLATDIALOG.install = function(Vue) {
  // // 构造器
  // const FlatDialogConstructor = Vue.extend(FlatDialog)
  // // 实例
  // const instance = new FlatDialogConstructor()
  // // 挂载
  // instance.$mount(document.createElement('div'));
  // // 添加到body
  // document.body.appendChild(instance.$el);
  // 核心业务处理
  // const fd_main = {
  //   instance: instance,
  //   open(options) {
  //     instance.open(options)
  //   }
  // }
  const fd_main = {
    instance: null,
    open(options) {
      import('./FlatDialog.vue').then(FlatDialog => {
         // 构造器
          const FlatDialogConstructor = Vue.extend(FlatDialog.default)
          // 实例
          const instance = new FlatDialogConstructor()
          this.instance = instance
          // 挂载
          instance.$mount(document.createElement('div'));
          // 删除旧的
          if(document.querySelector('.flat_dialog_container'))  document.body.removeChild(document.querySelector('.flat_dialog_container'))
          // 添加到body
          document.body.appendChild(instance.$el);
          instance.open(options)
      })
    }
  }
  Vue.prototype.$flatDialog = fd_main
  // options title: 弹窗title , temName: 模板name（bg-url）, callback: 弹窗关闭的回调
  // 使用 this.$flatDialog.open({title: '活动规则', temName: 'xxx', callback: () => {}})
} 

export default FLATDIALOG
