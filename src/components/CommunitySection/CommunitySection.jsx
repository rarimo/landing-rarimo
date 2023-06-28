import './CommunitySection.scss';

import cn from 'classnames';
import { useTranslation } from 'react-i18next';

import AppButton, { APP_BUTTON_SCHEMES } from '@/components/AppButton';
import BaseCard from '@/components/BaseCard';
import { CONFIG } from '@/config';
import { COMPONENT_NODE_IDS, ROUTES_PATHS } from '@/const';
import { getShiftedDelay } from '@/helpers';
import { communitySectionList } from '@/template-data';

const CommunitySection = () => {
  const { t } = useTranslation();

  return (
    <section
      id={COMPONENT_NODE_IDS.communitySection}
      className="community-section container"
    >
      <BaseCard
        contentClassName="community-section__card-content"
        isSection={true}
      >
        <div>
          <div className="community-section__titles-wrapper">
            <div>
              <h3 className="community-section__title" data-aos="fade-up">
                {t('community-section.title')}
              </h3>
              <p className="community-section__description" data-aos="fade-up">
                {t('community-section.description')}
              </p>
            </div>
            <div
              className="community-section__links-wrapper"
              data-aos="fade-up"
            >
              <AppButton
                className="community-section__link"
                routePath={ROUTES_PATHS.testnetSignUp}
              >
                <span>{t('community-section.join-testnet-link')}</span>
                <svg
                  className="community-section__link-icon"
                  height="13"
                  width="13"
                >
                  <use href="/icons/sprite.svg#icon-arrow-right"></use>
                </svg>
              </AppButton>
              <AppButton
                className="community-section__link"
                href={CONFIG.whitepaperLink}
                scheme={APP_BUTTON_SCHEMES.secondary}
                textKey="community-section.whitepaper-link"
              />
            </div>
          </div>
          <ul className="community-section__list">
            {communitySectionList.map((item, index) => (
              <li className="comunity-section__list-item" key={index}>
                <a
                  className={cn([
                    'community-section__list-item-link',
                    {
                      'community-section__list-item-link--active': item.link,
                    },
                  ])}
                  href={item.link}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  data-aos="fade-up"
                  data-aos-delay={getShiftedDelay(index, 100)}
                >
                  <div className="community-section__list-item-icons-wrapper">
                    <svg
                      className="community-section__list-item-icon"
                      height="24"
                      width="24"
                    >
                      <use href={item.icon}></use>
                    </svg>
                    {item.link && (
                      <svg
                        className="community-section__arrow-icon"
                        height="14"
                        width="14"
                      >
                        <use href="/icons/sprite.svg#icon-arrow-right"></use>
                      </svg>
                    )}
                  </div>
                  <h6 className="community-section__list-item-title">
                    {t(item.titleKey)}
                  </h6>
                  <p className="community-section__list-item-description">
                    {t(item.descKey)}
                  </p>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </BaseCard>
    </section>
  );
};

export default CommunitySection;
