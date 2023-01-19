import './HowItWorksSection.scss';

import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { useInView } from 'react-intersection-observer';
import HowItWorksChart from '@/components/HowItWorksChart';
import { howItWorksGroupsList } from '@/template-data';

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
      <h3 className="how-it-works-section__title" data-aos="zoom-in">
        {t('how-it-works-section.title')}
      </h3>
      <div className="how-it-works-section__chart-wrapper">
        <ul
          className={cn([
            'how-it-works-section__chart',
            {
              'how-it-works-section__chart--animated': isAnimationStarted,
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
          isAnimationStarted={isAnimationStarted}
        />
      </div>
    </section>
  );
};

export default HowItWorksSection;
