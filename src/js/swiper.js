import { register } from 'swiper/element/bundle';
register();

export const initSwiper = () => {
  const swiperEl = document.querySelector('.use-cases-swiper');

  const swiperParams = {
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
  };

  Object.assign(swiperEl, swiperParams);
  swiperEl.initialize();
};
