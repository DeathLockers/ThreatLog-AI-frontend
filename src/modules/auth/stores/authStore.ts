import { ref, readonly } from 'vue';
import { api } from 'boot/axios';
import { defineStore } from 'pinia';
import { LocalStorage } from 'quasar';
import type { MessageError } from 'src/modules/common/interfaces/commonInterface';
import type { LoginForm, UserAuth } from '../interfaces/authInterface';
import { AxiosError } from 'axios';
import piniaResetAllStores from 'src/modules/common/helpers/piniaResetAllStores';

export const useAuthStore = defineStore('auth', () => {
  //State
  const isLogged = ref<boolean | null>(false);
  const userAuth = ref<UserAuth | null>(null);
  const prefixPathAuth = readonly(ref<string>('auth'));
  //End State

  //Getters
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
      userAuth.value = null;
    } else {
      userAuth.value = data;
    }
  };

  const setLogin = (data: UserAuth): void => {
    isLogged.value = true;
    LocalStorage.set('token', data.token);
    userAuth.value = data;
    userAuth.value.token = null;
  };

  const setLogout = (): void => {
    isLogged.value = false;
    userAuth.value = null;
    piniaResetAllStores();
    LocalStorage.remove('token');
  };

  const $reset = (): void => {
    isLogged.value = false;
    userAuth.value = null;
  };
  //End Setters

  return {
    //State
    isLogged,
    userAuth,

    //Getters

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
