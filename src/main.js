import Vue from 'vue';
import App from './App';
import router from './router';

// 引入vuex数据存储
import store from './store/index';
// element-ui引入
import './utils/element';
// 引入重置样式表
import './assets/css/reset.css';
// 引入axios的封装代码
import './utils/http';
// 配置图片基础域名
Vue.prototype.$imgBaseUrl='http://localhost:3000';

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  // 挂载子模块数据存储对象
  store
})
