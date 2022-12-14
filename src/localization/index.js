import i18n from 'i18next';

import resources from '@/localization/resources';

const STORAGE_KEY = 'rarimo-web-lending-lang';
const DEFAULT_LOCALE = 'en';

const locale = localStorage?.getItem(STORAGE_KEY) ?? DEFAULT_LOCALE;

export const initLocalization = () => {
  i18n.init(
    {
      fallbackLng: locale,
      lng: locale,
      resources,
    },
    function (err, t) {
      const refs = document.querySelectorAll('[data-i18n]');
      [...refs].forEach(ref => {
        ref.innerHTML = t(ref.dataset.i18n);
      });
    },
  );
};

export default i18n;
