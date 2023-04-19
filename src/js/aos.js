import AOS from 'aos';
import { prepareCharacterAnimation } from '@/helpers';

export const initAOS = () => {
  prepareCharacterAnimation();

  AOS.init({
    duration: 1000,
    easing: 'ease',
    offset: 0,
    once: true,
    mirror: false,
    anchorPlacement: 'bottom-bottom',
  });
};
