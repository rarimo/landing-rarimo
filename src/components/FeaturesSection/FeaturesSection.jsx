import './FeaturesSection.scss';

import { useTranslation } from 'react-i18next';
import AppLink from '@/components/AppLink';
import PrimaryVideoParallax from '@/components/PrimaryVideoParallax';
import { getShiftedDelay } from '@/helpers';
import { featuresSectionList } from '@/template-data';
import { CONFIG } from '@/config';
import { ROUTES_PATHS } from '@/const';

const FeaturesSection = () => {
  const { t } = useTranslation();

  return (
    <section className="features-section">
      <PrimaryVideoParallax />

      <div className="container">
        <h3 className="features-section__title" data-aos="fade-right">
          {t('features-section.title')}
        </h3>
        <div
          className="features-section__links-wrapper"
          data-aos="fade-right"
          data-aos-delay="400"
        >
          <AppLink
            className="features-section__link"
            routePath={ROUTES_PATHS.testnet}
            textKey="features-section.join-testnet-link"
          />
          <AppLink
            className="features-section__link"
            href={CONFIG.whitePaperLink}
            textKey="features-section.whitepaper-link"
          />
        </div>
        <ul className="features-section__list">
          {featuresSectionList.map((item, index) => (
            <li
              className="features-section__item"
              key={index}
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay={getShiftedDelay(index, 300)}
              data-aos-anchor-placement="top-bottom"
            >
              <div className="features-section__item-icon">
                <svg height="24" width="24">
                  <use href={item.icon}></use>
                </svg>
              </div>
              <h5 className="features-section__item-title">
                {t(item.titleKey)}
              </h5>
              <p className="features-section__item-text">{t(item.textKey)}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FeaturesSection;
