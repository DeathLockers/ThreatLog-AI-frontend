import { RouteRecordRaw } from 'vue-router';
import authRouter from '../modules/auth/router/authRouter';
import logRouter from '../modules/log/router/logRouter';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'mainlayout',
    component: () => import('../modules/common/views/common-mainlayout.vue'),
    children: [
      //Auth
      ...authRouter,
      //Log
      ...logRouter,
    ],
  },

  {
    path: '/login',
    name: 'login',
    component: () => import('../modules/auth/views/auth-login.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    name: 'not-found',
    //component: () => import('../modules/common/views/common-error404.vue'),
    redirect() {
      return { name: 'home', params: {} };
    },
  },

  {
    path: '/error/403',
    name: 'forbidden',
    //component: () => import('../modules/common/views/common-error403.vue'),
    redirect() {
      return { name: 'home', params: {} };
    },
  },
];

export default routes;
