import './VerticalsSection.scss';

import { useTranslation } from 'react-i18next';

import { CONFIG } from '@/config';
import { getShiftedDelay } from '@/helpers';
import { verticalsSectionList } from '@/template-data';

const VerticalsSection = () => {
  const { t } = useTranslation();

  return (
    <section className="verticals-section">
      <div className="container">
        <div className="verticals-section__title-wrapper" data-aos="fade-up">
          <h5 className="verticals-section__title">
            {t('verticals-section.subtitle')}
          </h5>
          <a
            className="verticals-section__docs-link"
            href={CONFIG.docsLink}
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            {t('verticals-section.docs-link')}
          </a>
        </div>
        <ul className="verticals-section__list">
          {verticalsSectionList.map((item, index) => (
            <li className="verticals-section__list-item" key={index}>
              <div
                className="verticals-section__list-item-content"
                data-aos="fade-up"
                data-aos-delay={getShiftedDelay(index, 150)}
              >
                <svg className="verticals-section__list-item-icon" height="116">
                  <use href={item.icon}></use>
                </svg>
                <h4 className="verticals-section__list-item-title">
                  {t(item.titleKey)}
                </h4>
                <p className="verticals-section__list-item-text">
                  {t(item.textKey)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default VerticalsSection;
