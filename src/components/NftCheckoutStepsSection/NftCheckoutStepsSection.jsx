import './NftCheckoutStepsSection.scss';

import { forwardRef, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const NftCheckoutStepsSectionCopy = forwardRef(({ animationStep }, ref) => {
  const { t } = useTranslation();

  const swiperRef = useRef(null);

  useEffect(() => {
    swiperRef.current.swiper.slideTo(animationStep);
  }, [animationStep]);

  return (
    <section ref={ref} className="nft-checkout-steps-section container">
      <div className="nft-checkout-steps-section__content">
        <swiper-container
          ref={swiperRef}
          class="nft-checkout-steps-section__list"
          active-index="0"
          slides-per-view="1"
          auto-height="true"
          speed="1200"
          allow-touch-move="false"
          effect="fade"
          slide-role="listitem"
          container-role-description-message="NFT Checkout flow"
          a11y-item-role-description-message="NFT Checkout step"
        >
          <swiper-slide class="nft-checkout-steps-section__item">
            <h3 className="nft-checkout-steps-section__title">
              {t('nft-checkout-steps-section.title-1')}
            </h3>
            <h4 className="nft-checkout-steps-section__counter">
              <span>01</span>
              <span>/</span>
              <span className="nft-checkout-steps-section__counter--total">
                04
              </span>
            </h4>
          </swiper-slide>
          <swiper-slide class="nft-checkout-steps-section__item">
            <h4 className="nft-checkout-steps-section__counter">
              <span>02</span>
              <span>/</span>
              <span className="nft-checkout-steps-section__counter--total">
                04
              </span>
            </h4>
            <h3 className="nft-checkout-steps-section__title">
              {t('nft-checkout-steps-section.title-2')}
            </h3>
          </swiper-slide>
          <swiper-slide class="nft-checkout-steps-section__item">
            <h4 className="nft-checkout-steps-section__counter">
              <span>03</span>
              <span>/</span>
              <span className="nft-checkout-steps-section__counter--total">
                04
              </span>
            </h4>
            <h3 className="nft-checkout-steps-section__title">
              {t('nft-checkout-steps-section.title-3')}
            </h3>
          </swiper-slide>
          <swiper-slide class="nft-checkout-steps-section__item">
            <h4 className="nft-checkout-steps-section__counter">
              <span>04</span>
              <span>/</span>
              <span className="nft-checkout-steps-section__counter--total">
                04
              </span>
            </h4>
            <h3 className="nft-checkout-steps-section__title">
              {t('nft-checkout-steps-section.title-4')}
            </h3>
          </swiper-slide>
        </swiper-container>
      </div>
    </section>
  );
});

export default NftCheckoutStepsSectionCopy;
