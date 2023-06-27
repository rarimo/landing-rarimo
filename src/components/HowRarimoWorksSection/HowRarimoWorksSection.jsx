import './HowRarimoWorksSection.scss';

import { throttle } from 'lodash-es';
import lottie from 'lottie-web';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useIntersection } from 'react-use';

import BaseCard from '@/components/BaseCard';
import Portal from '@/components/Portal';
import { CONFIG } from '@/config';
import useAppContext from '@/hooks/useAppContext';
import { howRarimoWorksSectionList } from '@/template-data';

let onScroll;
let sectionRect;
let firstCardRect;
let secondCardRect;

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

  const sectionIntersection = useIntersection(firstCardRef, {
    root: null,
    rootMargin: '0px',
    threshold: 0.8,
  });

  const shiftDecor = event => {
    // console.log(event);
    if (!isDesktop) return;

    // const section = document.querySelector('.how-rarimo-works-section');
    // const content = document.querySelector(
    //   '.how-rarimo-works-section__content',
    // );
    // const card = document.querySelector('.how-rarimo-works-section__card');

    // console.log('section', section.getBoundingClientRect());
    // console.log('content', content.getBoundingClientRect());
    // console.log('card', firstCardRef.current.getBoundingClientRect());
    // const cardRect = firstCardRef.current.getBoundingClientRect();

    if (firstCardRect.top > window.scrollY) return;
    // console.log(firstCardRect);

    const firstCardScrollY = firstCardRect.top - window.scrollY;

    const shift = -Math.round(firstCardScrollY);
    const percent = ((firstCardScrollY * -1) / firstCardRect.height) * 100;
    decorRef.current.style.transform = `translateY(${shift}px)`;
    // decorRef.current.style.backgroundPositionX = `-${percent * 600}px`;

    // console.log(percent);

    // 58 frames, 600px,

    //34800px
    //46800px
    //47400px
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
      path: '/animation/how-rarimo-works.json',
    };

    animationRef.current = lottie.loadAnimation(params);

    animationRef.current.addEventListener('drawnFrame', frameEvent => {
      // console.log(frameEvent.currentTime);
      const isFrameInRange = STEP_FRAMES[0]?.includes(
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

  const transformSecondCard = () => {
    const relativeScroll = window.scrollY - firstCardRect.top;
    if (relativeScroll < 0) return;

    const previousCardScroll =
      relativeScroll / (firstCardRect.height * CARD_VISIBILITY_VALUE);
    const cardScale =
      previousCardScroll * MUTABLE_SCALE_VALUE + DEFAULT_SECOND_CARD_SCALE;

    if (cardScale >= 1) return;

    secondCardRef.current.style.transform = `scale(${cardScale})`;
  };

  const transformThirdCard = () => {
    const relativeScroll = window.scrollY - secondCardRect.top;
    if (relativeScroll < 0) return;

    const previousCardScroll =
      relativeScroll / (secondCardRect.height * CARD_VISIBILITY_VALUE);
    const cardScale =
      previousCardScroll * MUTABLE_SCALE_VALUE + DEFAULT_THIRD_CARD_SCALE;

    if (cardScale >= 1) return;

    thirdCardRef.current.style.transform = `scale(${cardScale})`;
  };

  useEffect(() => {
    const placeInitialLottieWrapper = () => {
      // const wrapperRect = lottieWrapperRef.current?.getBoundingClientRect();

      sectionRect ??= sectionRef.current.getBoundingClientRect();
      firstCardRect ??= firstCardRef.current.getBoundingClientRect();
      secondCardRect ??= secondCardRef.current.getBoundingClientRect();
      // const decorTop = decorRef.current.getBoundingClientRect().top;

      // decorRef.current.style.top = `calc(20vh + ${decorTop}px)`;
      // lottieWrapperRef.current.style.top = `${wrapperRect.top}px`;
      // lottieWrapperRef.current.style.position = 'fixed';
    };

    placeInitialLottieWrapper();
    // onScroll = throttle(shiftDecor, 2);
    onScroll = throttle(() => {
      transformSecondCard();
      transformThirdCard();
    }, 15);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll, { passive: true });
    };
  }, []);

  useEffect(() => {
    if (sectionIntersection?.isIntersecting) {
      animationRef.current?.play();
    }
  }, [Boolean(sectionIntersection?.isIntersecting)]);

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
      {isDesktop && (
        <Portal>
          <div
            ref={lottieWrapperRef}
            className="how-rarimo-works-section__lottie-wrapper"
          >
            <div
              ref={lottieRef}
              className="how-rarimo-works-section__lottie"
            ></div>
          </div>
        </Portal>
      )}
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
                    {/* TODO: Change icons */}
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
      </div>
    </section>
  );
};

export default HowRarimoWorksSection;
