import './HomeHeroSection.scss';

import { useTranslation } from 'react-i18next';
import Marquee from 'react-fast-marquee';
import AppLink, { APP_LINK_SCHEMES } from '@/components/AppLink';
import PartnersList from '@/components/PartnersList';
import { supportedBlockchainsList } from '@/template-data';
import { CONFIG } from '@/config';
import { ROUTES_PATHS } from '@/const';

const HomeHeroSection = () => {
  const { t } = useTranslation();

  return (
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
            <AppLink
              className="home-hero-section__link"
              routePath={ROUTES_PATHS.testnet}
              textKey="home-hero-section.join-testnet-link"
            />
            <AppLink
              className="home-hero-section__link"
              href={CONFIG.whitePaperLink}
              scheme={APP_LINK_SCHEMES.secondary}
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
        <span>{t('home-hero-section.scroll-for-more')}</span>
      </div>

      <div className="home-hero-section__marquee">
        <Marquee speed={100} gradient={false}>
          <h5>{t('home-hero-section.marquee')}</h5>
        </Marquee>
      </div>
    </section>
  );
};

export default HomeHeroSection;
