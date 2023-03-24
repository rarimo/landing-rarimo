import './VerticalsSection.scss';

import { useTranslation } from 'react-i18next';
import { verticalsSectionList } from '@/template-data';
import AppLink from '@/components/AppLink';

const VerticalsSection = () => {
  const { t } = useTranslation();

  return (
    <section className="verticals-section container">
      <div className="verticals-section__title-wrapper">
        <h6 className="verticals-section__subtitle">
          {t('verticals-section.subtitle')}
        </h6>
        <AppLink
          className="verticals-section__docs-link"
          routePath={null}
          textKey="verticals-section.docs-link"
        />
      </div>
      <ul className="verticals-section__list">
        {verticalsSectionList.map((item, index) => (
          <li className="verticals-section__list-item" key={index}>
            <div className="verticals-section__list-item-icon">
              <svg height="116">
                <use href={item.icon}></use>
              </svg>
            </div>
            <h6 className="verticals-section__list-item-title">
              {t(item.titleKey)}
            </h6>
            <p className="verticals-section__list-item-text">
              {t(item.textKey)}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default VerticalsSection;
