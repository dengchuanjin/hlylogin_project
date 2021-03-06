// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import router from './router'
import App from './App'
import '@/assets/css/reset.css'
import axios from 'axios'
import store from './store/index'
import VueScroller from 'vue-scroller'
Vue.use(VueScroller)
Vue.use(VueRouter)

import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad,{
  error:'../static/img/error.jpg',
  loading:'../static/img/loading.gif'
});
Vue.prototype.$http = axios;

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
