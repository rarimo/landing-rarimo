import './HomeHeroSection.scss';

import { lazy } from 'react';
import { useTranslation } from 'react-i18next';

import AppButton, { APP_BUTTON_SCHEMES } from '@/components/AppButton';
import PartnersList from '@/components/PartnersList';
import SpotlightBg from '@/components/SpotlightBg';
import { CONFIG } from '@/config';
import { COMPONENT_NODE_IDS } from '@/const';
import useAppContext from '@/hooks/useAppContext';
import { supportedBlockchainsList } from '@/template-data';

const HomeHeroSection = () => {
  const { t } = useTranslation();
  const { isDesktop } = useAppContext();

  return (
    <section id={COMPONENT_NODE_IDS.heroSection} className="home-hero-section">
      <div className="home-hero-section__content container">
        <div className="home-hero-section__hero-wrapper">
          <h1 className="home-hero-section__title">
            <div className="home-hero-section__title-part">
              <span>{t('home-hero-section.title-part-1')}</span>
              <span>{t('home-hero-section.title-part-2')}</span>
            </div>
          </h1>
          <h5 className="home-hero-section__subtitle" data-aos="fade-up">
            {t('home-hero-section.subtitle')}
          </h5>
          <div className="home-hero-section__description-wrapper">
            <p className="home-hero-section__description" data-aos="fade-up">
              {t('home-hero-section.description')}
            </p>
          </div>

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
        <div className="home-hero-section__blockchains-wrapper">
          {/* {isDesktop && (
            <div className="home-hero-section__lottie-wrapper">
              <div ref={lottieRef} className="home-hero-section__lottie" />
            </div>
          )} */}

          <PartnersList
            titleKey="home-hero-section.blockchains-title"
            items={supportedBlockchainsList}
            data-aos="fade-up"
          />
        </div>
      </div>
      <SpotlightBg />
    </section>
  );
};

export default HomeHeroSection;
