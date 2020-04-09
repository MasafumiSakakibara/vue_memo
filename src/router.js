import Vue from 'vue';
import Router from 'vue-router';
import Memo from './views/Memo';
import Login from './views/Login';
import SignUp from './views/SignUp';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Memo,
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/signup',
      component: SignUp,
    },
  ],
});
