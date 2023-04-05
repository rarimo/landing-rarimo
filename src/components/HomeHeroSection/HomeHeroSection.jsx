import './HomeHeroSection.scss';

import { useTranslation } from 'react-i18next';
import Marquee from 'react-fast-marquee';
import SectionWrapper from '@/components/SectionWrapper';
import AppButton, { APP_BUTTON_SCHEMES } from '@/components/AppButton';
import PartnersList from '@/components/PartnersList';
import { supportedBlockchainsList } from '@/template-data';
import { CONFIG } from '@/config';
import { ROUTES_PATHS } from '@/const';

const HomeHeroSection = () => {
  const { t } = useTranslation();

  return (
    <SectionWrapper>
      <section className="home-hero-section container">
        <div className="home-hero-section__main-content">
          <div className="home-hero-section__hero-wrapper">
            <h1
              className="home-hero-section__title"
              data-aos="fade-right"
              data-aos-delay="300"
            >
              {t('home-hero-section.title')}
            </h1>
            <h6 className="home-hero-section__subtitle" data-aos="fade-right">
              {t('home-hero-section.subtitle')}
            </h6>
            <p
              className="home-hero-section__description"
              data-aos="fade-right"
              data-aos-delay="600"
            >
              {t('home-hero-section.description')}
            </p>
            <div
              className="home-hero-section__links-wrapper"
              data-aos="fade-right"
              data-aos-delay="900"
            >
              <AppButton
                className="home-hero-section__link"
                routePath={ROUTES_PATHS.testnetSignUp}
              >
                <span>{t('home-hero-section.join-testnet-link')}</span>
                <svg
                  className="home-hero-section__link-icon"
                  height="13"
                  width="13"
                >
                  <use href="/icons/sprite.svg#icon-arrow-right"></use>
                </svg>
              </AppButton>
              <AppButton
                className="home-hero-section__link"
                href={CONFIG.whitepaperLink}
                scheme={APP_BUTTON_SCHEMES.secondary}
                textKey="home-hero-section.whitepaper-link"
              />
            </div>
          </div>

          <div className="home-hero-section__blockchains-wrapper">
            <PartnersList
              titleKey="home-hero-section.blockchains-title"
              items={supportedBlockchainsList}
            />
          </div>
        </div>

        <div className="home-hero-section__scroll-for-more">
          <svg
            className="home-hero-section__scroll-for-more-icon"
            height="13"
            width="13"
          >
            <use href="/icons/sprite.svg#icon-arrow-right"></use>
          </svg>
          <span>{t('home-hero-section.scroll-for-more')}</span>
        </div>

        <div className="home-hero-section__marquee">
          <Marquee speed={100} gradient={false}>
            <h5>{t('home-hero-section.marquee')}</h5>
            <svg height="8" width="8">
              <use href="/icons/sprite.svg#icon-rect"></use>t
            </svg>
          </Marquee>
        </div>
      </section>
    </SectionWrapper>
  );
};

export default HomeHeroSection;
