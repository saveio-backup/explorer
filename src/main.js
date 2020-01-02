// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store/store.js';
import API from './assets/config/api';
import dateFormat from './assets/tool/date';
import elementUI from 'element-ui';
import axios from './assets/config/http';
import './assets/config/mock/index';

import './assets/css/font/ofont/iconfont.css';
import 'element-ui/lib/theme-chalk/index.css';
import api from './api/index';

import locale from 'element-ui/lib/locale';
import LocalEn from './assets/config/i18n/en/index'
import LocalZh from './assets/config/i18n/zh/index'
import VueI18n from 'vue-i18n'

Vue.config.productionTip = false;

Vue.use(elementUI);

// Import component
import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';
// Init plugin
Vue.use(Loading);


Vue.prototype.$axios = axios;
Vue.prototype.$api = API;
Vue.prototype.$api2 = new api();
Vue.prototype.$dateFormat = dateFormat;

// multi-language
Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: localStorage.getItem("lang") || 'en',
  messages: {
    en: LocalEn,
    zh: LocalZh
  }
})

locale.i18n((key, value) => i18n.t(key, value)) //为了实现element插件的多语言切换


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: {
    App
  },
  template: '<App/>'
})
