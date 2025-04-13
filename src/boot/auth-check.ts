import { boot } from 'quasar/wrappers';
import { useAuthStore } from 'src/modules/auth/stores/authStore';
import { Loading, LocalStorage } from 'quasar';

export default boot(async ({ }) => {
  if (LocalStorage.has('token')) {
    //loggedStatus
    const authStore = useAuthStore();

    Loading.show({
      spinnerSize: 150,
      spinnerColor: 'indigo',
      message: 'Loading...',
    });

    await authStore.check();

    Loading.hide();
  }
});
