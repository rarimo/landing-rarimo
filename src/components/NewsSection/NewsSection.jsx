import './NewsSection.scss';

import { useTranslation } from 'react-i18next';
import SectionWrapper from '@/components/SectionWrapper';
import { CONFIG } from '@/config';

const NewsSection = () => {
  const { t } = useTranslation();

  return (
    <SectionWrapper>
      <section className="news-section container">
        <div className="news-section__title-wrapper">
          <h6 className="news-section__subtitle">
            {t('news-section.subtitle')}
          </h6>
          <div className="news-section__view-all-wrapper">
            <span>{t('news-section.view-all-text')}</span>
            <a
              className="news-section__view-all-link"
              href={CONFIG.mediumLink}
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              {t('news-section.view-all-link')}
            </a>
          </div>
        </div>
        <swiper-container class="news-section__list news-swiper" init="false">
          <swiper-slide class="news-section__item">
            <a
              className="news-section__item-link"
              href="https://rarimo.medium.com/rarimo-making-multi-chain-transactions-user-friendly-4b3a52c20df"
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              <div className="news-section__img-wrapper">
                <img
                  className="news-section__img"
                  src="/img/branding/og-img.jpg"
                  alt=""
                />
              </div>
              <h6 className="news-section__item-title">
                {t('news-section.first-title')}
              </h6>
            </a>
          </swiper-slide>
          <swiper-slide class="news-section__item">
            <a
              className="news-section__item-link"
              href="https://rarimo.medium.com/what-is-interoperability-and-why-is-it-so-important-6b421bdaab09"
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              <div className="news-section__img-wrapper">
                <img
                  className="news-section__img"
                  src="/img/news-section/interoperability.webp"
                  alt=""
                />
              </div>
              <h6 className="news-section__item-title">
                {t('news-section.second-title')}
              </h6>
            </a>
          </swiper-slide>
          <swiper-slide class="news-section__item">
            <a
              className="news-section__item-link"
              href={CONFIG.whitepaperLink}
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              <div className="news-section__img-wrapper"></div>
              <h6 className="news-section__item-title">
                {t('news-section.third-title')}
              </h6>
            </a>
          </swiper-slide>
          <swiper-slide class="news-section__item">
            <a
              className="news-section__item-link"
              href="https://rarimo.notion.site/Cross-Chain-Use-Cases-0c0a1d855fd14b26b63ce9326d143015"
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              <div className="news-section__img-wrapper"></div>
              <h6 className="news-section__item-title">
                {t('news-section.fourth-title')}
              </h6>
            </a>
          </swiper-slide>
        </swiper-container>
      </section>
    </SectionWrapper>
  );
};

export default NewsSection;
