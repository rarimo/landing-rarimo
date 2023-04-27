import './WhatRarimoDoesSection.scss';

import { useTranslation } from 'react-i18next';
import SectionWrapper, {
  SECTION_WRAPPER_SCHEME,
} from '@/components/SectionWrapper';
import SectionDecorSvg from '@/components/SectionDecorSvg';
import { whatRarimoDoesSectionList } from '@/template-data';
import { getShiftedDelay } from '@/helpers';

const WhatRarimoDoesSection = () => {
  const { t } = useTranslation();

  return (
    <SectionWrapper scheme={SECTION_WRAPPER_SCHEME.accent}>
      <section className="what-rarimo-does-section container">
        <div className="what-rarimo-does-section__subtitle-wrapper">
          <h6 className="what-rarimo-does-section__subtitle">
            <span data-aos="fade-up">
              {t('what-rarimo-does-section.subtitle')}
            </span>
          </h6>
        </div>
        <div
          className="what-rarimo-does-section__decor-wrapper"
          data-aos="fade"
        >
          <div data-aos="fade-up">
            <SectionDecorSvg />
          </div>
        </div>
        <div className="what-rarimo-does-section__title-wrapper">
          <h3 className="what-rarimo-does-section__title js-string-animation">
            {t('what-rarimo-does-section.title')}
          </h3>
          <p
            className="what-rarimo-does-section__description"
            data-aos="fade-up"
          >
            {t('what-rarimo-does-section.description')}
          </p>
        </div>
        <ul className="what-rarimo-does-section__list">
          {whatRarimoDoesSectionList.map((item, index) => {
            const aosProps = {
              'data-aos': 'fade-up',
              'data-aos-delay': getShiftedDelay(index, 100),
            };
            return (
              <li
                className="what-rarimo-does-section__list-item-wrapper"
                key={index}
              >
                <div className="what-rarimo-does-section__list-item">
                  <div
                    className="what-rarimo-does-section__list-item-icon"
                    {...aosProps}
                  >
                    <svg height="24" width="24">
                      <use href={item.icon}></use>
                    </svg>
                  </div>
                  <h6
                    className="what-rarimo-does-section__list-item-title"
                    {...aosProps}
                  >
                    {t(item.titleKey)}
                  </h6>
                  <p
                    className="what-rarimo-does-section__list-item-text"
                    {...aosProps}
                  >
                    {t(item.textKey)}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </SectionWrapper>
  );
};

export default WhatRarimoDoesSection;
