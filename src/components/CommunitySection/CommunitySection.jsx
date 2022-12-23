import './CommunitySection.scss';

import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import AppLink from '@/components/AppLink';
import BaseCardList from '@/components/BaseCardList';
import { getShiftedDelay } from '@/helpers';
import { communitySectionList } from '@/template-data';
import { CONFIG } from '@/config';

const CommunitySection = ({ isHomePage = true }) => {
  const { t } = useTranslation();

  return (
    <section
      className={cn([
        'community-section container',
        {
          'community-section--testnet': !isHomePage,
        },
      ])}
    >
      <div className="community-section__titles-wrapper">
        <h2 className="community-section__title" data-aos="zoom-in">
          {t('community-section.title')}
        </h2>
        {isHomePage && (
          <p
            className="community-section__description"
            data-aos="zoom-in"
            data-aos-delay="400"
          >
            {t('community-section.description')}
          </p>
        )}
      </div>
      <div
        className="community-section__links-wrapper"
        data-aos="zoom-in"
        data-aos-delay={isHomePage ? '800' : '400'}
      >
        {isHomePage ? (
          <>
            <AppLink
              className="community-section__link"
              href="#"
              textKey="community-section.join-testnet-link"
            />
            <AppLink
              className="community-section__link"
              href={CONFIG.whitePaperLink}
              textKey="community-section.white-paper-link"
            />
          </>
        ) : (
          <AppLink
            className="community-section__link"
            href="#"
            textKey="community-section.sign-up-link"
          />
        )}
      </div>

      <BaseCardList>
        {communitySectionList.map((item, index) => (
          <li
            className="community-section__card"
            key={index}
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay={getShiftedDelay(index, 300)}
            data-aos-anchor-placement="top-bottom"
          >
            <a
              className={cn([
                'community-section__card-link',
                {
                  'community-section__card-link--active': item.link,
                },
              ])}
              href={item.link}
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              <div className="community-section__card-icon">
                <svg height="20" width="20">
                  <use href={item.icon}></use>
                </svg>
              </div>
              <h5 className="community-section__card-title">
                {t(item.titleKey)}
              </h5>
              <div className="community-section__learn-more-wrapper">
                {item.link ? (
                  <>
                    <span>{t('community-section.learn-more-link')}</span>
                    <svg
                      className="community-section__learn-more-icon"
                      height="13"
                      width="11"
                    >
                      <use href="/sprite.svg#icon-chevron-down"></use>
                    </svg>
                  </>
                ) : (
                  <span>{t('community-section.coming-soon-text')}</span>
                )}
              </div>
            </a>
          </li>
        ))}
      </BaseCardList>
    </section>
  );
};

export default CommunitySection;
