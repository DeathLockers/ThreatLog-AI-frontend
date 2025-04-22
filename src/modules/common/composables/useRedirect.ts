import { route } from 'quasar/wrappers';
import { computed } from 'vue';
import { Router, useRoute, useRouter } from 'vue-router';

const useRedirect = () => {
  const router: Router = useRouter();
  const route = useRoute();

  //Redirects
  const redirectHome = (): void => {
    router.push({
      name: 'home',
    });
  };

  const redirectLogin = (): void => {
    router.push({
      name: 'login',
    });
  };

  const redirectListLogs = (datetime: string) => {
    datetime = String(encodeURIComponent(datetime));
    router.push({ name: 'log-list', params: { datetime } });
  };
  //End Redirects

  return {
    //Methods
    redirectHome,
    redirectLogin,
    redirectListLogs,

    //Variables
    routeName: computed<string>(() => route.name as string),
  };
};

export default useRedirect;
