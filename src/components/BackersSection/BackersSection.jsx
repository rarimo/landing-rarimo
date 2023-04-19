import './BackersSection.scss';

import cn from 'classnames';
import { useTranslation } from 'react-i18next';

import SectionWrapper from '@/components/SectionWrapper';
import { backersList } from '@/template-data';

const BackersSection = () => {
  const { t } = useTranslation();

  return (
    <SectionWrapper>
      <section className="backers-section container">
        <h6 className="backers-section__subtitle">
          {t('backers-section.subtitle')}
        </h6>
        <ul className="backers-section__list">
          {backersList.map((item, index) => (
            <li
              className={cn([
                'backers-section__list-item',
                {
                  'backers-section__list-item--increased': item.isIncreased,
                },
              ])}
              key={index}
            >
              <img
                className="backers-section__item-image"
                src={item.image}
                height="20"
                width="90"
                alt=""
              />
            </li>
          ))}
        </ul>
      </section>
    </SectionWrapper>
  );
};

export default BackersSection;
