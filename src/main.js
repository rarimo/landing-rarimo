import '@/styles/index.scss';

import { initLocalization } from '@/localization';
import {
  defineDesktopFontSizes,
  hideLoader,
  initParallax,
  initSwiper,
} from '@/js';

const setup = () => {
  initLocalization();

  setTimeout(() => {
    hideLoader();
    defineDesktopFontSizes();
    initParallax();
    initSwiper();
  }, 500);
};

setup();
