import './HomeHeroSection.scss';

import { lazy, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import AppButton, { APP_BUTTON_SCHEMES } from '@/components/AppButton';
import PartnersList from '@/components/PartnersList';
import { CONFIG } from '@/config';
import { COMPONENT_NODE_IDS, ROUTES_PATHS } from '@/const';
import useAppContext from '@/hooks/useAppContext';
import { supportedBlockchainsList } from '@/template-data';

const HomeHeroDecor = lazy(() => import('@/components/HomeHeroDecor'));

let onMousemove;
let sectionRect;

const HomeHeroSection = () => {
  const { t } = useTranslation();
  const { isDesktop } = useAppContext();

  const sectionRef = useRef(null);
  const spotlightRef = useRef(null);

  useEffect(() => {
    const removeListeners = () => {
      window.removeEventListener('mousemove', onMousemove);
    };

    if (isDesktop) {
      sectionRect = sectionRef.current.getBoundingClientRect();

      const onMousemove = ({ pageX, pageY }) => {
        if (!spotlightRef.current || window.scrollY > sectionRect.height)
          return;

        const x = pageX;
        const y = pageY;
        const spotlightSize = 'transparent 80px, rgba(0, 0, 0, 0.8) 200px)';

        spotlightRef.current.style.backgroundImage = `radial-gradient(circle at ${x}px ${y}px, ${spotlightSize}`;
      };

      document.addEventListener('mousemove', onMousemove);
      return;
    }

    if (!isDesktop) {
      removeListeners();
    }

    return () => {
      removeListeners();
    };
  }, [isDesktop]);

  return (
    <section
      id={COMPONENT_NODE_IDS.heroSection}
      ref={sectionRef}
      className="home-hero-section"
    >
      <div className="home-hero-section__content container">
        {isDesktop && <HomeHeroDecor className="home-hero-section__decor" />}

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
          <h5 className="home-hero-section__subtitle" data-aos="fade-up">
            {t('home-hero-section.subtitle')}
          </h5>
          <p className="home-hero-section__description" data-aos="fade-up">
            {t('home-hero-section.description')}
          </p>
          <div className="home-hero-section__links-wrapper" data-aos="fade-up">
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
            data-aos="fade-up"
          />
        </div>
      </div>
      <div className="home-hero-section__bg-rect-backdrop" />
      {isDesktop && (
        <div ref={spotlightRef} className="home-hero-section__spotlight" />
      )}
    </section>
  );
};

export default HomeHeroSection;
