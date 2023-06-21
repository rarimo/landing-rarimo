import './HowRarimoWorksSection.scss';

import { lazy } from 'react';
import { useTranslation } from 'react-i18next';

import SectionCard from '@/components/SectionCard';
import { CONFIG } from '@/config';
import { getShiftedDelay } from '@/helpers';
import useAppContext from '@/hooks/useAppContext';
import { howRarimoWorksSectionList } from '@/template-data';

const HowRarimoWorksDecor = lazy(() =>
  import('@/components/HowRarimoWorksDecor'),
);

const HowRarimoWorksSection = () => {
  const { t } = useTranslation();
  const { isDesktop } = useAppContext();

  return (
    <section className="how-rarimo-works-section">
      {isDesktop && (
        <div className="how-rarimo-works-section__decor-wrapper">
          <HowRarimoWorksDecor />
        </div>
      )}
      <div className="how-rarimo-works-section__content container">
        <SectionCard className="how-rarimo-works-section__card">
          <div className="how-rarimo-works-section__card-content">
            <h5
              className="how-rarimo-works-section__subtitle"
              data-aos="fade-up"
            >
              {t('how-rarimo-works-section.main.subtitle')}
            </h5>

            <h2 className="how-rarimo-works-section__title" data-aos="fade-up">
              {t('how-rarimo-works-section.main.title')}
            </h2>
            <p
              className="how-rarimo-works-section__description"
              data-aos="fade-up"
            >
              {t('how-rarimo-works-section.main.description')}
            </p>
            <ul className="how-rarimo-works-section__list">
              {howRarimoWorksSectionList.main.map((item, index) => (
                <li
                  key={index}
                  data-aos="fade-up"
                  data-aos-delay={getShiftedDelay(index, 100)}
                >
                  <h6 className="how-rarimo-works-section__list-item-title">
                    <span>{t(item.titleKey)}</span>
                    {/* TODO: Change icons */}
                    <div className="how-rarimo-works-section__list-item-icon">
                      <svg height="24" width="24">
                        <use href={item.icon}></use>
                      </svg>
                    </div>
                  </h6>
                  <p>{t(item.textKey)}</p>
                </li>
              ))}
            </ul>
          </div>
        </SectionCard>
        <SectionCard className="how-rarimo-works-section__card how-rarimo-works-section__card--protocol how-rarimo-works-section--identity">
          <div className="how-rarimo-works-section__subtitle-wrapper">
            <h5 className="how-rarimo-works-section__protocol-subtitle">
              {t('how-rarimo-works-section.protocol-subtitle')}
            </h5>
            <a
              className="how-rarimo-works-section__docs-link"
              href={CONFIG.docsLink}
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              {t('how-rarimo-works-section.docs-link')}
            </a>
          </div>

          <h2 className="how-rarimo-works-section__title">
            {t('how-rarimo-works-section.identity.title')}
          </h2>
          <p className="how-rarimo-works-section__description">
            {t('how-rarimo-works-section.identity.description')}
          </p>
          <ul className="how-rarimo-works-section__protocol-list">
            {howRarimoWorksSectionList.identity.map((item, index) => (
              <li
                className="how-rarimo-works-section__protocol-list-item"
                key={index}
              >
                <span className="how-rarimo-works-section__protocol-accent-text">
                  {t(item.accentTextKey)}
                </span>
                <span>{t(item.textKey)}</span>
              </li>
            ))}
          </ul>
        </SectionCard>
        <SectionCard className="how-rarimo-works-section__card how-rarimo-works-section__card--protocol how-rarimo-works-section--bridging">
          <div className="how-rarimo-works-section__subtitle-wrapper">
            <h5 className="how-rarimo-works-section__protocol-subtitle">
              {t('how-rarimo-works-section.protocol-subtitle')}
            </h5>
            <a
              className="how-rarimo-works-section__docs-link"
              href={CONFIG.docsLink}
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              {t('how-rarimo-works-section.docs-link')}
            </a>
          </div>

          <h2 className="how-rarimo-works-section__title">
            {t('how-rarimo-works-section.bridging.title')}
          </h2>
          <p className="how-rarimo-works-section__description">
            {t('how-rarimo-works-section.bridging.description')}
          </p>
          <ul className="how-rarimo-works-section__protocol-list">
            {howRarimoWorksSectionList.bridging.map((item, index) => (
              <li
                className="how-rarimo-works-section__protocol-list-item"
                key={index}
              >
                <span className="how-rarimo-works-section__protocol-accent-text">
                  {t(item.accentTextKey)}
                </span>
                <span>{t(item.textKey)}</span>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>
    </section>
  );
};

export default HowRarimoWorksSection;
