import './HowRarimoWorksSection.scss';

import { throttle } from 'lodash-es';
import lottie from 'lottie-web';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useIntersection } from 'react-use';

import BaseCard from '@/components/BaseCard';
import { CONFIG } from '@/config';
import useAppContext from '@/hooks/useAppContext';
import { howRarimoWorksSectionList } from '@/template-data';

let onScroll;
let firstCardInitialRect;
let secondCardInitialRect;

const fillFramesRange = startFrame => {
  return Array(1)
    .fill(null)
    .map((_, i) => startFrame + i);
};

const STEP_FRAMES = [fillFramesRange(20)];

const MUTABLE_SCALE_VALUE = 0.05;
const DEFAULT_SECOND_CARD_SCALE = 0.95;
const DEFAULT_THIRD_CARD_SCALE = 0.9;
const CARD_VISIBILITY_VALUE = 0.85;

const HowRarimoWorksSection = () => {
  const { t } = useTranslation();
  const { isDesktop } = useAppContext();

  const sectionRef = useRef(null);
  const firstCardRef = useRef(null);
  const secondCardRef = useRef(null);
  const thirdCardRef = useRef(null);
  const lottieWrapperRef = useRef(null);
  const lottieRef = useRef(null);
  const animationRef = useRef(null);

  const firstCardObserver = useIntersection(firstCardRef, {
    root: null,
    rootMargin: '0px',
    threshold: 0.85,
  });

  const initAnimation = () => {
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
      const isFrameInRange = STEP_FRAMES[0]?.includes(
        Math.ceil(frameEvent.currentTime),
      );
      if (isFrameInRange) {
        animationRef.current?.pause();
      }
    });
  };

  const destroyAnimation = () => {
    animationRef.current?.destroy();
  };

  const setLottieWrapperOpacity = () => {
    if (!isDesktop) return;

    const thirdCardRect = thirdCardRef.current.getBoundingClientRect();

    const THRESHOLD = 100;

    const thirdCardBottomScroll =
      thirdCardRect.height - thirdCardRect.bottom + THRESHOLD;

    if (thirdCardBottomScroll < 0) {
      lottieWrapperRef.current.style.opacity = '1';
      return;
    }

    if (thirdCardBottomScroll > THRESHOLD) {
      lottieWrapperRef.current.style.opacity = '0';
      return;
    }

    const opacity = thirdCardBottomScroll / 0.01;
    lottieWrapperRef.current.style.opacity = `${opacity}`;
  };

  const transformSecondCard = () => {
    const relativeScroll = window.scrollY - firstCardInitialRect.top;
    if (relativeScroll < 0) return;

    const previousCardScroll =
      relativeScroll / (firstCardInitialRect.height * CARD_VISIBILITY_VALUE);
    const cardScale =
      previousCardScroll * MUTABLE_SCALE_VALUE + DEFAULT_SECOND_CARD_SCALE;

    if (cardScale >= 1) return;

    secondCardRef.current.style.transform = `scale(${cardScale})`;
    secondCardRef.current.style.opacity = `${cardScale}`;
  };

  const transformThirdCard = () => {
    const relativeScroll = window.scrollY - secondCardInitialRect.top;
    if (relativeScroll < 0) return;

    const previousCardScroll =
      relativeScroll / (secondCardInitialRect.height * CARD_VISIBILITY_VALUE);
    const cardScale =
      previousCardScroll * MUTABLE_SCALE_VALUE + DEFAULT_THIRD_CARD_SCALE;

    if (cardScale >= 1) return;

    thirdCardRef.current.style.transform = `scale(${cardScale})`;
    thirdCardRef.current.style.opacity = `${cardScale}`;
  };

  useEffect(() => {
    const setInitialBoundingRects = () => {
      const lottieWrapperHeight = lottieWrapperRef.current?.clientHeight;
      sectionRef.current.style.marginBottom = `-${lottieWrapperHeight}px`;

      firstCardInitialRect ??= firstCardRef.current.getBoundingClientRect();
      secondCardInitialRect ??= secondCardRef.current.getBoundingClientRect();
    };

    setInitialBoundingRects();

    onScroll = throttle(() => {
      setLottieWrapperOpacity();
      transformSecondCard();
      transformThirdCard();
    }, 15);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll, { passive: true });
      onScroll = null;
    };
  }, []);

  useEffect(() => {
    if (firstCardObserver?.isIntersecting) {
      animationRef.current?.play();
    }
  }, [Boolean(firstCardObserver?.isIntersecting)]);

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

  return (
    <section ref={sectionRef} className="how-rarimo-works-section">
      <div className="how-rarimo-works-section__content container">
        <BaseCard
          ref={firstCardRef}
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
                  <p>{t(item.textKey)}</p>
                </li>
              ))}
            </ul>
          </div>
        </BaseCard>
        <BaseCard
          ref={secondCardRef}
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
        <BaseCard
          ref={thirdCardRef}
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
    </section>
  );
};

export default HowRarimoWorksSection;
