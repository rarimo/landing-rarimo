import './HowRarimoWorksSection.scss';

// import { lazy } from 'react';
import { useTranslation } from 'react-i18next';

import { getShiftedDelay } from '@/helpers';
// import useAppContext from '@/hooks/useAppContext';
import { howRarimoWorksSectionList } from '@/template-data';

// const HowRarimoWorksDecor = lazy(() =>
//   import('@/components/HowRarimoWorksDecor'),
// );

const HowRarimoWorksSection = () => {
  const { t } = useTranslation();
  // const { isDesktop } = useAppContext();

  return (
    <section className="how-rarimo-works-section">
      <div className="how-rarimo-works-section__content container">
        <h5 className="how-rarimo-works-section__subtitle" data-aos="fade-up">
          {t('how-rarimo-works-section.subtitle')}
        </h5>

        {/* {isDesktop && (
          <div className="how-rarimo-works-section__decor-wrapper">
            <HowRarimoWorksDecor />
          </div>
        )} */}

        <h3 className="how-rarimo-works-section__title js-string-animation">
          {t('how-rarimo-works-section.title')}
        </h3>
        <p className="how-rarimo-works-section__description" data-aos="fade-up">
          {t('how-rarimo-works-section.description')}
        </p>
        <ul className="how-rarimo-works-section__list">
          {howRarimoWorksSectionList.map((item, index) => {
            const aosProps = {
              'data-aos': 'fade-up',
              'data-aos-delay': getShiftedDelay(index, 100),
            };
            return (
              <li key={index}>
                <div
                  className="how-rarimo-works-section__list-item-icon"
                  {...aosProps}
                >
                  <svg height="24" width="24">
                    <use href={item.icon}></use>
                  </svg>
                </div>
                <h6
                  className="how-rarimo-works-section__list-item-title"
                  {...aosProps}
                >
                  {t(item.titleKey)}
                </h6>
                <p {...aosProps}>{t(item.textKey)}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default HowRarimoWorksSection;
