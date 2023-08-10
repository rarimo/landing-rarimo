import './styles/UiHoverSlider.scss';

// import './../components/UseCasesSection/UseCasesSection.scss';
import cn from 'classnames';
import { clamp } from 'lodash-es';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useIntersection } from 'react-use';

import BaseCard from '@/components/BaseCard/BaseCard';
import useAppContext from '@/hooks/useAppContext';

const ANIMATION_DURATION = 440; // ms
const UiHoverSlider = ({
  useCases,
  widthQuotient = 1,
  slideIndexActivated,
}) => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);
  const [animationIndex, setAnimationIndex] = useState(0);
  const elementRef = useRef(null);
  const sliderRef = useRef(null);
  const { isMobile } = useAppContext();
  let observer = useIntersection(elementRef, { threshold: 0.25 });

  const onMouseMove = event => {
    if (!isMobile) return;
    console.log(event);
    const clientWidth = elementRef?.current?.clientWidth;
    const hoverIndex = Math.floor(
      (event.nativeEvent.offsetX / clientWidth) * useCases.length,
    );
    console.log('move', hoverIndex);


    const newIndex = clamp(hoverIndex, 0, useCases.length - 1);
    console.log('new', newIndex);

    if (newIndex === currentIndex) return;

    if (!isActive) {
      moveToActiveSlide(newIndex);
    } else {
      setCurrentIndex(newIndex);
    }
  };

  const moveToActiveSlide = async index => {
    setIsActive(true);
    setIsAnimating(false);

    setAnimationIndex(index);
    setCurrentIndex(index - 1);

    await new Promise(resolve => setTimeout(resolve, 0));

    setIsAnimating(true);
    setCurrentIndex(index);

    setTimeout(() => {
      setAnimationIndex(0);
    }, ANIMATION_DURATION);
  };

  const onMouseLeave = () => {
    if (!isMobile) return;
    deactivate();
  };

  const deactivate = () => {
    setCurrentIndex(0);
    setIsActive(false);
  };

  const getSlideWidth = useMemo(() => {
    console.log(elementRef?.current?.clientWidth);
    return elementRef?.current?.clientWidth * widthQuotient;
  }, [elementRef?.current?.clientWidth]);

  const coverSlides = useMemo(() => {
    return Math.ceil(1 / widthQuotient);
  }, []);

  useEffect(() => {
    if (!elementRef || observer) return;
    if (observer?.isIntersecting) {
      setIsActive(true);
    } else {
      deactivate();
    }
    slideIndexActivated(0);
  }, [Boolean(observer?.isIntersecting)]);

  return (
    <div
      ref={elementRef}
      className="ui-hover-slider"
      // style={{ width: `${widthQuotient * 60}%` }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div
        ref={sliderRef}
        className="ui-hover-slider__slides"
        style={{
          transform: `translateX(${-Math.floor(
            getSlideWidth * currentIndex,
          )}px)`,
          transition: isAnimating ? `${ANIMATION_DURATION}ms ease-out` : 'none',
        }}
      >
        {useCases.map(useCase => (
          <ul
            className={cn([
              'ui-hover-slider__item',
              'use-cases-section__cases-swiper',
            ])}
            key={useCase.modifier}
          >
            <BaseCard
              className={cn([
                'use-cases-section__case-item',
                `use-cases-section__case-item--${useCase.modifier}`,
                {
                  'use-cases-section__case-item--yellow': useCase.isYellow,
                },
              ])}
              tag="li"
              role="link"
              tabIndex="0"
              onClick={() => handleNavClick(useCase)}
              onKeyDown={event => {
                switch (event.code) {
                  case 'Enter':
                    handleNavClick(useCase);
                    return;

                  default:
                    return;
                }
              }}
            >
              <img
                className="use-cases-section__case-item-img"
                src={useCase.img}
                alt=""
              />
              <div className="use-cases-section__case-item-content">
                <h6 className="use-cases-section__case-item-title">
                  {t(useCase.titleKey)}
                </h6>
                <p className="use-cases-section__case-item-text">
                  {t(useCase.textKey)}
                </p>
              </div>
            </BaseCard>
          </ul>
        ))}
      </div>

      <div>
        {useCases.length > 1 && (
          <div className="ui-hover-slider__indicator">
            {Array.from({ length: useCases.length }).map((_, i) => (
              <div
                key={i}
                className={`ui-hover-slider__indicator-bar ${
                  currentIndex === i - 1
                    ? 'ui-hover-slider__indicator-bar_active'
                    : ''
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/*{$slots.default && (*/}
      {/*  <div className="ui-hover-slider__overlay">{$slots.default}</div>*/}
      {/*)}*/}
    </div>
  );
};

export default UiHoverSlider;
