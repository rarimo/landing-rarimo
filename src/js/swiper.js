import Swiper from 'swiper/bundle';

import 'swiper/css/bundle';

export const initSwiper = () => {
  new Swiper('.blockchains-swiper', {
    slidesPerView: 'auto',
    spaceBetween: 40,
    speed: 5000,
    autoplay: {
      delay: 1,
      disableOnInteraction: false,
    },
    loop: true,
    allowTouchMove: false,
  });

  new Swiper('.user-cases-swiper', {
    initialSlide: 2,
    centeredSlides: true,
    slidesPerView: 1,
    // slidesPerView: 'auto',
    spaceBetween: 16,
    breakpoints: {
      900: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
    },

    freeMode: {
      enabled: true,
    },
    mousewheel: {
      forceToAxis: true,
    },
    grabCursor: true,
    edgeSwipeDetection: true,

    loop: true,
    speed: 2000,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },

    effect: 'coverflow',
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
  });
};
