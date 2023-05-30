import './NftCheckoutHeroSection.scss';

import { Trans, useTranslation } from 'react-i18next';

import AppButton, { APP_BUTTON_SCHEMES } from '@/components/AppButton';
import PartnersList from '@/components/PartnersList';
import { CONFIG } from '@/config';
import { supportedBlockchainsList } from '@/template-data';

const NftCheckoutHeroSection = () => {
  const { t } = useTranslation();

  return (
    <section className="nft-checkout-hero-section">
      <div className="nft-checkout-hero-section__content container">
        <div className="nft-checkout-hero-section__hero-wrapper">
          <h1 className="nft-checkout-hero-section__title">
            {t('nft-checkout-hero-section.title')}
          </h1>
          <p
            className="nft-checkout-hero-section__description"
            data-aos="fade-up"
          >
            <Trans i18nKey="nft-checkout-hero-section.description_html" />
          </p>
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
              // TODO: replace link to features
              href={CONFIG.whitepaperLink}
              scheme={APP_BUTTON_SCHEMES.secondary}
              textKey="nft-checkout-hero-section.features-link"
            />
          </div>
        </div>

        <div className="nft-checkout-hero-section__blockchains-wrapper">
          <PartnersList
            titleKey="nft-checkout-hero-section.blockchains-title"
            items={supportedBlockchainsList}
            data-aos="fade-up"
          />
        </div>
      </div>

      <div
        className="nft-checkout-hero-section__scroll-for-more"
        data-aos="fade-up"
      >
        <svg
          className="nft-checkout-hero-section__scroll-for-more-icon"
          height="13"
          width="13"
        >
          <use href="/icons/sprite.svg#icon-arrow-right"></use>
        </svg>
        <span>{t('nft-checkout-hero-section.scroll-for-more')}</span>
      </div>
    </section>
  );
};

export default NftCheckoutHeroSection;
