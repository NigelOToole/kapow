import Vue from 'vue';
import Router from 'vue-router';

import characterList from '@/components/character-list';
import characterDetail from '@/components/character-detail';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: characterList
    },
    {
      name: 'characterDetail',
      path: '/char/:id',
      component: characterDetail,
      props: true
    }
  ]
  // mode: 'history',
  // scrollBehavior (to, from, savedPosition) {
  //   if (savedPosition) {
  //     return savedPosition;
  //   } else {
  //     return { x: 0, y: 0 };
  //   }
  // }
});
