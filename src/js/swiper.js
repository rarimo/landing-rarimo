import Swiper from 'swiper/bundle';

import 'swiper/css/bundle';

export const initSwiper = () => {
  const sharedOptions = {
    mousewheel: {
      forceToAxis: true,
    },
    grabCursor: true,
    edgeSwipeDetection: true,

    freeMode: {
      enabled: true,
    },

    rewind: true,
    speed: 1000,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
  };

  new Swiper('.blockchains-swiper', {
    ...sharedOptions,
    slidesPerView: 'auto',
    spaceBetween: 40,
    breakpoints: {
      900: {
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
  });
};
