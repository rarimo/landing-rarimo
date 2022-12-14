import '@/styles/index.scss';

import { initLocalization } from '@/localization';
import '@/js';
import { hideLoader } from '@/js/init-loader';

const setup = () => {
  initLocalization();

  setTimeout(() => {
    hideLoader();
  }, 500);
};

setup();
