import { LocalStorage, Quasar } from 'quasar';

// relative path to your node_modules/quasar/..
// change to YOUR path
const langList = import.meta.glob('../../node_modules/quasar/lang/*.js');
// or just a select few (example below with only DE and FR):
// import.meta.glob('../../node_modules/quasar/lang/(de|fr).js')

export default async () => {
  const langIso = LocalStorage.getItem('language') ?? 'en-US';

  try {
    const langModule = langList[`../../node_modules/quasar/lang/${langIso}.js`];

    if (langModule)
      langModule().then((lang) => {
        const typedLang = lang as { default: any };
        Quasar.lang.set(typedLang.default);
      });
  } catch (err) {
    // Requested Quasar Language Pack does not exist,
    // let's not break the app, so catching error
  }
};
