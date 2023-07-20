import './HowRarimoWorksSection.scss';

import useResizeObserver from '@react-hook/resize-observer';
import lottie from 'lottie-web';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import BaseCard from '@/components/BaseCard';
import { CONFIG } from '@/config';
import {
  ANIMATION_FRAMES,
  DIRECTIONS,
  LOTTIE_PARAMS,
  OFFSET_SCROLL,
  SWIPER_PARAMS,
  SWIPER_PARAMS_MOBILE,
  SWIPER_PROGRESS,
  // TOUCH_EVENTS,
  // TOUCHES,
} from '@/const';
import { scrollToTop } from '@/helpers';
import useAppContext from '@/hooks/useAppContext';
import useStateRef from '@/hooks/useStateRef';
import { howRarimoWorksSectionList } from '@/template-data';

const HowRarimoWorksSection = () => {
  const { t } = useTranslation();
  const { isDesktop, needSkipAnimationRef } = useAppContext();

  const sectionRef = useRef(null);
  const swiperRef = useRef(null);
  const lottieWrapperRef = useRef(null);
  const lottieRef = useRef(null);
  const animationRef = useRef(null);

  const [
    isAnimationInProgress,
    setIsAnimationInProgress,
    isAnimationInProgressRef,
  ] = useStateRef(false);
  const [animationStep, setAnimationStep, animationStepRef] = useStateRef(0);
  const [, setIsFirstStep, isFirstStep] = useStateRef(true);
  const [, setIsLastStep, isLastStep] = useStateRef(false);
  const [, setIsScrolling, isScrolling] = useStateRef(false);
  const [, setScrollDirection, scrollDirection] = useStateRef(DIRECTIONS.next);

  const [observerParams, setObserverParams] = useState({
    threshold: 0.1,
  });

  let sectionObserver;

  const initAnimation = useCallback(() => {
    if (animationRef.current) destroyAnimation();

    animationRef.current = lottie.loadAnimation({
      container: lottieRef.current,
      ...LOTTIE_PARAMS,
    });

    animationRef.current.addEventListener('drawnFrame', frameEvent => {
      const currentFrame = Math.trunc(frameEvent.currentTime);
      const stopFrame = ANIMATION_FRAMES[animationStepRef.current];

      const isFrameAcqured =
        scrollDirection.current === DIRECTIONS.next
          ? currentFrame < stopFrame
          : currentFrame > stopFrame;

      if (!stopFrame || !currentFrame || isFrameAcqured) return;

      animationRef.current.pause();
      setIsAnimationInProgress(false);
    });
  }, []);

  const destroyAnimation = () => {
    animationRef.current?.destroy();
  };

  const handleIntersectionChange = entries => {
    if (!sectionObserver || needSkipAnimationRef.current) return;

    entries.forEach(entry => {
      console.log(entry.isIntersecting);
      entry.isIntersecting
        ? handleIntersectingEntry(entry)
        : handleNonIntersectingEntry(entry);
    });
  };

  const handleIntersectingEntry = entry => {
    const { offsetTop, clientHeight } = sectionRef.current;
    const visibleScrollTopCount = sectionRef.current.offsetTop + OFFSET_SCROLL;
    const invisibleScrollTopCount = offsetTop + clientHeight / 2;

    // sectionRef.current.scrollIntoView(true)

    sectionRef.current.scrollIntoView({
      block: 'start',
      behavior: 'smooth',
      inline: 'start',
    });

    // scrollToTop(
    //   entry.boundingClientRect.top > 0
    //     ? visibleScrollTopCount
    //     : invisibleScrollTopCount,
    // );

    if (isAnimationInProgress) return;

    // isLastStep.current
    setTimeout(() => {
      _listenScroll();
    }, 1000);
    // : _listenScroll();

    if (isFirstStep.current) setIsAnimationInProgress(true);
  };

  const handleNonIntersectingEntry = entry => {
    const isAboveSection = entry.boundingClientRect.top > 0;
    swiperRef.current?.swiper.setProgress(
      isAboveSection ? SWIPER_PROGRESS.zero : SWIPER_PROGRESS.one,
      0,
    );

    _unlistenScroll();
  };

  const wheelHandler = useCallback(
    event => {
      if (!isDesktop) return;

      event.preventDefault();

      if (isScrolling.current || isAnimationInProgressRef.current) {
        return;
      }

      if (!isLastStep.current) {
        setIsAnimationInProgress(true);
      }
      if (isLastStep.current && event.wheelDeltaY > 0) {
        setIsAnimationInProgress(true);
      }

      event.wheelDeltaY && event.wheelDeltaY < 0 ? nextSlide() : prevSlide();
      setIsScrolling(true);

      setTimeout(() => {
        setIsScrolling(false);
      }, 1500);
    },
    [isAnimationInProgress, isAnimationInProgressRef],
  );

  // const touchHandler = useCallback(event => {
  //   if (!isDesktop) return;
  //
  //   event.preventDefault();
  //
  //   if (
  //     !isStickySectionRef.current ||
  //     isAnimationInProgressRef.current ||
  //     !event?.touches
  //   )
  //     return;
  //
  //   const touch = event.touches[0];
  //   switch (event.type) {
  //     case TOUCH_EVENTS.touchstart:
  //     case TOUCH_EVENTS.touchmove:
  //       TOUCHES[event.type].x = touch.pageX;
  //       TOUCHES[event.type].y = touch.pageY;
  //       break;
  //     case TOUCH_EVENTS.touchend:
  //       TOUCHES.touchstart.y > TOUCHES.touchmove.y ? nextSlide() : prevSlide();
  //   }
  // }, []);

  const _listenScroll = useCallback(() => {
    if (!isDesktop) return;
    window.addEventListener('wheel', wheelHandler, { passive: false });
    // window.addEventListener(TOUCH_EVENTS.touchstart, touchHandler, {
    //   passive: false,
    // });
    // window.addEventListener(TOUCH_EVENTS.touchmove, touchHandler, {
    //   passive: false,
    // });
    // window.addEventListener(TOUCH_EVENTS.touchend, touchHandler, {
    //   passive: false,
    // });
  }, []);

  const _unlistenScroll = useCallback(() => {
    if (!isDesktop) return;
    window.removeEventListener('wheel', wheelHandler, { passive: false });
    // window.removeEventListener(TOUCH_EVENTS.touchstart, touchHandler, {
    //   passive: false,
    // });
    // window.removeEventListener(TOUCH_EVENTS.touchmove, touchHandler, {
    //   passive: false,
    // });
    // window.removeEventListener(TOUCH_EVENTS.touchend, touchHandler, {
    //   passive: false,
    // });
  }, []);

  const nextSlide = useCallback(() => {
    if (isLastStep.current) {
      scrollToTop(sectionRef.current?.nextSibling?.offsetTop);
    }

    setScrollDirection(DIRECTIONS.next);
    animationRef.current?.setDirection(DIRECTIONS.next);

    setAnimationStep(prev => {
      const res = prev + 1;
      return res > 2 ? 2 : res;
    });
  }, []);

  const prevSlide = useCallback(() => {
    if (isFirstStep.current) scrollToTop(0);

    setScrollDirection(DIRECTIONS.prev);
    animationRef.current?.setDirection(DIRECTIONS.prev);

    setAnimationStep(prev => {
      const res = prev - 1;
      return res < 0 ? 0 : res;
    });
  }, []);

  useEffect(() => {
    const params = {
      ...SWIPER_PARAMS,
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
        slideChangeTransitionEnd(args) {
          setIsAnimationInProgress(false);
          // console.log(args);
        },
      },
    };

    Object.assign(swiperRef.current, isDesktop ? params : SWIPER_PARAMS_MOBILE);

    swiperRef.current.initialize();
  }, []);

  useEffect(() => {
    if (sectionObserver || !sectionRef.current || !isDesktop) return;

    sectionObserver = new IntersectionObserver(
      handleIntersectionChange,
      observerParams,
    );
    sectionObserver.observe(sectionRef.current);
  }, [sectionRef.current]);

  useEffect(() => {
    if (isDesktop) initAnimation();
    return destroyAnimation;
  }, [isDesktop]);

  useEffect(() => {
    const swiper = swiperRef.current?.swiper;
    if (!swiper || !isAnimationInProgress) return;

    swiper.slideTo(animationStep);
    animationRef.current?.play();
  }, [animationStep, isAnimationInProgress]);

  const changeObserverParams = () => {
    if (!isDesktop) return;
    const { clientHeight } = sectionRef.current;
    const threshold = (window.screen.availHeight * 0.75) / clientHeight;
    setObserverParams({ threshold });
  };

  useResizeObserver(document.documentElement, changeObserverParams);

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
