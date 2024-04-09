import './HomeHeroSection.scss';

import { useTranslation } from 'react-i18next';

import AppButton from '@/components/AppButton';
import SpotlightBg from '@/components/SpotlightBg';
import { CONFIG } from '@/config';
import { COMPONENT_NODE_IDS } from '@/const';

import BackersSection from '../BackersSection';

const HomeHeroSection = () => {
  const { t } = useTranslation();

  return (
    <section id={COMPONENT_NODE_IDS.heroSection} className="home-hero-section">
      <div className="home-hero-section__content container">
        <div className="home-hero-section__hero-wrapper">
          <h1 className="home-hero-section__title">
            {t('home-hero-section.title')}
          </h1>
          <p className="home-hero-section__description" data-aos="fade-up">
            {t('home-hero-section.description')}
          </p>
          <div className="home-hero-section__links-wrapper" data-aos="fade-up">
            <AppButton
              className="home-hero-section__link"
              href={CONFIG.docsOverviewLink}
            >
              <span>{t('home-hero-section.getting-started-link')}</span>
              <svg
                className="home-hero-section__link-icon"
                height="13"
                width="13"
              >
                <use href="/icons/sprite.svg#icon-arrow-right"></use>
              </svg>
            </AppButton>
          </div>
        </div>

        <div className="home-hero-section__backers-wrapper">
          <BackersSection />
        </div>
      </div>
      <SpotlightBg />
    </section>
  );
};

export default HomeHeroSection;
