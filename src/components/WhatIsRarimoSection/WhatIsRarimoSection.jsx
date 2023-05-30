import './WhatIsRarimoSection.scss';

import { useTranslation } from 'react-i18next';

import SectionDecorSvg from '@/components/SectionDecorSvg';
import { getShiftedDelay } from '@/helpers';
import { whatIsRarimoSectionList } from '@/template-data';

const WhatIsRarimoSection = () => {
  const { t } = useTranslation();

  return (
    <section className="what-is-rarimo-section">
      <div className="what-is-rarimo-section__content container">
        <h5 className="what-is-rarimo-section__subtitle" data-aos="fade-up">
          {t('what-is-rarimo-section.subtitle')}
        </h5>

        <div className="what-is-rarimo-section__decor-wrapper" data-aos="fade">
          <div data-aos="fade-up">
            <SectionDecorSvg />
          </div>
        </div>
        <h3 className="what-is-rarimo-section__title js-string-animation">
          {t('what-is-rarimo-section.title')}
        </h3>
        <p className="what-is-rarimo-section__description" data-aos="fade-up">
          {t('what-is-rarimo-section.description')}
        </p>
        <ul className="what-is-rarimo-section__list">
          {whatIsRarimoSectionList.map((item, index) => {
            const aosProps = {
              'data-aos': 'fade-up',
              'data-aos-delay': getShiftedDelay(index, 100),
            };
            return (
              <li key={index}>
                <div
                  className="what-is-rarimo-section__list-item-icon"
                  {...aosProps}
                >
                  <svg height="24" width="24">
                    <use href={item.icon}></use>
                  </svg>
                </div>
                <h6
                  className="what-is-rarimo-section__list-item-title"
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

export default WhatIsRarimoSection;
