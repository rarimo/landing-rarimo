import AOS from 'aos';
import 'aos/dist/aos.css';

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
