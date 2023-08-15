import './NewsSection.scss';

import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CONFIG } from '@/config';
import { getShiftedDelay } from '@/helpers';
import useAppContext from '@/hooks/useAppContext';
import { newsList } from '@/template-data';

const DEFAULT_MOBILE_BULLETS = 8;
const DEFAULT_DESKTOP_BULLETS = 5;

const NewsSection = () => {
  const { t } = useTranslation();
  const { isDesktop } = useAppContext();
  const swiperRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const nextSlide = () => {
    swiperRef.current?.swiper.slideNext();
    setActiveSlide(swiperRef.current?.swiper.activeIndex);
  };

  const prevSlide = () => {
    swiperRef.current?.swiper.slidePrev();
    setActiveSlide(swiperRef.current?.swiper.activeIndex);
  };

  const getAmountBullets = () => {
    if (!swiperRef.current) {
      return isDesktop ? DEFAULT_DESKTOP_BULLETS : DEFAULT_MOBILE_BULLETS;
    }
    return (
      swiperRef.current?.swiper.slides.length -
      Math.round(
        swiperRef.current?.swiper.width /
          swiperRef.current?.swiper.slidesSizesGrid[0],
      ) +
      1
    );
  };

  const handleScroll = () => {
    const newActiveSlide = swiperRef.current?.swiper.activeIndex;
    if (activeSlide !== newActiveSlide) {
      setActiveSlide(newActiveSlide);
    }
  };

  useEffect(() => {
    swiperRef.current?.addEventListener('scroll', handleScroll);
    return () => {
      swiperRef.current?.removeEventListener('scroll', handleScroll);
    };
  }, [activeSlide]);

  return (
    <section className="news-section">
      <div className="container">
        <div className="news-section__title-wrapper" data-aos="fade-up">
          <h5 className="news-section__title">{t('news-section.title')}</h5>
          <a
            className="news-section__view-all-link"
            href={CONFIG.mediumLink}
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            {t('news-section.view-all-link')}
            <svg
              className="news-section__view-all-link-icon"
              height="20"
              width="20"
            >
              <use href="/icons/sprite.svg#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
        <swiper-container
          ref={swiperRef}
          class="news-section__list"
          slides-per-view="auto"
          space-between="32"
          mousewheel-force-to-axis="true"
          autoplay="false"
          resistance-ratio="0.5"
          grab-cursor="true"
          free-mode="true"
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
                <div className="news-section__item-title-wrapper">
                  {item.blockName && (
                    <span className="news-section__item-block-name">
                      {t(item.blockName)}
                    </span>
                  )}
                  <h5 className="news-section__item-title">
                    {t(item.textKey)}
                  </h5>
                </div>
              </a>
            </swiper-slide>
          ))}
        </swiper-container>
        <div className="news-section__swiper-pagination">
          <button
            className="news-section__swiper-pagination-btn-prev"
            onClick={prevSlide}
          >
            <svg
              className="news-section__swiper-pagination-btn-icon-prev"
              height="24"
              width="24"
              color={
                swiperRef.current?.swiper.activeIndex === 0 ? 'gray' : '#FFFFFF'
              }
            >
              <use href="/icons/sprite.svg#icon-arrow-right-min"></use>
            </svg>
          </button>
          <div className="news-section__swiper-pagination-bullet-wrapper">
            {[...Array(getAmountBullets()).keys()].map(el => (
              <div
                key={el}
                className={
                  swiperRef.current?.swiper.activeIndex === el
                    ? 'active-bullet news-section__swiper-pagination-bullet'
                    : 'news-section__swiper-pagination-bullet'
                }
              />
            ))}
          </div>
          <button
            className="news-section__swiper-pagination-btn-next"
            onClick={nextSlide}
          >
            <svg
              className="news-section__swiper-pagination-btn-icon-next"
              height="24"
              width="24"
              color={
                swiperRef.current?.swiper?.activeIndex === getAmountBullets()-1
                  ? 'gray'
                  : '#FFFFFF'
              }
            >
              <use href="/icons/sprite.svg#icon-arrow-right-min"></use>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
