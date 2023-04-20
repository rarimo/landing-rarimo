import AOS from 'aos';
import { prepareCharacterAnimation, prepareStringAnimation } from '@/helpers';

export const initAOS = () => {
  prepareCharacterAnimation();
  prepareStringAnimation();

  AOS.init({
    duration: 1000,
    easing: 'ease',
    offset: 0,
    once: true,
    mirror: false,
    anchorPlacement: 'center-bottom',
  });
};
