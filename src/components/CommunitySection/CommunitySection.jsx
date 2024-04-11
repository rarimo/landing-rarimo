import './CommunitySection.scss';

import cn from 'classnames';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import AppButton from '@/components/AppButton';
import { CONFIG } from '@/config';
import { COMPONENT_NODE_IDS } from '@/const';
import { getShiftedDelay } from '@/helpers';
import { communitySectionList } from '@/template-data';

import GlowingCard from '../GlowingCard';

const CommunitySection = () => {
  const { t } = useTranslation();

  return (
    <section
      id={COMPONENT_NODE_IDS.communitySection}
      className="community-section container"
    >
      <div className="community-section__title-wrp" data-aos="fade-up">
        <h2 className="community-section__title">
          {t('community-section.title')}
        </h2>
        <p className="community-section__text">
          {t('community-section.description')}
        </p>
        <AppButton
          className="community-section__link"
          href={CONFIG.docsOverviewLink}
        >
          <span>{t('home-hero-section.getting-started-link')}</span>
          <svg className="community-section__link-icon" height="13" width="13">
            <use href="/icons/sprite.svg#icon-arrow-right"></use>
          </svg>
        </AppButton>
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
              <GlowingCard className="community-section__list-item-content">
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
              </GlowingCard>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default memo(CommunitySection);
