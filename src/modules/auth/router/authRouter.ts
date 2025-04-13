import { RouteRecordRaw } from 'vue-router';
import { isAuthenticatedGuard } from '../guards/authGuard';

const routes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'home',
    beforeEnter: [isAuthenticatedGuard],
    component: () => import('src/modules/common/views/common-home.vue'),
  },
];

export default routes;
