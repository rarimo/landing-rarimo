import 'aos/dist/aos.css';

import AOS from 'aos';

export const initAOS = () => {
  AOS.init({
    duration: 1500,
    easing: 'ease',
    offset: 0,
    // once: false,
    // mirror: true,
    once: true,
    mirror: false,
    anchorPlacement: 'bottom-bottom',
  });
};
