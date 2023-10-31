import './HowRarimoWorksSection.scss';

import lottie from 'lottie-web';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import BaseCard from '@/components/BaseCard';
import { CONFIG } from '@/config';
import useAppContext from '@/hooks/useAppContext';
import useStateRef from '@/hooks/useStateRef';
import { howRarimoWorksSectionList } from '@/template-data';

const LAST_STEP_FRAME = 70;
const MAX_SCROLL_RATIO = 2.6;
const AMOUNT_SLIDES = 3;
const SCROLL_SPEED = 4.4;
const SLIDE_HEIGHT = 600;
const LOCK_UP = 0.7;
const TRANSITION = 'opacity 0.8s ease';
const HEIGHT_RATIO = 3.6;
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

const HowRarimoWorksSection = () => {
  const { t } = useTranslation();
  const { isDesktop } = useAppContext();

  const sectionRef = useRef(null);
  const swiperRef = useRef(null);
  const lottieRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);

  const [containerHeight, setContainerHeight] = useState(0);
  const [animationScrollRatio, setAnimationScrollRatio] = useStateRef(0);

  const isSafari = useMemo(() => {
    return (
      navigator.vendor &&
      navigator.vendor.indexOf('Apple') > -1 &&
      navigator.userAgent &&
      navigator.userAgent.indexOf('CriOS') === -1 &&
      navigator.userAgent.indexOf('FxiOS') === -1
    );
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

    animationRef.current.addEventListener('complete', () => {
      animationRef.current.pause();
    });
  }, []);

  const destroyAnimation = () => {
    animationRef.current?.destroy();
  };

  const scrollHandler = () => {
    const scrollHeight = containerHeight * AMOUNT_SLIDES;
    const delta = window.scrollY - sectionRef.current.offsetTop;
    if (delta < 0 || delta > scrollHeight) return;

    animationRef.current.goToAndStop(
      Math.min(
        Math.ceil((delta / scrollHeight) * LAST_STEP_FRAME),
        LAST_STEP_FRAME,
      ),
      true,
    );

    let ratio = Math.min(
      (delta / scrollHeight) * SCROLL_SPEED - LOCK_UP,
      MAX_SCROLL_RATIO,
    );
    if (ratio >= 1 && ratio <= 1 + LOCK_UP) return;
    if (ratio > 1 + LOCK_UP) {
      ratio = ratio - LOCK_UP;
      setAnimationScrollRatio(prevStep => {
        if (prevStep === ratio) return prevStep;
        return ratio;
      });
      return;
    }
    setAnimationScrollRatio(prevStep => {
      if (prevStep === ratio) return prevStep;
      return ratio;
    });
  };

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
    setContainerHeight(containerRef.current?.offsetHeight);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler, { passive: true });

    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, [containerHeight]);

  useEffect(() => {
    if (isDesktop) return;

    Object.assign(swiperRef.current, paramsMobile);

    swiperRef.current.initialize();
  }, [isDesktop, swiperRef.current]);

  return (
    <section
      ref={sectionRef}
      className="how-rarimo-works-section"
      style={{ height: isDesktop ? containerHeight * HEIGHT_RATIO : 'auto' }}
    >
      <div className="how-rarimo-works-section__content container">
        {isDesktop ? (
          <div
            ref={containerRef}
            className="how-rarimo-works-section__swiper-container"
          >
            <div className="how-rarimo-works-section__lottie-wrapper">
              <div
                ref={lottieRef}
                className="how-rarimo-works-section__lottie"
              />
            </div>
            <div
              style={{
                transform: `translate3d(0,-${
                  animationScrollRatio >= 0
                    ? animationScrollRatio * SLIDE_HEIGHT
                    : 0
                }px, 0)`,
                transition: isSafari ? 'initial' : 'transform 0.1s ease',
                height: '3000px',
              }}
            >
              <div
                className="how-rarimo-works-section__slide how-rarimo-works-section__slide--first"
                style={{
                  opacity:
                    animationScrollRatio <= 0
                      ? animationScrollRatio + 1 + LOCK_UP
                      : 1 - animationScrollRatio,
                  transition: TRANSITION,
                }}
              >
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
              <div
                className="how-rarimo-works-section__slide how-rarimo-works-section__slide--second"
                style={{
                  opacity:
                    animationScrollRatio < 1
                      ? animationScrollRatio
                      : 1 - (animationScrollRatio - 1),
                  transition: TRANSITION,
                }}
              >
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
              <div
                className="how-rarimo-works-section__slide how-rarimo-works-section__slide--third"
                style={{
                  opacity: animationScrollRatio - 1,
                  transition: TRANSITION,
                }}
              >
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
            </div>
          </div>
        ) : (
          <swiper-container
            ref={swiperRef}
            class="how-rarimo-works-section__swiper-container"
            init="false"
          >
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
        )}
      </div>
    </section>
  );
};

export default HowRarimoWorksSection;
