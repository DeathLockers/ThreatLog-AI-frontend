import { RouteRecordRaw } from 'vue-router';
import { isAuthenticatedGuard } from 'src/modules/auth/guards/authGuard';

const routes: RouteRecordRaw[] = [
  {
    path: '/logs/:datetime?',
    name: 'log-list',
    beforeEnter: [isAuthenticatedGuard],
    component: () => import('src/modules/log/views/log-list.vue'),
    props: (route: { params: { datetime?: string } }) => ({
      datetime: route.params.datetime ? decodeURIComponent(route.params.datetime) : '',
    }),
  },
];

export default routes;
