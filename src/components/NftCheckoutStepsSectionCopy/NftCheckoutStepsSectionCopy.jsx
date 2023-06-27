import './NftCheckoutStepsSectionCopy.scss';

import cn from 'classnames';
import { throttle } from 'lodash-es';
import lottie from 'lottie-web';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useIntersection } from 'react-use';

import AppButton, { APP_BUTTON_SCHEMES } from '@/components/AppButton';
import useAppContext from '@/hooks/useAppContext';
import useStateRef from '@/hooks/useStateRef';

let onPageScroll;
let onAnimationScroll;
// let sectionBoundingRect;

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

const SCROLL_DIRECTION = {
  up: 'up',
  down: 'down',
};

const NftCheckoutStepsSectionCopy = () => {
  const { t } = useTranslation();
  const { isDesktop } = useAppContext();

  const sectionRef = useRef(null);
  const animationRef = useRef(null);
  const lottieWrapperRef = useRef(null);
  const lottieRef = useRef(null);
  const swiperRef = useRef(null);
  const lottieShiftRef = useRef(null);
  const lastScrollDirectionRef = useRef(SCROLL_DIRECTION.down);

  const [animationStep, setAnimationStep, animationStepRef] = useStateRef(0);
  const [isFirstStep, setIsFirstStep, isFirstStepRef] = useStateRef(true);
  const [isLastStep, setIsLastStep, isLastStepRef] = useStateRef(false);
  // const [lastScrollDirection, setLastScrollDirection, lastScrollDirectionRef] =
  //   useStateRef(SCROLL_DIRECTION.down);

  const [, setIsTransitionInProgress, isTransitionInProgressRef] =
    useStateRef(false);
  const [isFixedSection, setIsFixedSection] = useState(false);

  const onStepBackward = () => {
    // if (isFirstStepRef.current) return;

    setIsTransitionInProgress(true);
    setAnimationStep(prev => prev - 1);
    animationRef.current.setDirection(-1);
    animationRef.current.play();
  };

  const onStepForward = () => {
    // if (isLastStepRef.current) return;

    setIsTransitionInProgress(true);
    setAnimationStep(prev => prev + 1);
    animationRef.current.setDirection(1);
    animationRef.current.play();
  };

  const initAnimation = () => {
    if (animationRef.current) {
      destroyAnimation();
    }

    const params = {
      container: lottieRef.current,
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
        setIsTransitionInProgress(false);
      }
    });

    animationRef.current.addEventListener('complete', () => {
      setIsTransitionInProgress(false);
    });
  };

  const destroyAnimation = () => {
    animationRef.current?.destroy();
  };

  const parallax = () => {
    if (!isDesktop) return;

    const shift = Math.round(lottieShiftRef.current - window.scrollY) * -1;
    console.log(shift);
    lottieWrapperRef.current.style.transform = `translateY(${shift}px)`;
  };

  const sectionIntersection = useIntersection(sectionRef, {
    root: null,
    rootMargin: '0px',
    threshold: 0.95,
  });

  const fixSectionIntoView = () => {
    onAnimationScroll ??= event => {
      event.preventDefault();

      if (isTransitionInProgressRef.current) return;

      if (event.deltaY < 0) {
        lastScrollDirectionRef.current = SCROLL_DIRECTION.down;
        if (isFirstStepRef.current) {
          sectionRef.current.removeEventListener('wheel', onAnimationScroll);
          onAnimationScroll = null;
          return;
        }

        onStepBackward();
      }

      if (event.deltaY > 0) {
        lastScrollDirectionRef.current = SCROLL_DIRECTION.up;
        if (isLastStepRef.current) {
          sectionRef.current.removeEventListener('wheel', onAnimationScroll);
          onAnimationScroll = null;
          return;
        }

        onStepForward();
      }
    };

    sectionRef.current.addEventListener('wheel', onAnimationScroll);
    // document.documentElement.style.setProperty(
    //   'overflow-y',
    //   'hidden',
    //   'important',
    // );
  };

  // const scrollIntoView = () => {
  //   const interval = setInterval(() => {
  //     const isTransitionFinished =
  //       window.scrollY + 100 > sectionBoundingRect.top;
  //     if (isTransitionFinished) {
  //       clearInterval(interval);
  //       return;
  //     }
  //     window.scrollTo({
  //       top:
  //         lastScrollDirectionRef.current === SCROLL_DIRECTION.down
  //           ? window.scrollY + 10
  //           : window.scrollY - 10,
  //       behavior: 'smooth',
  //     });
  //   }, 30);
  //   setTimeout(() => {
  //     clearInterval(interval);
  //   }, 1000);
  // };

  useEffect(() => {
    setIsFixedSection(Boolean(sectionIntersection?.isIntersecting));
  }, [Boolean(sectionIntersection?.isIntersecting)]);

  useEffect(() => {
    if (isFixedSection) {
      // scrollIntoView();
      fixSectionIntoView();
      animationRef.current.play();
      setIsTransitionInProgress(true);

      // sectionRef.current.scrollIntoView({
      //   behavior: 'smooth',
      //   block: 'center',
      // });
      // document.documentElement.style.setProperty(
      //   'overflow-y',
      //   'hidden',
      //   'important',
      // );
    }
  }, [isFixedSection]);

  useEffect(() => {
    if (!isFixedSection && isFirstStep) {
      console.log('play');
      animationRef.current?.setDirection(-1);
      animationRef.current?.play();
    }
  }, [isFixedSection, isFirstStep]);

  useEffect(() => {
    const placeInitialLottieWrapper = () => {
      const HERO_SECTION_PADDING_TOP = 200;

      const initialWrapperShift =
        lottieWrapperRef.current.getBoundingClientRect().top -
        HERO_SECTION_PADDING_TOP;

      lottieShiftRef.current ??= initialWrapperShift;
      lottieWrapperRef.current.style.transform = `translateY(-${initialWrapperShift}px)`;
    };

    placeInitialLottieWrapper();
    onPageScroll ??= throttle(parallax, 15);
    window.addEventListener('scroll', onPageScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onPageScroll, { passive: true });
      onPageScroll = null;
    };
  }, []);

  useEffect(() => {
    setAnimationStep(0);
    initAnimation();

    return () => {
      destroyAnimation();
    };
  }, [isDesktop]);

  useEffect(() => {
    setIsFirstStep(!animationStep);
    setIsLastStep(animationStep + 1 === STEP_FRAMES.length);
  }, [animationStep]);

  useEffect(() => {
    swiperRef.current.swiper.slideTo(animationStep);
  }, [animationStep]);

  return (
    <section
      ref={sectionRef}
      className={cn([
        'nft-checkout-steps-section container',
        {
          'nft-checkout-steps-section--first-frame': isFirstStep,
        },
      ])}
    >
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
        <div
          ref={lottieWrapperRef}
          className="nft-checkout-steps-section__lottie-wrapper"
        >
          <div
            ref={lottieRef}
            className="nft-checkout-steps-section__lottie"
            // data-aos="fade"
            // data-aos-duration="1000"
            // data-aos-anchor-placement="top-bottom"
          ></div>
        </div>
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

export default NftCheckoutStepsSectionCopy;
