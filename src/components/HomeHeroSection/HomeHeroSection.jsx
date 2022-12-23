import './HomeHeroSection.scss';

import { useTranslation, Trans } from 'react-i18next';
import PrimaryVideoParallax from '@/components/PrimaryVideoParallax';
import AppLink from '@/components/AppLink';
import PartnersList from '@/components/PartnersList';
import { supportedBlockchainsList } from '@/template-data';

const HomeHeroSection = () => {
  const { t } = useTranslation();

  return (
    <section className="home-hero-section">
      <PrimaryVideoParallax />

      <div className="home-hero-section__titles-wrapper container">
        <h2
          className="home-hero-section__title"
          data-aos="fade-right"
          data-aos-delay="300"
        >
          {t('home-hero-section.title')}
        </h2>
        <h4 className="home-hero-section__subtitle" data-aos="fade-right">
          {t('home-hero-section.subtitle')}
        </h4>
        <p
          className="home-hero-section__description"
          data-aos="fade-right"
          data-aos-delay="600"
        >
          <Trans i18nKey="home-hero-section.description_html" />
        </p>
      </div>
      <div
        className="home-hero-section__links-wrapper container"
        data-aos="fade-right"
        data-aos-delay="900"
      >
        <AppLink
          className="home-hero-section__link"
          href="#"
          isPrimaryScheme
          textKey="home-hero-section.join-testnet-link"
        />
        <AppLink
          className="home-hero-section__link"
          href="#"
          isPrimaryScheme
          textKey="home-hero-section.join-testnet-link"
        />
      </div>

      <PartnersList
        titleKey="home-hero-section.blockchains-title"
        items={supportedBlockchainsList}
      />
    </section>
  );
};

export default HomeHeroSection;
