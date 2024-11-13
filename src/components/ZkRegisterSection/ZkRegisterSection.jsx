import './ZkRegisterSection.scss';

import cn from 'classnames';
import { useEffect, useMemo, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { COMPONENT_NODE_IDS } from '@/const';

import AppAccordion from '../AppAccordion';
import AppButton from '../AppButton';
import GlowingCard from '../GlowingCard';

const images = [
  { src: '/img/home/zk-passport.webp', alt: 'zk-passport' },
  { src: '/img/home/reputation.webp', alt: 'reputation' },
  { src: '/img/home/registries.webp', alt: 'registries' },
];

const ZkRegisterSection = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);

  const accordions = useMemo(
    () => [
      {
        title: t('zk-register-section.accordion-title-1'),
        content: (
          <>
            <p>{t('zk-register-section.accordion-description-1')}</p>
            {/* TODO: Add link */}
            <AppButton className="zk-register-section__link" href="/">
              <span>{t('zk-register-section.accordion-cta-1')}</span>
              <svg
                className="zk-register-section__link-icon"
                height="13"
                width="13"
              >
                <use href="/icons/sprite.svg#icon-arrow-right"></use>
              </svg>
            </AppButton>
          </>
        ),
      },
      {
        title: t('zk-register-section.accordion-title-2'),
        content: (
          <>
            <p>
              <Trans
                i18nKey="zk-register-section.accordion-description-2"
                components={{
                  highlight: (
                    <span className="app-accordion__content--highlighted" />
                  ),
                }}
              />
            </p>
            {/* TODO: Add link */}
            <AppButton className="zk-register-section__link" href="/">
              <span>{t('zk-register-section.accordion-cta-2')}</span>
              <svg
                className="zk-register-section__link-icon"
                height="13"
                width="13"
              >
                <use href="/icons/sprite.svg#icon-arrow-right"></use>
              </svg>
            </AppButton>
          </>
        ),
      },
      {
        title: t('zk-register-section.accordion-title-3'),
        content: (
          <>
            <p>{t('zk-register-section.accordion-description-3')}</p>
            {/* TODO: Add link */}
            <AppButton disabled className="zk-register-section__link" href="/">
              <span>{t('zk-register-section.accordion-cta-3')}</span>
              <svg
                className="zk-register-section__link-icon"
                height="13"
                width="13"
              >
                <use href="/icons/sprite.svg#icon-arrow-right"></use>
              </svg>
            </AppButton>
          </>
        ),
      },
    ],
    [t],
  );

  const updateActiveIndex = index => {
    setActiveIndex(-1);
    // To prevent delay when all closed and expanding one of them
    activeIndex === -1
      ? setActiveIndex(index)
      : setTimeout(() => {
          setActiveIndex(activeIndex === index ? -1 : index);
        }, 300);
  };

  useEffect(() => {
    if (activeIndex !== -1) {
      setImageIndex(activeIndex);
    }
  }, [activeIndex]);

  return (
    <section
      id={COMPONENT_NODE_IDS.zkRegisterSection}
      className="zk-register-section container"
    >
      <h2 className="zk-register-section__title">
        {t('zk-register-section.title')}
      </h2>

      <div className="zk-register-section__content" data-aos="fade-up">
        <ul className="zk-register-section__accordions">
          {accordions.map((item, index) => (
            <li className="zk-register-section__accordions-item" key={index}>
              <AppAccordion
                {...item}
                isActive={index === activeIndex}
                onSelect={() => updateActiveIndex(index)}
              />
            </li>
          ))}
        </ul>
        <GlowingCard
          className="zk-register-section__image-wrapper"
          data-aos="fade-up"
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image.src}
              alt={image.alt}
              className={cn({
                visible: index === imageIndex,
              })}
            />
          ))}
        </GlowingCard>
      </div>
    </section>
  );
};
export default ZkRegisterSection;
