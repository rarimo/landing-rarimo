import './BackersSection.scss';

import cn from 'classnames';
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
        <ul className="backers-section__list">
          {backersList.map((item, index) => (
            <li
              className={cn([
                'backers-section__list-item',
                {
                  'backers-section__list-item--opacity': item.withOpacity,
                },
              ])}
              key={index}
            >
              <img
                className="backers-section__item-image"
                src={item.image}
                height={item.height}
                width={item.width}
                alt=""
                data-aos="fade-up"
                data-aos-delay={getShiftedDelay(index, 100)}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default BackersSection;
