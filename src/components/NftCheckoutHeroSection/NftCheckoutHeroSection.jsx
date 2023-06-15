import './NftCheckoutHeroSection.scss';

import { useTranslation } from 'react-i18next';

import AppButton, { APP_BUTTON_SCHEMES } from '@/components/AppButton';
import PartnersList from '@/components/PartnersList';
import { CONFIG } from '@/config';
import { COMPONENT_NODE_IDS } from '@/const';
import { supportedBlockchainsList } from '@/template-data';

const NftCheckoutHeroSection = () => {
  const { t } = useTranslation();

  return (
    <section
      id={COMPONENT_NODE_IDS.heroSection}
      className="nft-checkout-hero-section"
    >
      <div className="nft-checkout-hero-section__inner">
        <div className="nft-checkout-hero-section__content container">
          <h1 className="nft-checkout-hero-section__title">
            <span className="js-character-animation">
              {t('nft-checkout-hero-section.title')}
            </span>
          </h1>
          <p
            className="nft-checkout-hero-section__description"
            data-aos="fade-up"
          >
            {t('nft-checkout-hero-section.description')}
          </p>
          <PartnersList
            className="nft-checkout-hero-section__blockchains"
            titleKey="nft-checkout-hero-section.blockchains-title"
            items={supportedBlockchainsList}
            data-aos="fade-up"
          />
          <div
            className="nft-checkout-hero-section__links-wrapper"
            data-aos="fade-up"
          >
            <AppButton
              className="nft-checkout-hero-section__link"
              href={CONFIG.nftCheckoutDocsLink}
            >
              <span>{t('nft-checkout-hero-section.docs-link')}</span>
              <svg
                className="nft-checkout-hero-section__link-icon"
                height="13"
                width="13"
              >
                <use href="/icons/sprite.svg#icon-arrow-right"></use>
              </svg>
            </AppButton>
            <AppButton
              className="nft-checkout-hero-section__link"
              href={CONFIG.nftCheckoutDemoLink}
              scheme={APP_BUTTON_SCHEMES.secondary}
              textKey="nft-checkout-hero-section.demo-link"
            />
          </div>
          <img
            src="/img/nft-checkout-page/alchemy.png"
            height="35"
            width="160"
            alt=""
            data-aos="fade-up"
          />
        </div>
      </div>
    </section>
  );
};

export default NftCheckoutHeroSection;
