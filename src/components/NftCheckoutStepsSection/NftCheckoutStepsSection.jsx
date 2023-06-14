import './NftCheckoutStepsSection.scss';

import cn from 'classnames';
import { throttle } from 'lodash-es';
import lottie from 'lottie-web';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import AppButton, { APP_BUTTON_SCHEMES } from '@/components/AppButton';
import Portal from '@/components/Portal';
import { ROUTES_PATHS } from '@/const';
import useAppContext from '@/hooks/useAppContext';
import useStateRef from '@/hooks/useStateRef';

let onScroll;

const fillFramesRange = startFrame => {
  return Array(3)
    .fill(null)
    .map((_, i) => startFrame + i);
};

const STEP_FRAMES = [
  fillFramesRange(110),
  fillFramesRange(200),
  fillFramesRange(330),
  fillFramesRange(440),
];

const NftCheckoutStepsSection = () => {
  const { t } = useTranslation();
  const { isDesktop } = useAppContext();

  const sectionRef = useRef(null);
  const animationRef = useRef(null);
  const lottieFixedRef = useRef(null);
  const lottieAbsoluteRef = useRef(null);
  const swiperRef = useRef(null);

  const [isStickedAnimation, setIsStickedAnimation] = useState(false);
  const [animationStep, setAnimationStep, animationStepRef] = useStateRef(0);

  const initAnimation = ({ container }) => {
    if (animationRef.current) {
      destroyAnimation();
    }

    const params = {
      container,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path: '/animation/nft-checkout-demo.json',
    };

    animationRef.current = lottie.loadAnimation(params);

    animationRef.current.addEventListener('drawnFrame', frameEvent => {
      const isFrameInRange = STEP_FRAMES[animationStepRef.current]?.includes(
        Math.ceil(frameEvent.currentTime),
      );

      if (isFrameInRange) {
        animationRef.current.pause();
      }
    });
  };

  const destroyAnimation = () => {
    animationRef.current?.destroy();
  };

  const parallax = () => {
    if (!isDesktop) return;

    const sectionClientRect = sectionRef.current?.getBoundingClientRect();
    if (!sectionClientRect) return;

    if (sectionClientRect.top <= 300) {
      setIsStickedAnimation(true);
      window.removeEventListener('scroll', onScroll, {
        passive: true,
      });
    }
  };

  const isFirstStep = useMemo(() => !animationStep, [animationStep]);
  const isLastStep = useMemo(
    () => animationStep + 1 === STEP_FRAMES.length,
    [animationStep],
  );

  const onStepBackward = () => {
    if (isFirstStep) return;

    setAnimationStep(prev => prev - 1);
    animationRef.current.setDirection(-1);
    animationRef.current.play();
  };

  const onStepForward = () => {
    if (isLastStep) return;

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
    if (!isDesktop) {
      setIsStickedAnimation(true);
    }

    setAnimationStep(0);
    initAnimation({
      container: isStickedAnimation
        ? lottieAbsoluteRef.current
        : lottieFixedRef.current,
    });

    return () => {
      destroyAnimation();
    };
  }, [isDesktop]);

  useEffect(() => {
    if (!isStickedAnimation) return;

    if (lottieFixedRef.current) {
      const parent = lottieFixedRef.current?.parentElement;
      if (!parent) return;

      parent.classList.add(
        'nft-checkout-steps-section__lottie-wrapper--hidden',
      );
      const parentStyles = getComputedStyle(parent);
      const delay = Number.parseFloat(parentStyles.transitionDuration) * 1000;
      setTimeout(() => {
        parent.style.display = 'none';
      }, delay);
    }

    initAnimation({ container: lottieAbsoluteRef.current });

    animationRef.current.play();
  }, [isStickedAnimation]);

  useEffect(() => {
    swiperRef.current.swiper.slideTo(animationStep);
  }, [animationStep]);

  const location = useLocation();

  useEffect(() => {
    if (
      lottieFixedRef.current &&
      location.pathname !== ROUTES_PATHS.nftCheckout
    ) {
      const parent = lottieFixedRef.current?.parentElement;
      if (!parent) return;

      parent?.classList.add(
        'nft-checkout-steps-section__lottie-wrapper--hidden',
      );
    }
  }, [location]);

  return (
    <section
      ref={sectionRef}
      className={cn([
        'nft-checkout-steps-section container',
        {
          'nft-checkout-steps-section--first-frame': !animationStep,
        },
      ])}
    >
      <Portal>
        <div className="nft-checkout-steps-section__lottie-wrapper">
          <div
            ref={lottieFixedRef}
            className="nft-checkout-steps-section__lottie"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-anchor-placement="top-bottom"
          ></div>
        </div>
      </Portal>
      <div className="nft-checkout-steps-section__lottie-wrapper nft-checkout-steps-section__lottie-wrapper--absolute">
        <div
          ref={lottieAbsoluteRef}
          className="nft-checkout-steps-section__lottie"
          data-aos="fade"
          data-aos-duration="1000"
          data-aos-anchor-placement="top-bottom"
        ></div>
      </div>
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
        <div className="nft-checkout-steps-section__slide-btn-wrapper">
          <AppButton
            className="nft-checkout-steps-section__slide-btn"
            scheme={APP_BUTTON_SCHEMES.secondary}
            onClick={onStepBackward}
            disabled={isFirstStep}
          >
            <svg
              className="nft-checkout-steps-section__slide-btn-icon"
              height="20"
              width="20"
            >
              <use href="/icons/sprite.svg#icon-arrow-right"></use>
            </svg>
          </AppButton>
          <AppButton
            className="nft-checkout-steps-section__slide-btn"
            scheme={APP_BUTTON_SCHEMES.secondary}
            onClick={onStepForward}
            disabled={isLastStep}
          >
            <svg
              className="nft-checkout-steps-section__slide-btn-icon nft-checkout-steps-section__slide-btn-icon--forward"
              height="20"
              width="20"
            >
              <use href="/icons/sprite.svg#icon-arrow-right"></use>
            </svg>
          </AppButton>
        </div>
      </div>
    </section>
  );
};

export default NftCheckoutStepsSection;
