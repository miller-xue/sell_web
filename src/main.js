import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';
import goods from 'components/content/goods/goods';
import ratings from 'components/content/ratings/ratings';
import seller from 'components/content/seller/seller';

import 'common/stylus/index.styl';
Vue.use(VueRouter);

let app = Vue.extend(App);

let router = new VueRouter({
  linkActiveClass: 'active'
});
router.map({
  '/goods': {
    component: goods
  },
  'ratings': {
    component: ratings
  },
  'seller': {
    component: seller
  }
});
router.start(app, '#app');
router.go('/goods');
// /* eslint-disable no-new */
// new Vue({
//   el: 'body', // 挂载body下
//   components: {App}
// });
