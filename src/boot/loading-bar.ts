import { boot } from 'quasar/wrappers';
import { LoadingBar } from 'quasar';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async (/* { app, router, ... } */) => {
  LoadingBar.setDefaults({
    color: 'indigo',
    size: '3px',
    position: 'top',
  });
});
