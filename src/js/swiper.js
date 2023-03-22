import 'swiper/css/bundle';

import Swiper from 'swiper/bundle';

export const initSwiper = () => {
  const sharedOptions = {
    mousewheel: {
      forceToAxis: true,
    },
    grabCursor: true,
    edgeSwipeDetection: true,

    speed: 1000,
    a11y: {
      slideRole: 'listitem',
    },
  };

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
