import './BackersSection.scss';

import { useTranslation } from 'react-i18next';

import { getShiftedDelay } from '@/helpers';
import { backersList } from '@/template-data';

const BackersSection = () => {
  const { t } = useTranslation();

  return (
    <section className="backers-section">
      <div className="container">
        <h5 className="backers-section__title" data-aos="fade-up">
          {t('backers-section.title')}
        </h5>
        <div className="backers-section__list">
          {backersList.map((item, index) => (
            <img
              key={index}
              className="backers-section__item"
              src={item.image}
              alt=""
              data-aos="fade-up"
              data-aos-delay={getShiftedDelay(index, 100)}
              style={{ '--backer-logo-height': `${item.height}px` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BackersSection;
