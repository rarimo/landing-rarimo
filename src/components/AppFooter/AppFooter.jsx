import './AppFooter.scss';

import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import SectionWrapper from '@/components/SectionWrapper';
import AppLink, { APP_LINK_SCHEMES } from '@/components/AppLink';
import { CONFIG } from '@/config';
import { ROUTES_PATHS } from '@/const';

const AppFooter = () => {
  const { t } = useTranslation();

  const onScrollToTop = () => {
    window.scrollTo({ top: 0 });
  };

  return (
    <SectionWrapper className="app-footer">
      <div className="app-footer__wrapper container">
        <table className="app-footer__bg-table">
          <tbody>
            {Array(4)
              .fill(null)
              .map((_, i) => (
                <tr key={i}>
                  <td className="app-footer__bg-table-cell" />
                </tr>
              ))}
          </tbody>
        </table>
        <footer className="app-footer__content">
          <div className="app-footer__logo-wrapper">
            <Link className="app-footer__logo" to={ROUTES_PATHS.home}>
              <svg className="app-footer__logo-img" height="24" width="93">
                <use href="/icons/sprite.svg#icon-app-logo"></use>
              </svg>
            </Link>
            <span>&copy; {new Date().getFullYear()}</span>
          </div>
          {/* <div className="app-footer__navigation"></div> */}
          <div className="app-footer__social-links-wrapper">
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
          </div>
          <div className="app-footer__space" />
          <AppLink
            className="app-footer__scroll-to-top-btn"
            scheme={APP_LINK_SCHEMES.secondary}
            onClick={onScrollToTop}
          >
            <svg
              className="app-footer__scroll-to-top-icon"
              height="16"
              width="16"
            >
              <use href="/icons/sprite.svg#icon-arrow-right"></use>
            </svg>
          </AppLink>
        </footer>
      </div>
    </SectionWrapper>
  );
};

export default AppFooter;
