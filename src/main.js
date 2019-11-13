// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store.js'
import API from './assets/config/api'
import dateFormat from './assets/tool/date'
import elementUI from 'element-ui'
import axios from './assets/config/http'
import './assets/config/mock/index'

import './assets/css/font/ofont/iconfont.css';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;

Vue.use(elementUI);

Vue.prototype.$axios = axios;
Vue.prototype.$api = API;
Vue.prototype.$dateFormat = dateFormat;

//   ak: '5Btum5dZ1Yg93cIGPoOZD41u0DZTrNoo'

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})