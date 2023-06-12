import './NftCheckoutStepsSection.scss';

import { throttle } from 'lodash-es';
import lottie from 'lottie-web';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Portal from '@/components/Portal/Portal';
import useStateRef from '@/hooks/useStateRef';

import AppButton, { APP_BUTTON_SCHEMES } from '../AppButton/AppButton';

let onScroll;

const fillFramesRange = startFrame => {
  return Array(4)
    .fill(null)
    .map((_, i) => startFrame + i);
};

const STEP_FRAMES = [
  fillFramesRange(110),
  fillFramesRange(220),
  fillFramesRange(330),
  fillFramesRange(440),
];

const NftCheckoutStepsSection = () => {
  const { t } = useTranslation();

  const sectionRef = useRef(null);
  const animationRef = useRef(null);
  const lottieFixedRef = useRef(null);
  const lottieAbsoluteRef = useRef(null);
  const swiperRef = useRef(null);

  const [isStickedAnimation, setIsStickedAnimation] = useState(false);
  const [animationStep, setAnimationStep, animationStepRef] = useStateRef(0);

  const initAnimation = ({ container, autoplay = false }) => {
    if (animationRef.current) {
      destroyAnimation();
    }

    const params = {
      container,
      renderer: 'svg',
      loop: false,
      autoplay: Boolean(autoplay),
      path: '/animation/nft-checkout-demo.json',
    };

    animationRef.current = lottie.loadAnimation(params);
  };

  const destroyAnimation = () => {
    animationRef.current?.destroy();
  };

  const parallax = () => {
    const sectionClientRect = sectionRef.current?.getBoundingClientRect();
    if (!sectionClientRect) return;

    if (sectionClientRect.top <= 200) {
      setIsStickedAnimation(true);
      window.removeEventListener('scroll', onScroll, {
        passive: true,
      });
    }
  };

  const onStepBackward = () => {
    setAnimationStep(prev => prev - 1);
    animationRef.current.setDirection(-1);
    animationRef.current.play();
  };

  const onStepForward = () => {
    setAnimationStep(prev => prev + 1);
    animationRef.current.setDirection(1);
    animationRef.current.play();
  };

  useEffect(() => {
    onScroll = throttle(parallax, 200);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll, { passive: true });
    };
  }, []);

  useEffect(() => {
    if (isStickedAnimation) return;

    initAnimation({ container: lottieFixedRef.current });

    return () => {
      destroyAnimation();
    };
  }, []);

  useEffect(() => {
    if (!isStickedAnimation) return;

    initAnimation({ container: lottieAbsoluteRef.current });

    animationRef.current.addEventListener('drawnFrame', frameEvent => {
      const isFrameInRange = STEP_FRAMES[animationStepRef.current]?.includes(
        Math.ceil(frameEvent.currentTime),
      );

      if (isFrameInRange) {
        animationRef.current.pause();
      }
    });

    animationRef.current.addEventListener('complete', () => {
      // setAnimationStep(prev => (prev === 3 ? 0 : prev + 1));
    });

    animationRef.current.play();
  }, [isStickedAnimation]);

  useEffect(() => {
    swiperRef.current.swiper.slideTo(animationStep);
  }, [animationStep]);

  return (
    <section ref={sectionRef} className="nft-checkout-steps-section container">
      {isStickedAnimation ? (
        <div className="nft-checkout-page__lottie-wrapper nft-checkout-page__lottie-wrapper--absolute">
          <div
            ref={lottieAbsoluteRef}
            className="nft-checkout-page__lottie"
            data-aos="fade"
            data-aos-duration="1000"
            data-aos-anchor-placement="top-bottom"
          ></div>
        </div>
      ) : (
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
      <div className="nft-checkout-steps-section__content">
        <swiper-container
          ref={swiperRef}
          class="nft-checkout-steps-section__list"
          active-index="0"
          loop="true"
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
        <AppButton
          className="nft-checkout-steps-section__slide-btn"
          scheme={APP_BUTTON_SCHEMES.secondary}
          onClick={onStepBackward}
        >
          <svg
            className="nft-checkout-steps-section__slide-btn-icon"
            height="16"
            width="16"
          >
            <use href="/icons/sprite.svg#icon-arrow-right"></use>
          </svg>
        </AppButton>
        <AppButton
          className="nft-checkout-steps-section__slide-btn"
          scheme={APP_BUTTON_SCHEMES.secondary}
          onClick={onStepForward}
        >
          <svg
            className="nft-checkout-steps-section__slide-btn-icon nft-checkout-steps-section__slide-btn-icon--forward"
            height="16"
            width="16"
          >
            <use href="/icons/sprite.svg#icon-arrow-right"></use>
          </svg>
        </AppButton>
      </div>
    </section>
  );
};

export default NftCheckoutStepsSection;
