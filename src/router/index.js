import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import Home from '../components/Home.vue';
import Registration from '../components/Registration.vue';

Vue.use(VueRouter);
Vue.use(Vuex);

const router = new VueRouter({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
    {
      path: '/auth',
      name: 'auth',
      component: Registration,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.fullPath !== '/auth') {
    const key = window.$cookies.get('isAuth');
    if (key) {
      next();
    } else {
      next('/auth');
    }
  } else {
    next();
  }
});

export default router;
