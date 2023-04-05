import './UseCasesSection.scss';

import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import SectionWrapper, {
  SECTION_WRAPPER_SCHEME,
} from '@/components/SectionWrapper';
import AppButton from '@/components/AppButton';
import PartnersList from '@/components/PartnersList';
import { supportedBlockchainsList } from '@/template-data';
import { ROUTES_PATHS } from '@/const';
import { CONFIG } from '@/config';

const UseCasesSection = () => {
  const { t } = useTranslation();

  return (
    <SectionWrapper scheme={SECTION_WRAPPER_SCHEME.yellowAccent}>
      <section className="use-cases-section container">
        <div className="use-cases-section__title-wrapper">
          <h6 className="use-cases-section__subtitle">
            {t('use-cases-section.subtitle')}
          </h6>
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
          init="false"
        >
          <div slot="container-start">
            <button
              className="use-cases-section__list-nav-btn use-cases-section__list-nav-btn--prev"
              type="button"
            >
              <svg
                className="use-cases-section__list-nav-icon"
                height="26"
                width="26"
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
                height="26"
                width="26"
              >
                <use href="/icons/sprite.svg#icon-arrow-right"></use>
              </svg>
            </button>
          </div>
          <swiper-slide class="use-cases-section__case-wrapper">
            <h2 className="use-cases-section__case-title">
              {t('use-cases-section.nft-checkout-title')}
            </h2>
            <AppButton
              className="use-cases-section__case-link"
              href={CONFIG.nftCheckoutDocsLink}
            >
              <span>{t('use-cases-section.view-demo-link')}</span>
              <svg
                className="use-cases-section__case-link-icon"
                height="13"
                width="13"
              >
                <use href="/icons/sprite.svg#icon-arrow-right"></use>
              </svg>
            </AppButton>
            <div className="use-cases-section__case-content-wrapper">
              <div className="use-cases-section__content-block">
                <h6 className="overline">
                  {t('use-cases-section.description-title')}
                </h6>
                <p className="use-cases-section__description">
                  {t('use-cases-section.nft-checkout-desc')}
                </p>
              </div>
              <PartnersList
                className="use-cases-section__partners use-cases-section__content-block"
                titleKey="use-cases-section.partners-title"
                items={supportedBlockchainsList}
              />
            </div>
          </swiper-slide>
          <swiper-slide class="use-cases-section__case-wrapper">
            <h2 className="use-cases-section__case-title">
              {t('use-cases-section.crosschain-proofs-title')}
            </h2>
            <AppButton
              className="use-cases-section__case-link"
              href={CONFIG.crosschainProofsDocsLink}
            >
              <span>{t('use-cases-section.view-docs-link')}</span>
              <svg
                className="use-cases-section__case-link-icon"
                height="13"
                width="13"
              >
                <use href="/icons/sprite.svg#icon-arrow-right"></use>
              </svg>
            </AppButton>
            <div className="use-cases-section__case-content-wrapper">
              <div className="use-cases-section__content-block">
                <h6 className="overline">
                  {t('use-cases-section.description-title')}
                </h6>
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
            <AppButton
              className="use-cases-section__case-link"
              href={CONFIG.multichainMintingDocsLink}
            >
              <span>{t('use-cases-section.view-docs-link')}</span>
              <svg
                className="use-cases-section__case-link-icon"
                height="13"
                width="13"
              >
                <use href="/icons/sprite.svg#icon-arrow-right"></use>
              </svg>
            </AppButton>
            <div className="use-cases-section__case-content-wrapper">
              <div className="use-cases-section__content-block">
                <h6 className="overline">
                  {t('use-cases-section.description-title')}
                </h6>
                <p className="use-cases-section__description">
                  {t('use-cases-section.multichain-minting-desc')}
                </p>
              </div>
            </div>
          </swiper-slide>
        </swiper-container>
      </section>
    </SectionWrapper>
  );
};

export default UseCasesSection;
