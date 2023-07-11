import './NftCheckoutStepsSection.scss';

import useResizeObserver from '@react-hook/resize-observer';
import classNames from 'classnames';
import { throttle } from 'lodash-es';
import lottie from 'lottie-web';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useIntersection } from 'react-use';

import { CONFIG } from '@/config';
import { TOUCH_EVENTS } from '@/const';
import { fillFramesRange, getIsInertialScrolling } from '@/helpers';
import useAppContext from '@/hooks/useAppContext';
import useStateRef from '@/hooks/useStateRef';

const STEP_FRAMES = [
  fillFramesRange(90),
  fillFramesRange(200),
  fillFramesRange(330),
  fillFramesRange(450),
];

const touches = {
  [TOUCH_EVENTS.touchstart]: { x: -1, y: -1 },
  [TOUCH_EVENTS.touchmove]: { x: -1, y: -1 },
};

let onSquareParallax;

const NftCheckoutStepsSection = () => {
  const { t } = useTranslation();
  const { isDesktop, needSkipAnimationRef } = useAppContext();

  const sectionRef = useRef(null);
  const swiperRef = useRef(null);
  const animationRef = useRef(null);
  const lottieWrapperRef = useRef(null);
  const lottieRef = useRef(null);
  const squareOne = useRef(null);
  const squareTwo = useRef(null);
  const lastScrollPositionRef = useRef(0);

  const [isStickySection, setIsStickySection, isStickySectionRef] =
    useStateRef(false);
  const [, setIsAnimationInProgress, isAnimationInProgressRef] =
    useStateRef(false);
  const [animationStep, setAnimationStep, animationStepRef] = useStateRef(0);
  const [, setIsFirstStep, isFirstStepRef] = useStateRef(true);
  const [, setIsLastStep, isLastStepRef] = useStateRef(false);

  const [observerParams, setObserverParams] = useState({
    threshold: 0.25,
  });

  const sectionObserver = useIntersection(sectionRef, observerParams);

  const nextSlide = useCallback(() => {
    if (isLastStepRef.current) {
      setIsStickySection(false);
      const { offsetTop, clientHeight } = sectionRef.current;
      window.scrollTo({
        top: offsetTop + clientHeight,
        behavior: 'smooth',
      });
      return;
    }

    animationRef.current?.setDirection(1);
    setAnimationStep(prev => prev + 1);
  }, []);

  const prevSlide = useCallback(() => {
    if (isFirstStepRef.current) {
      setIsStickySection(false);
      animationRef.current?.setDirection(-1);
      animationRef.current?.play();

      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }, 700);
      return;
    }

    animationRef.current?.setDirection(-1);
    setAnimationStep(prev => prev - 1);
  }, []);

  const wheelHandler = useCallback(event => {
    event.preventDefault();

    const isInertialScrolling = getIsInertialScrolling(event);

    if (
      isInertialScrolling ||
      !isStickySectionRef.current ||
      isAnimationInProgressRef.current
    )
      return;

    if (event.wheelDeltaY < 0) {
      nextSlide();
      return;
    }

    if (event.wheelDeltaY > 0) {
      prevSlide();
      return;
    }
  }, []);

  const touchHandler = useCallback(event => {
    event.preventDefault();

    if (
      !isStickySectionRef.current ||
      isAnimationInProgressRef.current ||
      !event?.touches
    )
      return;

    const touch = event.touches[0];
    switch (event.type) {
      case TOUCH_EVENTS.touchstart:
      case TOUCH_EVENTS.touchmove:
        touches[event.type].x = touch.pageX;
        touches[event.type].y = touch.pageY;
        break;
      case TOUCH_EVENTS.touchend:
        if (touches.touchstart.y > touches.touchmove.y) {
          nextSlide();
        } else {
          prevSlide();
        }
    }
  }, []);

  // const preventDefaultForScrollKeys = useCallback(event => {
  //   if (keys[event.keyCode]) {
  //     preventDefault(event);
  //     return false;
  //   }
  // }, []);

  const disableScroll = useCallback(() => {
    window.addEventListener('wheel', wheelHandler, { passive: false });
    window.addEventListener(TOUCH_EVENTS.touchstart, touchHandler, {
      passive: false,
    });
    window.addEventListener(TOUCH_EVENTS.touchmove, touchHandler, {
      passive: false,
    });
    window.addEventListener(TOUCH_EVENTS.touchend, touchHandler, {
      passive: false,
    });
    // window.addEventListener('keydown', preventDefaultForScrollKeys, false);
  }, []);

  const enableScroll = useCallback(() => {
    window.removeEventListener('wheel', wheelHandler, { passive: false });
    window.removeEventListener(TOUCH_EVENTS.touchstart, touchHandler, {
      passive: false,
    });
    window.removeEventListener(TOUCH_EVENTS.touchmove, touchHandler, {
      passive: false,
    });
    window.removeEventListener(TOUCH_EVENTS.touchend, touchHandler, {
      passive: false,
    });
    // window.removeEventListener('keydown',
    // preventDefaultForScrollKeys, false);
  }, []);

  const initAnimation = useCallback(() => {
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
      const currentFrame = Math.ceil(frameEvent.currentTime);
      const isFrameInRange =
        STEP_FRAMES[animationStepRef.current]?.includes(currentFrame);

      if (
        (isFrameInRange && isStickySectionRef.current) ||
        currentFrame === 0
      ) {
        animationRef.current.pause();
        setIsAnimationInProgress(false);
      }
    });

    animationRef.current.addEventListener('complete', () => {
      animationRef.current.pause();
      setIsAnimationInProgress(false);
    });
  }, []);

  const destroyAnimation = () => {
    animationRef.current?.destroy();
  };

  const changeObserverParams = () => {
    const { clientHeight } = sectionRef.current;
    const threshold = (window.screen.availHeight * 0.75) / clientHeight;
    setObserverParams({ threshold });
  };

  const placeLottieWrapperOnContainer = () => {
    const sectionWidth = sectionRef.current.getBoundingClientRect().width;
    const right = (screen.availWidth - sectionWidth) / 2;

    lottieWrapperRef.current.style.right = `${right}px`;
  };

  useResizeObserver(document.documentElement, () => {
    changeObserverParams();
    placeLottieWrapperOnContainer();
  });

  const squareParallax = useCallback(() => {
    if (!squareOne.current || !squareTwo.current) return;

    const currentScrollPosition = window.scrollY;

    const sectionOffsetTop = sectionRef.current.offsetTop;
    const sectionShift = sectionOffsetTop / 2 - currentScrollPosition;

    let translate1 = 0;
    let translate2 = 0;
    let opacity = 1;
    const speed1 = 0.9;
    const speed2 = 1.2;

    if (sectionShift * -1 > screen.availHeight) return;

    opacity = 1 - currentScrollPosition / sectionOffsetTop;
    squareOne.current.style.opacity = `${opacity}`;
    squareTwo.current.style.opacity = `${opacity}`;

    if (sectionShift < 0) {
      translate1 = sectionShift * speed1;
      translate2 = sectionShift * speed2;
    }

    lastScrollPositionRef.current = currentScrollPosition;

    squareOne.current.style.transform = `translateY(${translate1}px)`;
    squareTwo.current.style.transform = `translateY(${translate2}px)`;
  }, []);

  useEffect(() => {
    setAnimationStep(0);
    initAnimation();

    return () => {
      destroyAnimation();
    };
  }, [isDesktop]);

  useEffect(() => {
    if (!sectionObserver || needSkipAnimationRef.current) return;

    if (sectionObserver.isIntersecting) {
      if (sectionObserver.boundingClientRect.top > 0) {
        setIsAnimationInProgress(true);
        animationRef.current?.setDirection(1);
        animationRef.current?.play();

        window.scrollTo({
          top: sectionRef.current.offsetTop + 200,
          behavior: 'smooth',
        });
      } else {
        const { offsetTop, clientHeight } = sectionRef.current;
        window.scrollTo({
          top: offsetTop + clientHeight / 2,
          behavior: 'smooth',
        });
      }

      setTimeout(() => {
        setIsStickySection(true);
        disableScroll();
      }, CONFIG.htmlScrollingTime);
      return;
    }

    if (!sectionObserver.isIntersecting) {
      // if (sectionObserver.boundingClientRect.top > 0) {
      //   animationRef.current?.setDirection(-1);
      //   animationRef.current?.play();
      // }

      setIsStickySection(false);
      enableScroll();
    }
  }, [Boolean(sectionObserver?.isIntersecting)]);

  useEffect(() => {
    setIsAnimationInProgress(true);
    swiperRef.current?.swiper?.slideTo(animationStep);
    animationRef.current?.play();
  }, [animationStep]);

  useEffect(() => {
    const params = {
      direction: 'vertical',
      autoHeight: true,
      spaceBetween: 0,
      longSwipes: false,
      allowTouchMove: false,
      grabCursor: false,
      resistance: false,
      speed: 1200,
      effect: 'fade',
      on: {
        slideChangeTransitionStart({ activeIndex }) {
          const isFirstStep = activeIndex === 0;
          const isLastStep = activeIndex === 3;
          setIsFirstStep(isFirstStep);
          setIsLastStep(isLastStep);

          sectionRef.current.scrollIntoView({
            block: isLastStep ? 'end' : isFirstStep ? 'start' : 'center',
            behavior: 'smooth',
          });
        },
      },
      a11y: {
        slideRole: 'listitem',
        containerRoleDescriptionMessage: 'NFT Checkout flow',
        itemRoleDescriptionMessage: 'NFT Checkout step',
      },
    };

    Object.assign(swiperRef.current, params);

    swiperRef.current.initialize();
  }, []);

  useEffect(() => {
    const removeListeners = () => {
      window.removeEventListener('scroll', onSquareParallax, {
        passive: true,
      });
      onSquareParallax = null;
    };

    if (isDesktop) {
      onSquareParallax = throttle(squareParallax, 15);

      window.addEventListener('scroll', onSquareParallax, { passive: true });
      return;
    }

    if (!isDesktop) {
      removeListeners();
    }

    return () => {
      removeListeners();
    };
  }, [isDesktop]);

  useEffect(() => {
    return () => {
      enableScroll();
    };
  }, []);

  useEffect(() => {
    changeObserverParams();
    placeLottieWrapperOnContainer();
  }, []);

  return (
    <>
      <div
        ref={lottieWrapperRef}
        className={classNames([
          'nft-checkout-steps-section__lottie-wrapper',
          {
            'nft-checkout-steps-section__lottie-wrapper--sticky':
              isStickySection,
          },
        ])}
      >
        <div ref={lottieRef} className="nft-checkout-steps-section__lottie" />
        {isDesktop && (
          <>
            <div
              ref={squareOne}
              className="nft-checkout-steps-section__parallax-square nft-checkout-steps-section__parallax-square--first"
            />
            <div
              ref={squareTwo}
              className="nft-checkout-steps-section__parallax-square nft-checkout-steps-section__parallax-square--second"
            />
          </>
        )}
      </div>
      <section
        ref={sectionRef}
        className="nft-checkout-steps-section container"
      >
        <swiper-container
          ref={swiperRef}
          class="nft-checkout-steps-section__swiper-container"
          init="false"
        >
          <swiper-slide class="nft-checkout-steps-section__slide">
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
          <swiper-slide class="nft-checkout-steps-section__slide">
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
          <swiper-slide class="nft-checkout-steps-section__slide">
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
          <swiper-slide class="nft-checkout-steps-section__slide">
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
      </section>
    </>
  );
};

export default NftCheckoutStepsSection;
