import './NewsSection.scss';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getShiftedDelay } from '@/helpers';
import useAppContext from '@/hooks/useAppContext';
import { newsList } from '@/template-data';

const NewsSection = () => {
  const { t } = useTranslation();
  const { isDesktop } = useAppContext();
  const swiperRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const slidesPreView = useMemo(() => (isDesktop ? 3 : 1), [isDesktop]);

  const nextSlide = () => {
    swiperRef.current?.swiper.slideNext();
    setActiveSlide(swiperRef.current?.swiper.activeIndex);
  };

  const prevSlide = () => {
    swiperRef.current?.swiper.slidePrev();
    setActiveSlide(swiperRef.current?.swiper.activeIndex);
  };

  const handleScroll = () => {
    const newActiveSlide = swiperRef.current?.swiper.activeIndex;
    if (activeSlide !== newActiveSlide) {
      setActiveSlide(newActiveSlide);
    }
  };

  useEffect(() => {
    swiperRef.current?.addEventListener('scroll', handleScroll);
    swiperRef.current?.addEventListener('touchmove', handleScroll);
    swiperRef.current?.addEventListener('touchend', handleScroll);
    swiperRef.current?.addEventListener('touchcancel', handleScroll);

    return () => {
      swiperRef.current?.removeEventListener('scroll', handleScroll);
      swiperRef.current?.removeEventListener('touchmove', handleScroll);
      swiperRef.current?.removeEventListener('touchend', handleScroll);
      swiperRef.current?.removeEventListener('touchcancel', handleScroll);
    };
  }, [activeSlide]);

  return (
    <section className="news-section">
      <div className="container news-section__container">
        <div className="news-section__wrapper">
          <div className="news-section__title-wrapper" data-aos="fade-up">
            <h5 className="news-section__title">{t('news-section.title')}</h5>
            <div className="news-section__controls">
              <button
                className="news-section__control"
                disabled={activeSlide === 0}
                onClick={prevSlide}
              >
                <svg className="news-section__control-icon news-section__control-icon--prev">
                  <use href="/icons/sprite.svg#icon-arrow-right"></use>
                </svg>
              </button>
              <button
                className="news-section__control"
                disabled={activeSlide === newsList.length - slidesPreView}
                onClick={nextSlide}
              >
                <svg className="news-section__control-icon">
                  <use href="/icons/sprite.svg#icon-arrow-right"></use>
                </svg>
              </button>
            </div>
          </div>
          <swiper-container
            ref={swiperRef}
            class="news-section__list"
            slides-per-view="auto"
            space-between="24"
            mousewheel-force-to-axis="true"
            autoplay="false"
            resistance-ratio="0.5"
            grab-cursor="true"
            free-mode={isDesktop}
            edge-swipe-detection="true"
            breakpoints-1280-slides-per-view="4"
            breakpoints-1280-enabled="false"
            a11y-slide-role="listitem"
            a11y-container-role-description-message="Last news list"
            a11y-item-role-description-message="Actual news"
          >
            {newsList.map((item, index) => (
              <swiper-slide
                key={index}
                class="news-section__item"
                data-aos="fade-up"
                data-aos-delay={getShiftedDelay(index, 100)}
              >
                <a
                  className="news-section__item-link"
                  href={item.link}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="news-section__item-image"
                  />
                  <div className="news-section__item-main">
                    <p className="news-section__item-title">{item.title}</p>
                  </div>
                </a>
              </swiper-slide>
            ))}
          </swiper-container>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
