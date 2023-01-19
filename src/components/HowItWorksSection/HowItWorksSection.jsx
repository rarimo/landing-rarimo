import './HowItWorksSection.scss';

import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { useInView } from 'react-intersection-observer';
import HowItWorksChart from '@/components/HowItWorksChart';

const HowItWorksSection = () => {
  const { t } = useTranslation();

  const [isAnimationStarted, setIsAnimationStarted] = useState(false);

  const firstBlockRef = useRef(null);

  const [sectionRef] = useInView({
    onChange: isIntersecting => {
      if (isIntersecting) setIsAnimationStarted(true);
    },
    threshold: 0,
    triggerOnce: true,
  });

  return (
    <section ref={sectionRef} className="how-it-works-section container">
      <div className="how-it-works-section__chart-wrapper">
        <ul
          className={cn([
            'how-it-works-section__chart',
            {
              'how-it-works-section__chart--animated': isAnimationStarted,
            },
          ])}
        >
          <li ref={firstBlockRef} className="how-it-works-section__chart-item">
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
        <HowItWorksChart
          firstBlockRef={firstBlockRef.current}
          isAnimationStarted={isAnimationStarted}
        />
      </div>
    </section>
  );
};

export default HowItWorksSection;
