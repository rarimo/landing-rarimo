import './HowItWorksSection.scss';

import { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { useInView } from 'react-intersection-observer';
import useResizeObserver from '@react-hook/resize-observer';
import HowItWorksChart from '@/components/HowItWorksChart';
import { howItWorksGroupsList } from '@/template-data';

const DEFAULT_CHART_WIDTH = 1256;
const DEFAULT_CHART_HEIGHT = 747;

const HowItWorksSection = () => {
  const { t } = useTranslation();
  const isFirstRender = useRef(true);

  const [isVisibleOnScreen, setIsVisibleOnScreen] = useState(false);

  const firstBlockRef = useRef(null);
  const chartWrapperRef = useRef(null);
  const sectionRef = useRef(null);

  const [chartRef] = useInView({
    onChange: isIntersecting => {
      setIsVisibleOnScreen(isIntersecting);
    },
    threshold: [0.2, 0.8],
    rootMargin: '-150px 0px',
  });

  const scaleChart = useCallback(() => {
    if (!sectionRef.current) return;

    const { width: sectionWidth } = sectionRef.current.getBoundingClientRect();
    const rootContainerPadding =
      Number.parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(
          '--container-side-padding',
        ),
      ) * 16; // *16 for converting in pixels

    const scaleCoef =
      (sectionWidth - rootContainerPadding * 2) / DEFAULT_CHART_WIDTH;

    chartWrapperRef.current.style.transform = `scale(${scaleCoef})`;
    sectionRef.current.style.marginBottom = `${
      DEFAULT_CHART_HEIGHT * scaleCoef - DEFAULT_CHART_HEIGHT + 100
    }px`;
  }, []);

  useResizeObserver(sectionRef.current, entry => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    scaleChart();
  });

  return (
    <section ref={sectionRef} className="how-it-works-section container">
      <h3 className="how-it-works-section__title" data-aos="zoom-in">
        {t('how-it-works-section.title')}
      </h3>
      <div
        ref={chartWrapperRef}
        className="how-it-works-section__chart-wrapper"
      >
        <ul
          ref={chartRef}
          className={cn([
            'how-it-works-section__chart',
            {
              'how-it-works-section__chart--paused': !isVisibleOnScreen,
            },
          ])}
        >
          {howItWorksGroupsList.map((group, index) => (
            <li key={index} className="how-it-works-section__chart-group">
              <svg
                className="how-it-works-section__group-icon"
                height="24"
                width="24"
              >
                <use href={group.icon}></use>
              </svg>
              <span>{t(group.textKey)}</span>
            </li>
          ))}
          <li
            ref={firstBlockRef}
            className="how-it-works-section__chart-item how-it-works-section__chart-item--first"
          >
            {t('how-it-works-section.chart-steps.first')}
          </li>
          <li className="how-it-works-section__chart-item how-it-works-section__chart-item--second">
            {t('how-it-works-section.chart-steps.second')}
          </li>
          <li className="how-it-works-section__chart-item how-it-works-section__chart-item--third">
            {t('how-it-works-section.chart-steps.third')}
          </li>
          <li className="how-it-works-section__chart-item how-it-works-section__chart-item--fourth">
            {t('how-it-works-section.chart-steps.fourth')}
          </li>
          <li className="how-it-works-section__chart-item how-it-works-section__chart-item--fifth">
            {t('how-it-works-section.chart-steps.fifth')}
          </li>
          <li className="how-it-works-section__chart-item how-it-works-section__chart-item--sixth">
            {t('how-it-works-section.chart-steps.sixth')}
          </li>
          <li className="how-it-works-section__chart-item how-it-works-section__chart-item--seventh">
            {t('how-it-works-section.chart-steps.seventh')}
          </li>
        </ul>
        <HowItWorksChart
          firstBlockRef={firstBlockRef.current}
          scaleContainer={scaleChart}
          isVisibleOnScreen={isVisibleOnScreen}
        />
      </div>
    </section>
  );
};

export default HowItWorksSection;
