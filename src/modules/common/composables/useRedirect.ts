import { Router, useRouter } from 'vue-router';

const useRedirect = () => {
  const router: Router = useRouter();

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
  };
};

export default useRedirect;
