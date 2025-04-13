import { route } from 'quasar/wrappers';
import { computed } from 'vue';
import { Router, useRoute, useRouter } from 'vue-router';

const useRedirect = () => {
  const router: Router = useRouter();
  const route = useRoute()

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
  //End Redirects

  return {
    //Methods
    redirectHome,
    redirectLogin,

    //Variables
    routeName: computed<string>(() => route.name as string)
  };
};

export default useRedirect;
