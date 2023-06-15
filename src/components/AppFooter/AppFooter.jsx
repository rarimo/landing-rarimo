import './AppFooter.scss';

import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { CONFIG } from '@/config';
import { ROUTES_PATHS } from '@/const';
import useNavigation from '@/hooks/useNavigation';
import useRouteLocation from '@/hooks/useRouteLocation';
import { navigation } from '@/template-data';

const AppFooter = () => {
  const { t } = useTranslation();
  const { displayLocation } = useRouteLocation();
  const { handleNavClick } = useNavigation();

  // Exclude home page link
  const navList = useMemo(() => navigation.filter((_, index) => index), []);

  return (
    <footer className="app-footer container">
      <div className="app-footer__content" data-aos="fade-up">
        <div className="app-footer__logo-wrapper">
          <Link className="app-footer__logo" to={ROUTES_PATHS.home}>
            <svg className="app-footer__logo-img" height="24" width="93">
              <use href="/icons/sprite.svg#icon-app-logo"></use>
            </svg>
          </Link>
          <p className="app-footer__description">
            {t('app-footer.description')}
          </p>
          <span>&copy; {new Date().getFullYear()}</span>
        </div>
        <ul className="app-footer__links-list">
          <>
            <li className="app-footer__list-title">
              {t('app-footer.nav-title')}
            </li>
            {navList.map(
              (link, index) =>
                (!link.includeRoutes ||
                  link.includeRoutes?.includes(displayLocation.pathname)) && (
                  <li
                    className="app-footer__link"
                    key={index}
                    role="link"
                    tabIndex="0"
                    onClick={() => handleNavClick(link)}
                    onKeyDown={event => {
                      switch (event.code) {
                        case 'Enter':
                          handleNavClick(link);
                          return;

                        default:
                          return;
                      }
                    }}
                  >
                    {t(link.textKey)}
                  </li>
                ),
            )}
          </>
        </ul>
        <ul className="app-footer__links-list">
          <li className="app-footer__list-title">
            {t('app-footer.follow-us-title')}
          </li>
          <li>
            <a
              className="app-footer__link"
              href={CONFIG.discordLink}
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              <span>{t('app-footer.discord')}</span>
              <svg className="app-footer__link-icon" height="12" width="12">
                <use href="/icons/sprite.svg#icon-arrow-right"></use>
              </svg>
            </a>
          </li>
          <li>
            <a
              className="app-footer__link"
              href={CONFIG.twitterLink}
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              <span>{t('app-footer.twitter')}</span>
              <svg className="app-footer__link-icon" height="12" width="12">
                <use href="/icons/sprite.svg#icon-arrow-right"></use>
              </svg>
            </a>
          </li>
          <li>
            <a
              className="app-footer__link"
              href={CONFIG.telegramLink}
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              <span>{t('app-footer.telegram')}</span>
              <svg className="app-footer__link-icon" height="12" width="12">
                <use href="/icons/sprite.svg#icon-arrow-right"></use>
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default AppFooter;
