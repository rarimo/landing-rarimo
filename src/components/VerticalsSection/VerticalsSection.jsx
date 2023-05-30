import './VerticalsSection.scss';

import { useTranslation } from 'react-i18next';

import AppButton, { APP_BUTTON_SCHEMES } from '@/components/AppButton';
import SectionWrapper from '@/components/SectionWrapper';
import { CONFIG } from '@/config';
import { getShiftedDelay } from '@/helpers';
import { verticalsSectionList } from '@/template-data';

const VerticalsSection = () => {
  const { t } = useTranslation();

  return (
    <SectionWrapper>
      <section className="verticals-section container">
        <div className="verticals-section__title-wrapper">
          <div className="verticals-section__subtitle-wrapper">
            <h6 className="verticals-section__subtitle">
              <span data-aos="fade-up">{t('verticals-section.subtitle')}</span>
            </h6>
          </div>
          <AppButton
            className="verticals-section__docs-link"
            href={CONFIG.docsLink}
            textKey="verticals-section.docs-link"
            scheme={APP_BUTTON_SCHEMES.secondary}
            data-aos="fade-up"
          />
        </div>
        <ul className="verticals-section__list">
          {verticalsSectionList.map((item, index) => (
            <li className="verticals-section__list-item-wrapper" key={index}>
              <div className="verticals-section__list-item">
                <div
                  className="verticals-section__list-item-content"
                  data-aos="fade-up"
                  data-aos-delay={getShiftedDelay(index, 150)}
                >
                  <svg
                    className="verticals-section__list-item-icon"
                    height="116"
                  >
                    <use href={item.icon}></use>
                  </svg>
                  <h6 className="verticals-section__list-item-title">
                    {t(item.titleKey)}
                  </h6>
                  <p className="verticals-section__list-item-text">
                    {t(item.textKey)}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </SectionWrapper>
  );
};

export default VerticalsSection;
