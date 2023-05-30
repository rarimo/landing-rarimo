import AOS from 'aos';

import { prepareCharacterAnimation, prepareStringAnimation } from '@/helpers';

export const initAOS = () => {
  prepareCharacterAnimation();
  prepareStringAnimation();

  AOS.init({
    duration: 1000,
    easing: 'ease',
    offset: 0,
    // TODO: switch off mirror mode
    once: false,
    mirror: true,
    anchorPlacement: 'center-bottom',
  });
};
