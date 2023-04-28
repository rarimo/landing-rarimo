import './HomeHeroSection.scss';

import Marquee from 'react-fast-marquee';
import { useTranslation } from 'react-i18next';

import AppButton, { APP_BUTTON_SCHEMES } from '@/components/AppButton';
import PartnersList from '@/components/PartnersList';
import SectionWrapper from '@/components/SectionWrapper';
import { CONFIG } from '@/config';
import { COMPONENT_NODE_IDS, ROUTES_PATHS } from '@/const';
import { supportedBlockchainsList } from '@/template-data';

const HomeHeroSection = () => {
  const { t } = useTranslation();

  return (
    <SectionWrapper>
      <section
        id={COMPONENT_NODE_IDS.homeHeroSection}
        className="home-hero-section container"
      >
        <div className="home-hero-section__main-content">
          <div className="home-hero-section__decor">
            <div
              className="home-hero-section__decor--part-1"
              data-aos="fade-up"
            ></div>
            <div
              className="home-hero-section__decor--part-2"
              data-aos="fade-up"
              data-aos-delay="150"
            ></div>
            <div
              className="home-hero-section__decor--part-3"
              data-aos="fade-up"
              data-aos-delay="300"
            ></div>
          </div>
          <div className="home-hero-section__hero-wrapper">
            <h1 className="home-hero-section__title">
              <div className="home-hero-section__title-part">
                <span className="js-character-animation">
                  {t('home-hero-section.title-part-1')}
                </span>
              </div>
              <div className="home-hero-section__title-part">
                <span className="js-character-animation">
                  {t('home-hero-section.title-part-2')}
                </span>
              </div>
            </h1>
            <h6 className="home-hero-section__subtitle" data-aos="fade-up">
              {t('home-hero-section.subtitle')}
            </h6>
            <p className="home-hero-section__description" data-aos="fade-up">
              {t('home-hero-section.description')}
            </p>
            <div
              className="home-hero-section__links-wrapper"
              data-aos="fade-up"
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

          <div className="overflow-hidden">
            <div className="home-hero-section__blockchains-wrapper">
              <PartnersList
                titleKey="home-hero-section.blockchains-title"
                items={supportedBlockchainsList}
                data-aos="fade-up"
              />
            </div>
          </div>
        </div>

        <div className="home-hero-section__scroll-for-more" data-aos="fade-up">
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
