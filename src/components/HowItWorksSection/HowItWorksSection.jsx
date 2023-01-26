import './HowItWorksSection.scss';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useMedia, usePrevious } from 'react-use';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { useInView } from 'react-intersection-observer';
import useResizeObserver from '@react-hook/resize-observer';
import HowItWorksChartDesktop from '@/components/HowItWorksChartDesktop';
import HowItWorksChartMobile from '@/components/HowItWorksChartMobile';
import useForceUpdate from '@/hooks/useForceUpdate';
import { howItWorksGroupsList } from '@/template-data';
import {
  HOW_IT_WORKS_DEFAULT_CHART_HEIGHT,
  HOW_IT_WORKS_DEFAULT_CHART_WIDTH,
  HOW_IT_WORKS_GROUPS,
} from '@/const';

const HowItWorksSection = () => {
  const { t } = useTranslation();
  const isWideScreen = useMedia('(min-width: 900px)');
  const prevIsWideScreen = usePrevious(isWideScreen);
  const forceUpdate = useForceUpdate();

  const [isVisibleOnScreen, setIsVisibleOnScreen] = useState(false);

  const isFirstRender = useRef(true);

  const firstBlockRef = useRef(null);
  const chartWrapperRef = useRef(null);
  const sectionRef = useRef(null);

  const [chartRef] = useInView({
    onChange: isIntersecting => {
      setIsVisibleOnScreen(isIntersecting);
    },
    threshold: [0.15, 0.85],
    rootMargin: '-120px 0px',
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
      (sectionWidth - rootContainerPadding * 2) /
      HOW_IT_WORKS_DEFAULT_CHART_WIDTH;

    chartWrapperRef.current.style.transform = `scale(${scaleCoef})`;
    sectionRef.current.style.marginBottom = `${
      HOW_IT_WORKS_DEFAULT_CHART_HEIGHT * scaleCoef -
      HOW_IT_WORKS_DEFAULT_CHART_HEIGHT +
      100
    }px`;
  }, []);

  useResizeObserver(sectionRef.current, entry => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (!isWideScreen) {
      chartWrapperRef.current.style.transform = '';
      sectionRef.current.style.marginBottom = '';
      return;
    }

    scaleChart();
  });

  useEffect(() => {
    if (!chartWrapperRef.current) return;

    if (isWideScreen !== prevIsWideScreen) {
      chartWrapperRef.current.classList.remove(
        'how-it-works-section__chart-wrapper--animated',
      );
      forceUpdate(); // rerender for reset animation state
      setTimeout(() => {
        chartWrapperRef.current.classList.add(
          'how-it-works-section__chart-wrapper--animated',
        );
      }, 100);
    }
  }, [isWideScreen]);

  return (
    <section ref={sectionRef} className="how-it-works-section container">
      <h3 className="how-it-works-section__title" data-aos="zoom-in">
        {t('how-it-works-section.title')}
      </h3>
      <div
        ref={chartWrapperRef}
        className="how-it-works-section__chart-wrapper how-it-works-section__chart-wrapper--animated"
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
          {isWideScreen && (
            <>
              {Object.values(howItWorksGroupsList).map((group, index) => (
                <li
                  key={index}
                  className="how-it-works-section__chart-group-desktop"
                >
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
            </>
          )}

          <li
            ref={firstBlockRef}
            className="how-it-works-section__chart-item how-it-works-section__chart-item--first"
          >
            {!isWideScreen && (
              <div className="how-it-works-section__chart-group-mobile">
                <svg
                  className="how-it-works-section__group-icon"
                  height="24"
                  width="24"
                >
                  <use
                    href={howItWorksGroupsList[HOW_IT_WORKS_GROUPS.dapp].icon}
                  ></use>
                </svg>
                <span>
                  {t(howItWorksGroupsList[HOW_IT_WORKS_GROUPS.dapp].textKey)}
                </span>
              </div>
            )}
            <div>{t('how-it-works-section.chart-steps.first')}</div>
          </li>
          <li className="how-it-works-section__chart-item how-it-works-section__chart-item--second">
            {!isWideScreen && (
              <div className="how-it-works-section__chart-group-mobile">
                <svg
                  className="how-it-works-section__group-icon"
                  height="24"
                  width="24"
                >
                  <use
                    href={howItWorksGroupsList[HOW_IT_WORKS_GROUPS.payBtn].icon}
                  ></use>
                </svg>
                <span>
                  {t(howItWorksGroupsList[HOW_IT_WORKS_GROUPS.payBtn].textKey)}
                </span>
              </div>
            )}
            <div>{t('how-it-works-section.chart-steps.second')}</div>
          </li>
          <li className="how-it-works-section__chart-item how-it-works-section__chart-item--third">
            {!isWideScreen && (
              <div className="how-it-works-section__chart-group-mobile">
                <svg
                  className="how-it-works-section__group-icon"
                  height="24"
                  width="24"
                >
                  <use
                    href={howItWorksGroupsList[HOW_IT_WORKS_GROUPS.user].icon}
                  ></use>
                </svg>
                <span>
                  {t(howItWorksGroupsList[HOW_IT_WORKS_GROUPS.user].textKey)}
                </span>
              </div>
            )}
            <div>{t('how-it-works-section.chart-steps.third')}</div>
          </li>
          <li className="how-it-works-section__chart-item how-it-works-section__chart-item--fourth">
            {!isWideScreen && (
              <div className="how-it-works-section__chart-group-mobile">
                <svg
                  className="how-it-works-section__group-icon"
                  height="24"
                  width="24"
                >
                  <use
                    href={howItWorksGroupsList[HOW_IT_WORKS_GROUPS.dex].icon}
                  ></use>
                </svg>
                <span>
                  {t(howItWorksGroupsList[HOW_IT_WORKS_GROUPS.dex].textKey)}
                </span>
              </div>
            )}
            <div>{t('how-it-works-section.chart-steps.fourth')}</div>
          </li>
          <li className="how-it-works-section__chart-item how-it-works-section__chart-item--fifth">
            {!isWideScreen && (
              <div className="how-it-works-section__chart-group-mobile">
                <svg
                  className="how-it-works-section__group-icon"
                  height="24"
                  width="24"
                >
                  <use
                    href={
                      howItWorksGroupsList[HOW_IT_WORKS_GROUPS.rarimoProtocol]
                        .icon
                    }
                  ></use>
                </svg>
                <span>
                  {t(
                    howItWorksGroupsList[HOW_IT_WORKS_GROUPS.rarimoProtocol]
                      .textKey,
                  )}
                </span>
              </div>
            )}
            <div>{t('how-it-works-section.chart-steps.fifth')}</div>
          </li>
          <li className="how-it-works-section__chart-item how-it-works-section__chart-item--sixth">
            {!isWideScreen && (
              <div className="how-it-works-section__chart-group-mobile">
                <svg
                  className="how-it-works-section__group-icon"
                  height="24"
                  width="24"
                >
                  <use
                    href={
                      howItWorksGroupsList[HOW_IT_WORKS_GROUPS.rarimoProtocol]
                        .icon
                    }
                  ></use>
                </svg>
                <span>
                  {t(
                    howItWorksGroupsList[HOW_IT_WORKS_GROUPS.rarimoProtocol]
                      .textKey,
                  )}
                </span>
              </div>
            )}
            <div>{t('how-it-works-section.chart-steps.sixth')}</div>
          </li>
          <li className="how-it-works-section__chart-item how-it-works-section__chart-item--seventh">
            {!isWideScreen && (
              <div className="how-it-works-section__chart-group-mobile">
                <svg
                  className="how-it-works-section__group-icon"
                  height="24"
                  width="24"
                >
                  <use
                    href={howItWorksGroupsList[HOW_IT_WORKS_GROUPS.dapp].icon}
                  ></use>
                </svg>
                <span>
                  {t(howItWorksGroupsList[HOW_IT_WORKS_GROUPS.dapp].textKey)}
                </span>
              </div>
            )}
            <div>{t('how-it-works-section.chart-steps.seventh')}</div>
          </li>
        </ul>
        {isWideScreen ? (
          <HowItWorksChartDesktop
            firstBlockRef={firstBlockRef.current}
            scaleContainer={scaleChart}
            isVisibleOnScreen={isVisibleOnScreen}
          />
        ) : (
          <HowItWorksChartMobile isVisibleOnScreen={isVisibleOnScreen} />
        )}
      </div>
    </section>
  );
};

export default HowItWorksSection;
