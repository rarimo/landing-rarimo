import './HomeHeroSection.scss';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useInterval } from 'react-use';

import AppButton from '@/components/AppButton';
import SpotlightBg from '@/components/SpotlightBg';
import { CONFIG } from '@/config';
import { COMPONENT_NODE_IDS } from '@/const';

import BackersSection from '../BackersSection';

const HomeHeroSection = () => {
  const { t } = useTranslation();
  const [currentHighlightIndex, setCurrentHighlightIndex] = useState(0);

  const highlights = [
    t('home-hero-section.title-highlight-1'),
    t('home-hero-section.title-highlight-2'),
    t('home-hero-section.title-highlight-3'),
  ];

  useInterval(() => {
    setCurrentHighlightIndex(prev => (prev + 1) % highlights.length);
  }, 3000);

  return (
    <section id={COMPONENT_NODE_IDS.heroSection} className="home-hero-section">
      <div className="home-hero-section__content container">
        <div className="home-hero-section__hero-wrapper">
          <h1 className="home-hero-section__title">
            <span>{t('home-hero-section.title-main')}</span>
            <div className="home-hero-section__title-highlight">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={currentHighlightIndex}
                  initial={{ translateY: '100%', opacity: 0 }}
                  animate={{ translateY: 0, opacity: 1 }}
                  exit={{ translateY: '-100%', opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {highlights[currentHighlightIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
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
