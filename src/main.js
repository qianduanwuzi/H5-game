import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles/reset.css';
// if(location.host == 'apps.juhewin.com' || location.host == 't.apps.juhewin.com' || location.host == 'wte-apps.juhewin.com') require('./utils/vConsole.js')
import componentsArray from "@/config/components";
componentsArray.forEach(component => {
  Vue.component(component.name, component.instance)
})
// import FlatSheet from './components/business/sheet/flatSheet'
// import FlatDialog from './components/business/dialog/flatDialog'
// // 注册自定义组件
// Vue.use(FlatSheet);
// Vue.use(FlatDialog);
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
