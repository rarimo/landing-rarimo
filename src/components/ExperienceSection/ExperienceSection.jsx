import './ExperienceSection.scss';

import { useTranslation } from 'react-i18next';
import BaseCardList from '@/components/BaseCardList';
import { getShiftedDelay } from '@/helpers';
import { experienceSectionList } from '@/template-data';

const ExperienceSection = () => {
  const { t } = useTranslation();

  return (
    <section className="experience-section container">
      <h3 className="experience-section__title" data-aos="fade-right">
        {t('experience-section.title')}
      </h3>
      <p
        className="experience-section__subtitle"
        data-aos="fade-right"
        data-aos-delay="400"
      >
        {t('experience-section.subtitle')}
      </p>
      <BaseCardList>
        {experienceSectionList.map((item, index) => (
          <li
            key={index}
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay={getShiftedDelay(index, 300)}
            data-aos-anchor-placement="top-bottom"
          >
            <svg
              className="experience-section__card-icon"
              height="32"
              width="32"
            >
              <use href={item.icon}></use>
            </svg>
            <h5 className="experience-section__card-title">
              {t(item.titleKey)}
            </h5>
            <p className="experience-section__card-text">{t(item.textKey)}</p>
          </li>
        ))}
      </BaseCardList>
    </section>
  );
};

export default ExperienceSection;
