import './NftSettlementHeroSection.scss';

import { Trans, useTranslation } from 'react-i18next';
import PrimaryVideoParallax from '@/components/PrimaryVideoParallax';
import AppLink from '@/components/AppLink';
import { CONFIG } from '@/config';
import { VIDEO_BG_COLOR } from '@/const';

const NftSettlementHeroSection = () => {
  const { t } = useTranslation();

  return (
    <section className="nft-settlement-hero-section">
      <PrimaryVideoParallax type={VIDEO_BG_COLOR.blue} />

      <div className="nft-settlement-hero-section__content container">
        <h2
          className="nft-settlement-hero-section__title"
          data-aos="zoom-in"
          data-aos-delay="300"
        >
          {t('nft-settlement-hero-section.title')}
          <span className="nft-settlement-hero-section__title-span">
            {t('nft-settlement-hero-section.title-span')}
          </span>
        </h2>
        <h4
          className="nft-settlement-hero-section__subtitle"
          data-aos="zoom-in"
        >
          {t('nft-settlement-hero-section.subtitle')}
        </h4>
        <p
          className="nft-settlement-hero-section__description"
          data-aos="zoom-in"
          data-aos-delay="600"
        >
          <Trans i18nKey="nft-settlement-hero-section.description_html" />
        </p>

        <div
          className="nft-settlement-hero-section__link-wrapper"
          data-aos="zoom-in"
          data-aos-delay="900"
        >
          <AppLink
            href={CONFIG.nftSettlementDemoLink}
            isPrimaryScheme
            textKey="nft-settlement-hero-section.try-demo-link"
          />
        </div>
      </div>
    </section>
  );
};

export default NftSettlementHeroSection;
