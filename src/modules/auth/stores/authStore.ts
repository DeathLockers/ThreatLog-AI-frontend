import { computed, ref, reactive } from 'vue';
import { defineStore } from 'pinia';
import { LocalStorage } from 'quasar';
import { AxiosError } from 'axios';
import { api } from 'boot/axios';
import type { MessageError } from 'src/modules/common/interfaces/commonInterface';
import type { LoginForm, UserAuthBackend, UserAuth } from '../interfaces/authInterface';
import piniaResetAllStores from 'src/modules/common/helpers/piniaResetAllStores';
import { PrefixPath } from 'src/modules/common/enums/prefixPathEnum';

export const useAuthStore = defineStore('auth', () => {
  //State
  const userAuthBackendInitial: UserAuthBackend = { id: '', name: '', email: '' };

  const isLogged = ref<boolean | null>(false);
  let userAuthBackend = reactive<UserAuthBackend>(userAuthBackendInitial);
  const prefixPathAuth = ref<string>(PrefixPath.AUTH);
  //End State

  //Getters
  const userAuth = computed<UserAuth>(() => {
    return {
      id: userAuthBackend.id ?? '',
      email: userAuthBackend.email ?? '',
      name: userAuthBackend.name ?? '',
    };
  });
  //End Getters

  //Actions
  const check = async (): Promise<void> => {
    try {
      const { data } = await api.get<UserAuth>(`${prefixPathAuth.value}/me`);
      setCheck(data);
    } catch (error) {
      setLogout();
    } finally {
    }
  };

  const login = async (credentials: LoginForm): Promise<void | string> => {
    try {
      const { data } = await api.post<UserAuth>(`${prefixPathAuth.value}/login`, credentials);
      setLogin(data);
    } catch (error) {
      const err = error as AxiosError<MessageError>;
      return err.response?.data?.message;
    } finally {
    }
  };

  const logout = async (): Promise<void> => {
    setLogout();
  };
  //End Actions

  //Setters
  const setCheck = (data: UserAuth): void => {
    isLogged.value = !!data?.id;
    if (!isLogged.value) {
      LocalStorage.remove('token');
      userAuthBackend = userAuthBackendInitial;
    } else {
      LocalStorage.set('token', data.token);
      userAuthBackend = data;
      userAuthBackend.token = null;
    }
  };

  const setLogin = (data: UserAuthBackend): void => {
    isLogged.value = true;
    LocalStorage.set('token', data.token);
    userAuthBackend = data;
    userAuthBackend.token = null;
  };

  const setLogout = (): void => {
    isLogged.value = false;
    userAuthBackend = userAuthBackendInitial;
    piniaResetAllStores();
    LocalStorage.remove('token');
  };

  const $reset = (): void => {
    isLogged.value = false;
    userAuthBackend = userAuthBackendInitial;
  };
  //End Setters

  return {
    //State
    isLogged,

    //Getters
    userAuth,

    //Actions
    check,
    login,
    logout,

    //Setters
    setCheck,
    setLogin,
    setLogout,
    $reset,
  };
});
