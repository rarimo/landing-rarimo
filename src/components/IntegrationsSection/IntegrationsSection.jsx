import './IntegrationsSection.scss';

import { useTranslation } from 'react-i18next';

import { getShiftedDelay } from '@/helpers';
import { integrationsList } from '@/template-data';

const IntegrationsSection = () => {
  const { t } = useTranslation();

  return (
    <section className="integrations-section container">
      <h3 className="integrations-section__title" data-aos="fade-right">
        {t('integrations-section.title')}
      </h3>
      <ul className="integrations-section__list">
        {integrationsList.map((item, index) => (
          <li
            key={index}
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay={getShiftedDelay(index, 300)}
            data-aos-anchor=".integrations-section__title"
          >
            <div className="integrations-section__list-item">
              <svg
                className="integrations-section__list-item-icon"
                height="32"
                width="32"
              >
                <use href={item.icon}></use>
              </svg>
              <span>{item.text}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default IntegrationsSection;
