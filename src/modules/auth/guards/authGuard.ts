import { LocalStorage } from 'quasar';
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

const isAuthenticatedGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  if (LocalStorage.has('token')) {
    next();
  } else {
    next({ name: 'login' });
  }
};

export { isAuthenticatedGuard };
