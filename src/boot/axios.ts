import { defineBoot } from '#q-app/wrappers';
import axios, { type AxiosInstance, AxiosRequestHeaders } from 'axios';
import { LocalStorage, Loading } from 'quasar';
import { getEnvAxiosBaseUrl } from '../modules/common/helpers/getEnv';

declare module 'vue' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
let api: AxiosInstance | null = null;

export default defineBoot(async ({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api
  const axiosBaseUrl = await getEnvAxiosBaseUrl();
  api = axios.create({ baseURL: `${axiosBaseUrl}/` });

  api.interceptors.request.use((config) => {
    config.headers = {
      Authorization: LocalStorage.getItem('token'),
      Accept: 'application/json',
    } as AxiosRequestHeaders;

    config.headers['Accept-Language'] = LocalStorage.getItem('language');

    return config;
  });

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      const { status } = error.response;
      if (LocalStorage.has('token') && status === 401 /*UNAUTHORIZED*/) {
        Loading.hide(); //To avoid a loading that has not been closed.
      }
      return Promise.reject(error);
    }
  );
});

export { api };
