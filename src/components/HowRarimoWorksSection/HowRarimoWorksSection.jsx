import './HowRarimoWorksSection.scss';

import { throttle } from 'lodash-es';
import { useEffect, useRef } from 'react';
// import { lazy } from 'react';
import { useTranslation } from 'react-i18next';

import BaseCard from '@/components/BaseCard';
import { CONFIG } from '@/config';
import { getShiftedDelay } from '@/helpers';
import useAppContext from '@/hooks/useAppContext';
import { howRarimoWorksSectionList } from '@/template-data';

// const HowRarimoWorksDecor = lazy(() =>
//   import('@/components/HowRarimoWorksDecor'),
// );

let onScroll;
let firstCardRect;
let secondCardRect;

const HowRarimoWorksSection = () => {
  const { t } = useTranslation();
  const { isDesktop } = useAppContext();

  const decorRef = useRef(null);
  const firstCardRef = useRef(null);
  const secondCardRef = useRef(null);

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

  useEffect(() => {
    const placeInitialLottieWrapper = () => {
      firstCardRect ??= firstCardRef.current.getBoundingClientRect();
      secondCardRect ??= secondCardRef.current.getBoundingClientRect();
      // const decorTop = decorRef.current.getBoundingClientRect().top;

      // decorRef.current.style.top = `calc(20vh + ${decorTop}px)`;
      // decorRef.current.style.position = 'fixed';
    };

    placeInitialLottieWrapper();
    // onScroll = throttle(shiftDecor, 2);
    // window.addEventListener('scroll', onScroll, { passive: true });

    // return () => {
    //   window.removeEventListener('scroll', onScroll, { passive: true });
    // };
  }, []);

  return (
    <section className="how-rarimo-works-section">
      {isDesktop && (
        <div
          ref={decorRef}
          className="how-rarimo-works-section__decor-wrapper animate"
        >
          <div className="how-rarimo-works-section__decor"></div>
          {/* <HowRarimoWorksDecor /> */}
        </div>
      )}
      <div className="how-rarimo-works-section__content container">
        <BaseCard className="how-rarimo-works-section__card" isSection={true}>
          <div
            ref={firstCardRef}
            className="how-rarimo-works-section__card-content"
          >
            <h5
              className="how-rarimo-works-section__subtitle"
              data-aos="fade-up"
            >
              {t('how-rarimo-works-section.main.subtitle')}
            </h5>

            <h2 className="how-rarimo-works-section__title" data-aos="fade-up">
              {t('how-rarimo-works-section.main.title')}
            </h2>
            <p
              className="how-rarimo-works-section__description"
              data-aos="fade-up"
            >
              {t('how-rarimo-works-section.main.description')}
            </p>
            <ul className="how-rarimo-works-section__list">
              {howRarimoWorksSectionList.main.map((item, index) => (
                <li
                  key={index}
                  data-aos="fade-up"
                  data-aos-delay={getShiftedDelay(index, 100)}
                >
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
          className="how-rarimo-works-section__card how-rarimo-works-section__card--protocol how-rarimo-works-section--identity"
          isSection={true}
        >
          <div
            ref={secondCardRef}
            className="how-rarimo-works-section__card-content"
          >
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
