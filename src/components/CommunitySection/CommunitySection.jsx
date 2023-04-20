import './CommunitySection.scss';

import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import AppButton, { APP_BUTTON_SCHEMES } from '@/components/AppButton';
import SectionWrapper from '@/components/SectionWrapper';
import { communitySectionList } from '@/template-data';
import { CONFIG } from '@/config';
import { ROUTES_PATHS } from '@/const';
import { getShiftedDelay } from '@/helpers';

const CommunitySection = ({ isHomePage = true }) => {
  const { t } = useTranslation();

  return (
    <SectionWrapper>
      <section
        className={cn([
          'community-section container',
          {
            'community-section--testnet': !isHomePage,
          },
        ])}
      >
        <div className="community-section__titles-wrapper">
          <h4 className="community-section__title" data-aos="fade-up">
            {t('community-section.title')}
          </h4>
          {isHomePage && (
            <p className="community-section__description" data-aos="fade-up">
              {t('community-section.description')}
            </p>
          )}
          <div className="community-section__links-wrapper" data-aos="fade-up">
            {isHomePage ? (
              <>
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
              </>
            ) : (
              <AppButton
                className="community-section__link"
                routePath={ROUTES_PATHS.testnetSignUp}
                scheme={APP_BUTTON_SCHEMES.secondary}
                textKey="community-section.sign-up-link"
              />
            )}
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
                <svg
                  className="community-section__list-item-icon"
                  height="32"
                  width="32"
                >
                  <use href={item.icon}></use>
                </svg>

                <div>
                  <h6 className="community-section__list-item-title">
                    {t(item.titleKey)}
                  </h6>
                  <p className="community-section__list-item-description">
                    {t(item.descKey)}
                  </p>
                </div>
                {item.link && (
                  <svg
                    className="community-section__arrow-icon"
                    height="12"
                    width="12"
                  >
                    <use href="/icons/sprite.svg#icon-arrow-right"></use>
                  </svg>
                )}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </SectionWrapper>
  );
};

export default CommunitySection;
