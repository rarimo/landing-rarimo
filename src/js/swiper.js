import Swiper from 'swiper/bundle';

import 'swiper/css/bundle';

export const initSwiper = () => {
  const sharedOptions = {
    mousewheel: {
      forceToAxis: true,
    },
    grabCursor: true,
    edgeSwipeDetection: true,

    speed: 1000,
  };

  new Swiper('.blockchains-swiper', {
    ...sharedOptions,
    slidesPerView: 'auto',
    spaceBetween: 40,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    rewind: true,
    freeMode: {
      enabled: true,
    },
    breakpoints: {
      1150: {
        enabled: false,
        grabCursor: false,
      },
    },
  });

  new Swiper('.user-cases-swiper', {
    ...sharedOptions,
    slidesPerView: 1,
    spaceBetween: 16,
    breakpoints: {
      800: {
        slidesPerView: 2,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
    },
    navigation: {
      nextEl: '.user-cases-section__list-nav-btn--next',
      prevEl: '.user-cases-section__list-nav-btn--prev',
    },
  });
};
