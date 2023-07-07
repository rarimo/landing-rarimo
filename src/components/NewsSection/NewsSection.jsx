import './NewsSection.scss';

import { useTranslation } from 'react-i18next';

import { CONFIG } from '@/config';
import { newsList } from '@/template-data';

const NewsSection = () => {
  const { t } = useTranslation();

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
          </a>
        </div>
        <swiper-container
          class="news-section__list"
          slides-per-view="auto"
          space-between="16"
          mousewheel-force-to-axis="true"
          autoplay="false"
          resistance-ratio="0.5"
          grab-cursor="true"
          edge-swipe-detection="true"
          speed="1000"
          breakpoints-1280-slides-per-view="4"
          breakpoints-1280-enabled="false"
          a11y-slide-role="listitem"
          a11y-container-role-description-message="Last news list"
          a11y-item-role-description-message="Actual news"
        >
          {newsList.map((item, index) => (
            <swiper-slide
              class="news-section__item"
              data-aos="fade-up"
              key={index}
            >
              <a
                className="news-section__item-link"
                href={item.link}
                target="_blank"
                rel="nofollow noopener noreferrer"
              >
                <div className="news-section__content-wrapper">
                  <img
                    className="news-section__img"
                    src="/img/news-section/news-bg.webp"
                    alt=""
                  />
                  <div className="news-section__item-title-wrapper">
                    <h5 className="news-section__item-title">
                      {t(item.textKey)}
                    </h5>
                  </div>
                </div>
              </a>
            </swiper-slide>
          ))}
        </swiper-container>
      </div>
    </section>
  );
};

export default NewsSection;
