import './TestnetHeroSection.scss';

import { Trans, useTranslation } from 'react-i18next';

import AppButton from '@/components/AppButton';
import PrimaryVideoParallax from '@/components/PrimaryVideoParallax';
import { ROUTES_PATHS } from '@/const';

const TestnetHeroSection = () => {
  const { t } = useTranslation();

  return (
    <section className="testnet-hero-section">
      <PrimaryVideoParallax />

      <div className="container">
        <h2 className="testnet-hero-section__title" data-aos="zoom-in">
          {t('testnet-hero-section.title')}
        </h2>
        <p
          className="testnet-hero-section__description"
          data-aos="zoom-in"
          data-aos-delay="300"
        >
          <Trans i18nKey="testnet-hero-section.description_html" />
        </p>

        <div data-aos="zoom-in" data-aos-delay="600">
          <AppButton
            className="testnet-hero-section__link"
            routePath={ROUTES_PATHS.testnetSignUp}
            textKey="testnet-hero-section.sign-up-link"
          />
        </div>
      </div>
    </section>
  );
};

export default TestnetHeroSection;
