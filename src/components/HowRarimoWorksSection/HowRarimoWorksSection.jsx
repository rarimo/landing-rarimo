import './HowRarimoWorksSection.scss';

import lottie from 'lottie-web';
import { useCallback, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useIntersection } from 'react-use';

import BaseCard from '@/components/BaseCard';
import { CONFIG } from '@/config';
import { TOUCH_EVENTS } from '@/const';
import { fillFramesRange, getIsInertialScrolling } from '@/helpers';
import useAppContext from '@/hooks/useAppContext';
import useStateRef from '@/hooks/useStateRef';
import { howRarimoWorksSectionList } from '@/template-data';

const STEP_FRAMES = [
  fillFramesRange(40),
  fillFramesRange(120),
  fillFramesRange(212),
];

// const keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

const touches = {
  [TOUCH_EVENTS.touchstart]: { x: -1, y: -1 },
  [TOUCH_EVENTS.touchmove]: { x: -1, y: -1 },
};

const HowRarimoWorksSection = () => {
  const { t } = useTranslation();
  const { isDesktop, isDesktopRef } = useAppContext();

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

  const sectionObserver = useIntersection(sectionRef, {
    root: null,
    rootMargin: `-50% 0px`,
  });

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
    setAnimationStep(prev => prev + 1);
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
      path: '/animation/how-rarimo-works.json',
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

  useEffect(() => {
    const params = {
      direction: 'vertical',
      spaceBetween: 40,
      longSwipes: false,
      allowTouchMove: false,
      grabCursor: false,
      resistance: false,
      speed: 1500,
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

    Object.assign(swiperRef.current, params);

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
    if (!sectionObserver) return;

    if (sectionObserver.isIntersecting) {
      if (sectionObserver.boundingClientRect.top > 0) {
        if (isDesktop) {
          setIsAnimationInProgress(true);
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
      }, 200);
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
    setIsAnimationInProgress(true);
    swiperRef.current?.swiper.slideTo(animationStep);
    animationRef.current?.play();
  }, [animationStep]);

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
          </swiper-slide>

          <swiper-slide class="how-rarimo-works-section__slide how-rarimo-works-section__slide--second">
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
          </swiper-slide>
          <swiper-slide class="how-rarimo-works-section__slide how-rarimo-works-section__slide--third">
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
          </swiper-slide>
        </swiper-container>
      </div>
    </section>
  );
};

export default HowRarimoWorksSection;
