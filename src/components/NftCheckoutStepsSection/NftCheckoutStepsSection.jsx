import './NftCheckoutStepsSection.scss';

import { throttle } from 'lodash-es';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Portal from '@/components/Portal/Portal';

let onScroll;

const NftCheckoutStepsSection = ({ animationStep }) => {
  const { t } = useTranslation();

  const sectionRef = useRef(null);
  const animationRef = useRef(null);
  const lottieFixedRef = useRef(null);
  const lottieAbsoluteRef = useRef(null);
  const swiperRef = useRef(null);

  const [isStickedAnimation, setIsStickedAnimation] = useState(false);

  const initLottie = ({ container, autoplay = false }) => {
    if (animationRef.current) {
      destroyAnimation();

      animationRef.current.destroy();
    }

    const params = {
      container: container,
      renderer: 'svg',
      loop: Boolean(autoplay),
      autoplay: Boolean(autoplay),
      path: '/animation/nft-checkout-demo.json',
    };

    animationRef.current = window.lottie?.loadAnimation(params);

    // [
    //   'complete',
    //   'loopComplete',
    //   'drawnFrame',
    //   'enterFrame',
    //   'segmentStart',
    // ].forEach(event => {
    //   animationRef.current.addEventListener(event, qwe => {
    //     console.log(event, qwe);
    //   });
    // });
  };

  const parallax = () => {
    const sectionClientRect = sectionRef.current?.getBoundingClientRect();
    console.log(sectionClientRect);
    if (!sectionClientRect) return;

    if (sectionClientRect.top <= 0) {
      setIsStickedAnimation(true);
      window.removeEventListener('scroll', onScroll, {
        passive: true,
      });
    }
  };

  useEffect(() => {
    if (isStickedAnimation) {
      initLottie({ container: lottieAbsoluteRef.current, autoplay: true });
    }
  }, [isStickedAnimation]);

  useEffect(() => {
    onScroll = throttle(parallax, 200);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll, { passive: true });
    };
  }, []);

  useEffect(() => {
    swiperRef.current.swiper.slideTo(animationStep);
  }, [animationStep]);

  const destroyAnimation = () => {
    console.log(lottieFixedRef.current);
    console.log(lottieAbsoluteRef.current);
  };

  useEffect(() => {
    if (isStickedAnimation) return;

    initLottie({ container: lottieFixedRef.current });

    return () => {
      // destroyAnimation();
      animationRef.current?.destroy();
    };
  }, []);

  return (
    <section ref={sectionRef} className="nft-checkout-steps-section">
      {!isStickedAnimation && (
        <Portal>
          <div className="nft-checkout-page__lottie-wrapper">
            <div
              ref={lottieFixedRef}
              className="nft-checkout-page__lottie"
              data-aos="fade"
              data-aos-anchor-placement="top-bottom"
            ></div>
          </div>
        </Portal>
      )}
      <div className="nft-checkout-steps-section__content container">
        {isStickedAnimation && (
          <div className="nft-checkout-page__lottie-wrapper nft-checkout-page__lottie-wrapper--absolute">
            <div
              ref={lottieAbsoluteRef}
              className="nft-checkout-page__lottie"
              data-aos="fade"
              data-aos-anchor-placement="top-bottom"
            ></div>
          </div>
        )}
        <swiper-container
          ref={swiperRef}
          active-index="0"
          loop="true"
          slides-per-view="1"
          speed="1200"
          allow-touch-move="false"
          effect="fade"
          slide-role="listitem"
          container-role-description-message="NFT Checkout flow"
          a11y-item-role-description-message="NFT Checkout step"
          class="nft-checkout-steps-section__list"
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
            <p className="nft-checkout-steps-section__description">
              {t('nft-checkout-steps-section.description-1')}
            </p>
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
            <p className="nft-checkout-steps-section__description">
              {t('nft-checkout-steps-section.description-2')}
            </p>
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
            <p className="nft-checkout-steps-section__description">
              {t('nft-checkout-steps-section.description-3')}
            </p>
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
            <p className="nft-checkout-steps-section__description">
              {t('nft-checkout-steps-section.description-4')}
            </p>
          </swiper-slide>
        </swiper-container>
      </div>
    </section>
  );
};

export default NftCheckoutStepsSection;
