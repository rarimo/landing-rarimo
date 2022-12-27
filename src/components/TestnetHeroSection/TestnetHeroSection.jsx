import './TestnetHeroSection.scss';

import { useTranslation, Trans } from 'react-i18next';
import PrimaryVideoParallax from '@/components/PrimaryVideoParallax';
import AppLink from '@/components/AppLink';

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
          <AppLink
            className="testnet-hero-section__link"
            href="#"
            isPrimaryScheme
            textKey="testnet-hero-section.sign-up-link"
          />
        </div>
      </div>
    </section>
  );
};

export default TestnetHeroSection;