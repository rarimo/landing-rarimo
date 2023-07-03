import AOS from 'aos';

export const initAOS = () => {
  AOS.init({
    duration: 1000,
    easing: 'ease',
    offset: 0,
    once: true,
    mirror: false,
    anchorPlacement: 'center-bottom',
  });
};
