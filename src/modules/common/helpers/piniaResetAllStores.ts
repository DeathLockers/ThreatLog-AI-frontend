import { Pinia, Store, getActivePinia } from 'pinia';

interface ExtendedPinia extends Pinia {
  _s: Map<string, Store>;
}

const piniaResetAllStores = () => {
  const pinia = getActivePinia() as ExtendedPinia;
  pinia._s.forEach((store) => store.$reset());
};

export default piniaResetAllStores;
