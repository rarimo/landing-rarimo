import '@/styles/index.scss';

import { initLocalization } from '@/localization';
import { hideLoader, initSwiper } from '@/js';

const setup = () => {
  initLocalization();

  setTimeout(() => {
    hideLoader();
    initSwiper();
  }, 500);
};

setup();
