import './HowItWorksSection.scss';

import { useTranslation } from 'react-i18next';
import { useEffect, useState, useRef } from 'react';
import cn from 'classnames';

const HowItWorksSection = () => {
  const { t } = useTranslation();

  const [step, setStep] = useState(1);

  const isFirstRender = useRef(true);
  // const ref = useRef(null);

  useEffect(() => {
    if (!isFirstRender.current) return;
    isFirstRender.current = false;

    // console.dir(ref.current);
    // console.log(ref.current.getTotalLength());
  }, []);

  return (
    <section className="how-it-works-section container">
      <div className="how-it-works-section__chart-wrapper">
        <ul className="how-it-works-section__chart">
          <li className="how-it-works-section__chart-item">
            {t('how-it-works-section.chart-steps.first')}
          </li>
          <li className="how-it-works-section__chart-item">
            {t('how-it-works-section.chart-steps.second')}
          </li>
          <li className="how-it-works-section__chart-item">
            {t('how-it-works-section.chart-steps.third')}
          </li>
          <li className="how-it-works-section__chart-item">
            {t('how-it-works-section.chart-steps.fourth')}
          </li>
          <li className="how-it-works-section__chart-item">
            {t('how-it-works-section.chart-steps.fifth')}
          </li>
          <li className="how-it-works-section__chart-item">
            {t('how-it-works-section.chart-steps.sixth')}
          </li>
          <li className="how-it-works-section__chart-item">
            {t('how-it-works-section.chart-steps.seventh')}
          </li>
        </ul>
        <svg
          className={cn([
            'svg-1 how-it-works-section__chart-lines',
            {
              'svg-1--animation': step >= 1,
            },
          ])}
          width="492"
          height="259"
          viewBox="0 0 492 259"
          xmlns="http://www.w3.org/2000/svg"
          onAnimationEnd={() => {
            console.log('onAnimationEnd 1');
            setStep(2);
          }}
        >
          <path
            d="M0 258H204.177C215.223 258 224.177 249.046 224.177 238V142C224.177 130.954 233.131 122 244.177 122H471C482.046 122 491 113.046 491 102V20.9995C491 9.95382 482.046 0.999512 471 0.999512H254"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
        <svg
          className={cn([
            'svg-2 how-it-works-section__chart-lines',
            {
              'svg-2--animation': step >= 2,
            },
          ])}
          width="833"
          height="2"
          viewBox="0 0 833 2"
          xmlns="http://www.w3.org/2000/svg"
          onAnimationEnd={() => {
            console.log('onAnimationEnd 2');
            setStep(3);
          }}
        >
          <path d="M0 1H833" strokeWidth="2" />
        </svg>
        <svg
          className={cn([
            'svg-3 how-it-works-section__chart-lines',
            {
              'svg-3--animation': step >= 3,
            },
          ])}
          width="105"
          height="138"
          viewBox="0 0 105 138"
          xmlns="http://www.w3.org/2000/svg"
          onAnimationEnd={() => {
            console.log('onAnimationEnd 3');
            setStep(4);
          }}
        >
          <path
            d="M0.160156 1H32.4862C43.5319 1 52.4862 9.95431 52.4862 21V117C52.4862 128.046 61.4405 137 72.4862 137H104.812"
            strokeWidth="2"
          />
        </svg>
        <svg
          className={cn([
            'svg-4 how-it-works-section__chart-lines',
            {
              'svg-4--animation': step >= 4,
            },
          ])}
          width="741"
          height="138"
          viewBox="0 0 741 138"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 137H720C731.046 137 740 128.046 740 117V21C740 9.95431 731.046 1 720 1H661"
            strokeWidth="2"
          />
        </svg>
      </div>
    </section>
  );
};

export default HowItWorksSection;
