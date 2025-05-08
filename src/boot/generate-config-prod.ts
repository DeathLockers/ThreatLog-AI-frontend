import { defineBoot } from '#q-app/wrappers';

declare global {
  interface Window {
    APP_AXIOS_BASEURL?: string;
    APP_WS_BASEURL?: string;
  }
}

export default defineBoot(async () => {
  if (process.env.NODE_ENV === 'production') {
    try {
      const response = await fetch('/config.json');
      const config = await response.json();

      window.APP_AXIOS_BASEURL = config.APP_AXIOS_BASEURL;
      window.APP_WS_BASEURL = config.APP_WS_BASEURL;

      // console.log('Configuration loaded from config.json', config);
    } catch (error) {
      // console.error('Error loading config.json:', error);
    }
  }
});
