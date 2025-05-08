const getEnvAxiosBaseUrl = (): string => {
  const appAxiosBaseUrlDefault = 'http://127.0.0.1:8000';
  let appAxiosBaseUrl = '';

  if (process.env.NODE_ENV === 'development') {
    appAxiosBaseUrl = process.env.APP_AXIOS_BASEURL ?? appAxiosBaseUrlDefault;
  } else {
    appAxiosBaseUrl = window.APP_AXIOS_BASEURL ?? appAxiosBaseUrlDefault;
  }

  return appAxiosBaseUrl;
};

const getEnvWsBaseUrl = (): string => {
  const appWsBaseUrlDefault = 'ws://127.0.0.1:8000';
  let appWsBaseUrl = '';

  if (process.env.NODE_ENV === 'development') {
    appWsBaseUrl = process.env.APP_WS_BASEURL ?? appWsBaseUrlDefault;
  } else {
    appWsBaseUrl = window.APP_WS_BASEURL ?? appWsBaseUrlDefault;
  }

  return appWsBaseUrl;
};

export { getEnvAxiosBaseUrl, getEnvWsBaseUrl };
