import './UseCasesSection.scss';

import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import AppButton from '@/components/AppButton';
import { CONFIG } from '@/config';
import { COMPONENT_NODE_IDS, ROUTES_PATHS } from '@/const';

const UseCasesSection = () => {
  const { t } = useTranslation();

  return (
    <section
      id={COMPONENT_NODE_IDS.useCasesSection}
      className="use-cases-section"
    >
      <div className="container">
        <div className="use-cases-section__title-wrapper" data-aos="fade-up">
          <h5 className="use-cases-section__title">
            {t('use-cases-section.title')}
          </h5>
          <div className="use-cases-section__share-wrapper">
            <span>{t('use-cases-section.share-text')}</span>
            <Link
              className="use-cases-section__share-link"
              to={ROUTES_PATHS.testnetSignUp}
            >
              {t('use-cases-section.share-link')}
            </Link>
          </div>
        </div>
        <swiper-container
          class="use-cases-section__cases-list use-cases-swiper"
          slides-per-view="1"
          speed="1200"
          allow-touch-move="false"
          navigation-next-el=".use-cases-section__list-nav-btn--next"
          navigation-prev-el=".use-cases-section__list-nav-btn--prev"
          a11y-slide-role="listitem"
          a11y-container-role-description-message="Use cases list"
          item-role-description-message="Use case"
          data-aos="zoom-out"
          data-aos-anchor-placement="top-bottom"
        >
          <div slot="container-start">
            <button
              className="use-cases-section__list-nav-btn use-cases-section__list-nav-btn--prev"
              type="button"
            >
              <svg
                className="use-cases-section__list-nav-icon"
                height="16"
                width="16"
              >
                <use href="/icons/sprite.svg#icon-arrow-right"></use>
              </svg>
            </button>
            <button
              className="use-cases-section__list-nav-btn use-cases-section__list-nav-btn--next"
              type="button"
            >
              <svg
                className="use-cases-section__list-nav-icon"
                height="16"
                width="16"
              >
                <use href="/icons/sprite.svg#icon-arrow-right"></use>
              </svg>
            </button>
          </div>
          <swiper-slide class="use-cases-section__case-wrapper">
            <h2 className="use-cases-section__case-title" data-aos="fade-up">
              {t('use-cases-section.nft-checkout-title')}
            </h2>
            <div className="use-cases-section__case-link" data-aos="fade-up">
              <AppButton routePath={ROUTES_PATHS.nftCheckout}>
                <span>{t('use-cases-section.learn-more-link')}</span>
                <svg
                  className="use-cases-section__case-link-icon"
                  height="13"
                  width="13"
                >
                  <use href="/icons/sprite.svg#icon-arrow-right"></use>
                </svg>
              </AppButton>
            </div>
            <div
              className="use-cases-section__case-content-wrapper"
              data-aos="fade-up"
              data-aos-delay="150"
            >
              <div className="use-cases-section__content-block">
                <h5 className="overline">
                  {t('use-cases-section.description-title')}
                </h5>
                <p className="use-cases-section__description">
                  {t('use-cases-section.nft-checkout-desc')}
                </p>
              </div>
              <div className="use-cases-section__content-block">
                <h5 className="overline">
                  {t('use-cases-section.partners-title')}
                </h5>
                <svg
                  className="use-cases-section__partner-logo"
                  height="24"
                  width="160"
                >
                  <use href="/icons/sprite.svg#icon-nft-trade-logo"></use>
                </svg>
              </div>
            </div>
          </swiper-slide>
          <swiper-slide class="use-cases-section__case-wrapper">
            <h2 className="use-cases-section__case-title">
              {t('use-cases-section.crosschain-proofs-title')}
            </h2>
            <div className="use-cases-section__case-link">
              <AppButton href={CONFIG.crosschainProofsDocsLink}>
                <span>{t('use-cases-section.view-docs-link')}</span>
                <svg
                  className="use-cases-section__case-link-icon"
                  height="13"
                  width="13"
                >
                  <use href="/icons/sprite.svg#icon-arrow-right"></use>
                </svg>
              </AppButton>
            </div>
            <div className="use-cases-section__case-content-wrapper">
              <div className="use-cases-section__content-block">
                <h5 className="overline">
                  {t('use-cases-section.description-title')}
                </h5>
                <p className="use-cases-section__description">
                  {t('use-cases-section.crosschain-proofs-desc')}
                </p>
              </div>
            </div>
          </swiper-slide>
          <swiper-slide class="use-cases-section__case-wrapper">
            <h2 className="use-cases-section__case-title">
              {t('use-cases-section.multichain-minting-title')}
            </h2>
            <div className="use-cases-section__case-link">
              <AppButton href={CONFIG.multichainMintingDocsLink}>
                <span>{t('use-cases-section.view-docs-link')}</span>
                <svg
                  className="use-cases-section__case-link-icon"
                  height="13"
                  width="13"
                >
                  <use href="/icons/sprite.svg#icon-arrow-right"></use>
                </svg>
              </AppButton>
            </div>
            <div className="use-cases-section__case-content-wrapper">
              <div className="use-cases-section__content-block">
                <h5 className="overline">
                  {t('use-cases-section.description-title')}
                </h5>
                <p className="use-cases-section__description">
                  {t('use-cases-section.multichain-minting-desc')}
                </p>
              </div>
            </div>
          </swiper-slide>
        </swiper-container>
      </div>
    </section>
  );
};

export default UseCasesSection;
