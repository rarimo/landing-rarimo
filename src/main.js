import '@/styles/index.scss';

import { initLocalization } from '@/localization';
import { defineDesktopFontSizes, hideLoader, initSwiper } from '@/js';

const setup = () => {
  initLocalization();

  setTimeout(() => {
    hideLoader();
    initSwiper();
    defineDesktopFontSizes();
  }, 500);
};

setup();
