import './HowRarimoWorksSection.scss';

import useResizeObserver from '@react-hook/resize-observer';
import { debounce } from 'lodash-es';
import lottie from 'lottie-web';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import BaseCard from '@/components/BaseCard';
import { CONFIG } from '@/config';
import {
  DEBOUNCE_DELAY,
  DIRECTIONS,
  LAST_STEP_FRAME,
  LOTTIE_PARAMS,
  OFFSET_SCROLL,
  STEP_FRAMES,
  SWIPER_PARAMS,
  SWIPER_PARAMS_MOBILE,
  SWIPER_PROGRESS,
  TOUCH_EVENTS,
  TOUCHES,
} from '@/const';
import { getIsInertialScrolling, scrollToTop } from '@/helpers';
import useAppContext from '@/hooks/useAppContext';
import useStateRef from '@/hooks/useStateRef';
import { howRarimoWorksSectionList } from '@/template-data';

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

  let sectionObserver;
  let observeEntry;

  function handleIntersectionChange(entries) {
    if (!isDesktop || !sectionObserver || needSkipAnimationRef.current) return;

    entries.forEach(entry => {
      entry.isIntersecting
        ? handleIntersectingEntry(entry)
        : handleNonIntersectingEntry(entry);
    });
  }

  function handleIntersectingEntry(entry) {
    if (entry.boundingClientRect.top > 0 || isFirstStepRef.current) {
      observeEntry = entry;
      if (isDesktop) {
        setIsAnimationInProgress(true);
        swiperRef.current?.swiper.slideTo(animationStep);
        animationRef.current?.setDirection(DIRECTIONS.next);
        animationRef.current?.play();
      } else {
        setIsAnimationInProgress(false);
      }
      scrollToTop(sectionRef.current.offsetTop + OFFSET_SCROLL);
    } else {
      const { offsetTop, clientHeight } = sectionRef.current;
      scrollToTop(offsetTop + clientHeight / 2);
    }

    setTimeout(() => {
      setIsStickySection(true);
      disableScroll();
    }, CONFIG.htmlScrollingTime);
  }

  function handleNonIntersectingEntry(entry) {
    if (entry.boundingClientRect.top > 0 && isDesktop) {
      animationRef.current?.setDirection(DIRECTIONS.last);
      animationRef.current?.play();
    }

    setIsStickySection(false);
    enableScroll();
  }

  useEffect(() => {
    if (sectionObserver || !sectionRef.current) return;
    sectionObserver = new IntersectionObserver(
      handleIntersectionChange,
      observerParams,
    );
    sectionObserver.observe(sectionRef.current);
  }, [sectionRef.current]);

  const nextSlide = useCallback(
    debounce(() => {
      if (isLastStepRef.current) {
        setIsStickySection(false);
        scrollToTop(sectionRef.current?.nextSibling?.offsetTop);
        return;
      }
      animationRef.current?.setDirection(DIRECTIONS.next);
      setAnimationStep(prev => prev + 1);
    }, DEBOUNCE_DELAY),
    [],
  );

  const prevSlide = useCallback(
    debounce(() => {
      if (isFirstStepRef.current) {
        setIsStickySection(false);
        scrollToTop(0);
        return;
      }

      animationRef.current?.setDirection(DIRECTIONS.last);
      setAnimationStep(prev => prev - 1);
    }, DEBOUNCE_DELAY),
    [],
  );

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
      return;
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
        TOUCHES[event.type].x = touch.pageX;
        TOUCHES[event.type].y = touch.pageY;
        break;
      case TOUCH_EVENTS.touchend:
        TOUCHES.touchstart.y > TOUCHES.touchmove.y ? nextSlide() : prevSlide();
    }
  }, []);

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
  }, []);

  const initAnimation = useCallback(() => {
    if (animationRef.current) {
      destroyAnimation();
    }

    const params = { container: lottieRef.current, ...LOTTIE_PARAMS };

    animationRef.current = lottie.loadAnimation(params);
    animationRef.current.addEventListener('drawnFrame', frameEvent => {
      const currentFrame = Math.ceil(frameEvent.currentTime);
      const isFrameInRange =
        STEP_FRAMES[animationStepRef.current]?.includes(currentFrame);

      if (isFrameInRange || !currentFrame) {
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
        slideChangeTransitionEnd() {
          if (!isDesktopRef.current) {
            setIsAnimationInProgress(false);
          }
        },
      },
    };

    Object.assign(swiperRef.current, isDesktop ? params : SWIPER_PARAMS_MOBILE);

    swiperRef.current.initialize();
  }, []);

  useEffect(
    () => () => {
      enableScroll();
    },
    [],
  );

  useEffect(() => {
    isDesktop ? initAnimation() : destroyAnimation();

    return () => {
      destroyAnimation();
    };
  }, [isDesktop]);

  useEffect(() => {
    const isIntersecting = Boolean(
      !isDesktop ||
        !sectionObserver ||
        !observeEntry ||
        observeEntry.isIntersecting,
    );

    if (isIntersecting) return;

    const isAboveSection = observeEntry.boundingClientRect.top > 0;
    swiperRef.current?.swiper.setProgress(
      isAboveSection ? SWIPER_PROGRESS.zero : SWIPER_PROGRESS.one,
      0,
    );
    animationRef.current?.goToAndStop(
      isAboveSection ? 0 : LAST_STEP_FRAME,
      true,
    );
  }, [Boolean(observeEntry?.isIntersecting)]);

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
