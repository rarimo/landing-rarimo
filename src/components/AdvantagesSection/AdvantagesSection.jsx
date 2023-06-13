import './AdvantagesSection.scss';

import { useTranslation } from 'react-i18next';

import { getShiftedDelay } from '@/helpers';
import { advantagesList } from '@/template-data';

const AdvantagesSection = () => {
  const { t } = useTranslation();

  return (
    <section className="advantages-section container">
      <ul className="advantages-section__list">
        {advantagesList.map((item, index) => (
          <li
            key={index}
            className="advantages-section__list-item"
            data-aos="fade-up"
            data-aos-delay={getShiftedDelay(index, 100)}
          >
            <svg
              className="advantages-section__list-item-icon"
              height="40"
              width="40"
            >
              <use href={item.icon}></use>
            </svg>

            <span>{t(item.textKey)}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default AdvantagesSection;
