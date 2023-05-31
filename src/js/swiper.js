import { register } from 'swiper/element/bundle';
register();

export const initSwiper = () => {
  const useCasesSwiperRef = document.querySelector('.use-cases-swiper');

  if (useCasesSwiperRef) {
    Object.assign(useCasesSwiperRef, {
      slidesPerView: 1,
      speed: 1200,
      allowTouchMove: false,
      navigation: {
        nextEl: '.use-cases-section__list-nav-btn--next',
        prevEl: '.use-cases-section__list-nav-btn--prev',
      },
      a11y: {
        slideRole: 'listitem',
        containerRoleDescriptionMessage: 'Use cases list',
        itemRoleDescriptionMessage: 'Use case',
      },
    });
    useCasesSwiperRef.initialize();
  }

  const newsSwiperRef = document.querySelector('.news-swiper');

  if (newsSwiperRef) {
    Object.assign(newsSwiperRef, {
      slidesPerView: 'auto',
      spaceBetween: 32,
      mousewheel: {
        forceToAxis: true,
      },
      autoplay: false,
      resistanceRatio: 0.5,
      grabCursor: true,
      edgeSwipeDetection: true,
      speed: 1000,
      breakpoints: {
        1200: {
          slidesPerView: 4,
          enabled: false,
        },
      },
      a11y: {
        slideRole: 'listitem',
        containerRoleDescriptionMessage: 'Last news list',
        itemRoleDescriptionMessage: 'Actual news',
      },
    });
    newsSwiperRef.initialize();
  }
};
