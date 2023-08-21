import './HowRarimoWorksSection.scss';

import useResizeObserver from '@react-hook/resize-observer';
import lottie from 'lottie-web';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useIntersection } from 'react-use';

import BaseCard from '@/components/BaseCard';
import { CONFIG } from '@/config';
import { TOUCH_EVENTS } from '@/const';
import { fillFramesRange, getIsInertialScrolling } from '@/helpers';
import useAppContext from '@/hooks/useAppContext';
import useStateRef from '@/hooks/useStateRef';
import { howRarimoWorksSectionList } from '@/template-data';

const LAST_STEP_FRAME = 95;

const STEP_FRAMES = [
  fillFramesRange(25),
  fillFramesRange(55),
  fillFramesRange(LAST_STEP_FRAME),
];

// const keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

const touches = {
  [TOUCH_EVENTS.touchstart]: { x: -1, y: -1 },
  [TOUCH_EVENTS.touchmove]: { x: -1, y: -1 },
};

const HowRarimoWorksSection = () => {
  const { t } = useTranslation();
  const { isDesktop, isDesktopRef, needSkipAnimationRef } = useAppContext();

  const sectionRef = useRef(null);
  const swiperRef = useRef(null);
  const lottieWrapperRef = useRef(null);
  const lottieRef = useRef(null);
  const animationRef = useRef(null);

  const [, setIsStickySection, isStickySectionRef] = useStateRef(false);
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
      window.scrollTo({
        top: sectionRef.current?.nextSibling?.offsetTop,
        behavior: 'smooth',
      });
      return;
    }
    animationRef.current?.setDirection(1);
    setAnimationStep(prev => (prev + 1 > 2 ? 2 : prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    if (isFirstStepRef.current) {
      setIsStickySection(false);
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      return;
    }

    animationRef.current?.setDirection(-1);
    setAnimationStep(prev => (prev - 1 < 0 ? 0 : prev - 1));
  }, []);

  const wheelHandler = useCallback(event => {
    if (!isDesktop) return;
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
    }
  }, []);

  const touchHandler = useCallback(event => {
    if (!isDesktop) return;

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
    if (!isDesktop) return;

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
    if (!isDesktop) return;
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
      path: '/animation/how-rarimo-works.json',
    };

    animationRef.current = lottie.loadAnimation(params);
    animationRef.current.setSpeed(1.5);
    animationRef.current.addEventListener('drawnFrame', frameEvent => {
      const currentFrame = Math.ceil(frameEvent.currentTime);
      const isFrameInRange =
        STEP_FRAMES[animationStepRef.current]?.includes(currentFrame);

      if (isFrameInRange) {
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
    if (!isDesktop) return;
    const { clientHeight } = sectionRef.current;
    const threshold = (window.screen.availHeight * 0.75) / clientHeight;
    setObserverParams({ threshold });
  };

  useResizeObserver(document.documentElement, () => {
    changeObserverParams();
  });

  useEffect(() => {
    const params = {
      longSwipes: false,
      allowTouchMove: false,
      grabCursor: false,
      resistance: false,
      speed: 1000,
      mousewheel: {
        thresholdDelta: 4,
      },
      effect: 'creative',
      creativeEffect: {
        limitProgress: 2,
        prev: {
          translate: [0, '-106%', 1],
        },
        next: {
          translate: [0, '4vh', 0],
          scale: 0.95,
          opacity: 0.95,
        },
      },
      on: {
        slideChangeTransitionStart({ activeIndex }) {
          const isFirstStep = activeIndex === 0;
          const isLastStep = activeIndex === 2;
          setIsFirstStep(isFirstStep);
          setIsLastStep(isLastStep);

          sectionRef.current.scrollIntoView({
            block: isLastStep ? 'end' : isFirstStep ? 'start' : 'center',
            behavior: 'smooth',
          });
        },
        slideChangeTransitionEnd() {
          if (!isDesktopRef.current) {
            setIsAnimationInProgress(false);
          }
        },
      },
    };

    const paramsMobile = {
      slidesPerView: 'auto',
      pagination: true,
      autoHeight: true,
      grabCursor: true,
      resistanceRatio: 0.5,
      spaceBetween: 8,
      mousewheelForceToAxis: true,
      edgeSwipeDetection: true,
      autoplay: false,
      freeMode: false,
      lazyLoadingInPrevNext: true,
      cssMode: true,
      effect: 'coverflow',
      coverflowEffect: {
        rotate: 5,
        scale: 0.98,
      },
    };

    Object.assign(swiperRef.current, isDesktop ? params : paramsMobile);

    swiperRef.current.initialize();
  }, []);

  useEffect(() => {
    return () => {
      enableScroll();
    };
  }, []);

  useEffect(() => {
    if (isDesktop) {
      initAnimation();
    } else {
      destroyAnimation();
    }

    return () => {
      destroyAnimation();
    };
  }, [isDesktop]);

  useEffect(() => {
    if (!isDesktop) return;
    if (!sectionObserver || needSkipAnimationRef.current) return;

    if (sectionObserver.isIntersecting) {
      if (sectionObserver.boundingClientRect.top > 0) {
        if (isDesktop) {
          setIsAnimationInProgress(true);
          swiperRef.current?.swiper.slideTo(animationStep);
          animationRef.current?.setDirection(1);
          animationRef.current?.play();
        } else {
          setIsAnimationInProgress(false);
        }

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
      if (sectionObserver.boundingClientRect.top > 0 && isDesktop) {
        animationRef.current?.setDirection(-1);
        animationRef.current?.play();
      }

      setIsStickySection(false);
      enableScroll();
    }
  }, [Boolean(sectionObserver?.isIntersecting)]);

  useEffect(() => {
    if (!isDesktop) return;
    if (!sectionObserver) return;

    if (!sectionObserver.isIntersecting) {
      const isAboveSection = sectionObserver.boundingClientRect.top > 0;
      swiperRef.current?.swiper.setProgress(isAboveSection ? 0 : 1, 0);
      animationRef.current?.goToAndStop(
        isAboveSection ? 0 : LAST_STEP_FRAME,
        true,
      );

      if (isAboveSection) {
        setAnimationStep(0);
        animationRef.current.setDirection(1);
        animationRef.current?.play();
        setIsAnimationInProgress(true);
        swiperRef.current?.swiper.slideTo(animationStep);
      }
    }
  }, [Boolean(sectionObserver?.isIntersecting)]);

  useEffect(() => {
    setIsAnimationInProgress(true);
    swiperRef.current?.swiper.slideTo(animationStep);
    animationRef.current?.play();
  }, [animationStep]);

  useEffect(() => {
    changeObserverParams();
  }, []);

  return (
    <section ref={sectionRef} className="how-rarimo-works-section">
      <div className="how-rarimo-works-section__content container">
        <swiper-container
          ref={swiperRef}
          class="how-rarimo-works-section__swiper-container"
          init="false"
        >
          <div slot="container-end">
            {isDesktop && (
              <div
                ref={lottieWrapperRef}
                className="how-rarimo-works-section__lottie-wrapper"
              >
                <div
                  ref={lottieRef}
                  className="how-rarimo-works-section__lottie"
                ></div>
              </div>
            )}
          </div>
          <swiper-slide class="how-rarimo-works-section__slide how-rarimo-works-section__slide--first">
            <div class="swiper-slide-transform">
              <BaseCard
                className="how-rarimo-works-section__card"
                isSection={true}
              >
                <div className="how-rarimo-works-section__card-content">
                  <h5 className="how-rarimo-works-section__subtitle">
                    {t('how-rarimo-works-section.main.subtitle')}
                  </h5>

                  <h2 className="how-rarimo-works-section__title">
                    {t('how-rarimo-works-section.main.title')}
                  </h2>
                  <p className="how-rarimo-works-section__description">
                    {t('how-rarimo-works-section.main.description')}
                  </p>
                  <ul className="how-rarimo-works-section__list">
                    {howRarimoWorksSectionList.main.map((item, index) => (
                      <li key={index}>
                        <h6 className="how-rarimo-works-section__list-item-title">
                          <span>{t(item.titleKey)}</span>
                          <div className="how-rarimo-works-section__list-item-icon">
                            <svg height="24" width="24">
                              <use href={item.icon}></use>
                            </svg>
                          </div>
                        </h6>
                        <p className="how-rarimo-works-section__list-item-description">
                          {t(item.textKey)}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </BaseCard>
            </div>
          </swiper-slide>

          <swiper-slide class="how-rarimo-works-section__slide how-rarimo-works-section__slide--second">
            <div class="swiper-slide-transform">
              <BaseCard
                className="how-rarimo-works-section__card how-rarimo-works-section__card--protocol how-rarimo-works-section--identity"
                isSection={true}
              >
                <div className="how-rarimo-works-section__card-content">
                  <div className="how-rarimo-works-section__subtitle-wrapper">
                    <h5 className="how-rarimo-works-section__protocol-subtitle">
                      {t('how-rarimo-works-section.protocol-subtitle')}
                    </h5>
                    <a
                      className="how-rarimo-works-section__docs-link"
                      href={CONFIG.docsLink}
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                    >
                      {t('how-rarimo-works-section.docs-link')}
                    </a>
                  </div>

                  <h2 className="how-rarimo-works-section__title">
                    {t('how-rarimo-works-section.identity.title')}
                  </h2>
                  <p className="how-rarimo-works-section__description">
                    {t('how-rarimo-works-section.identity.description')}
                  </p>
                  <ul className="how-rarimo-works-section__protocol-list">
                    {howRarimoWorksSectionList.identity.map((item, index) => (
                      <li
                        className="how-rarimo-works-section__protocol-list-item"
                        key={index}
                      >
                        <span className="how-rarimo-works-section__protocol-accent-text">
                          {t(item.accentTextKey)}
                        </span>
                        <span>{t(item.textKey)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </BaseCard>
            </div>
          </swiper-slide>
          <swiper-slide class="how-rarimo-works-section__slide how-rarimo-works-section__slide--third">
            <div class="swiper-slide-transform">
              <BaseCard
                className="how-rarimo-works-section__card how-rarimo-works-section__card--protocol how-rarimo-works-section--bridging"
                isSection={true}
              >
                <div className="how-rarimo-works-section__card-content">
                  <div className="how-rarimo-works-section__subtitle-wrapper">
                    <h5 className="how-rarimo-works-section__protocol-subtitle">
                      {t('how-rarimo-works-section.protocol-subtitle')}
                    </h5>
                    <a
                      className="how-rarimo-works-section__docs-link"
                      href={CONFIG.docsLink}
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                    >
                      {t('how-rarimo-works-section.docs-link')}
                    </a>
                  </div>

                  <h2 className="how-rarimo-works-section__title">
                    {t('how-rarimo-works-section.bridging.title')}
                  </h2>
                  <p className="how-rarimo-works-section__description">
                    {t('how-rarimo-works-section.bridging.description')}
                  </p>
                  <ul className="how-rarimo-works-section__protocol-list">
                    {howRarimoWorksSectionList.bridging.map((item, index) => (
                      <li
                        className="how-rarimo-works-section__protocol-list-item"
                        key={index}
                      >
                        <span className="how-rarimo-works-section__protocol-accent-text">
                          {t(item.accentTextKey)}
                        </span>
                        <span>{t(item.textKey)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </BaseCard>
            </div>
          </swiper-slide>
        </swiper-container>
      </div>
    </section>
  );
};

export default HowRarimoWorksSection;
