import './WhatRarimoDoesSection.scss';

import { useTranslation } from 'react-i18next';
import { whatRarimoDoesSectionList } from '@/template-data';
import SectionWrapper, {
  SECTION_WRAPPER_SCHEME,
} from '@/components/SectionWrapper';

const WhatRarimoDoesSection = () => {
  const { t } = useTranslation();

  return (
    <SectionWrapper scheme={SECTION_WRAPPER_SCHEME.accent}>
      <section className="what-rarimo-does-section container">
        <h6 className="what-rarimo-does-section__subtitle">
          {t('what-rarimo-does-section.subtitle')}
        </h6>
        <div className="what-rarimo-does-section__main-content">
          <div className="what-rarimo-does-section__title-wrapper">
            <h3 className="what-rarimo-does-section__title">
              {t('what-rarimo-does-section.title')}
            </h3>
            <p className="what-rarimo-does-section__description">
              {t('what-rarimo-does-section.description')}
            </p>
          </div>
          <ul className="what-rarimo-does-section__list">
            {whatRarimoDoesSectionList.map((item, index) => (
              <li className="what-rarimo-does-section__list-item" key={index}>
                <div className="what-rarimo-does-section__list-item-icon">
                  <svg height="24" width="24">
                    <use href={item.icon}></use>
                  </svg>
                </div>
                <h6 className="what-rarimo-does-section__list-item-title">
                  {t(item.titleKey)}
                </h6>
                <p className="what-rarimo-does-section__list-item-text">
                  {t(item.textKey)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </SectionWrapper>
  );
};

export default WhatRarimoDoesSection;
