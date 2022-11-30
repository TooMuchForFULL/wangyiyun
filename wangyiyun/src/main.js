// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {Swipe,SwipeItem,Lazyload,Button,Popup } from 'vant';

import store from './store/index.js'


Vue.use(Swipe);Vue.use(SwipeItem);Vue.use(Lazyload);Vue.use(Button);Vue.use(Popup);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
