import UI from 'element-ui';
import vueResource from 'vue-resource';
import VueCookies from 'vue-cookies';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.use(UI);
Vue.use(vueResource);
Vue.use(VueCookies);

VueCookies.config('1d');

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
