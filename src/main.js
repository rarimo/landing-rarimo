import '@/styles/index.scss';

import { initLocalization } from '@/localization';
import {
  defineDesktopFontSizes,
  hideLoader,
  initAOS,
  initParallax,
  initSwiper,
} from '@/js';

const setup = () => {
  initLocalization();

  setTimeout(() => {
    hideLoader();
    defineDesktopFontSizes();
    initAOS();
    initParallax();
    initSwiper();
  }, 500);
};

setup();
