import { RouteRecordRaw } from 'vue-router';
import { isAuthenticatedGuard } from 'src/modules/auth/guards/authGuard';

const routes: RouteRecordRaw[] = [
  {
    path: '/logs',
    name: 'log-list',
    beforeEnter: [isAuthenticatedGuard],
    component: () => import('src/modules/log/views/log-list.vue'),
  },
];

export default routes;
