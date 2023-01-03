import './ImplementationSection.scss';

import { useTranslation, Trans } from 'react-i18next';
import ImplementationCode from '@/components/ImplementationCode';
import { implementationList } from '@/template-data';

const ImplementationSection = () => {
  const { t } = useTranslation();

  return (
    <section className="implementation-section container">
      <div
        className="implementation-section__content"
        data-aos="fade-right"
        data-aos-anchor-placement="top-bottom"
      >
        <h3 className="implementation-section__title">
          <Trans i18nKey="implementation-section.title_html" />
        </h3>
        <p className="implementation-section__description">
          {t('implementation-section.description')}
        </p>
        <ul className="implementation-section__list">
          {implementationList.map((item, index) => (
            <li className="implementation-section__list-item" key={index}>
              <svg
                className="implementation-section__list-item-icon"
                height="24"
                width="24"
              >
                <use href="/sprite.svg#icon-check"></use>
              </svg>
              <span> {t(item.textKey)}</span>
            </li>
          ))}
        </ul>
      </div>
      <div
        className="implementation-section__code-wrapper"
        data-aos="fade-right"
        data-aos-delay="500"
        data-aos-anchor-placement="top-bottom"
      >
        <ImplementationCode />
      </div>
    </section>
  );
};

export default ImplementationSection;
