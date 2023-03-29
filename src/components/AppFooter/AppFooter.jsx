import './AppFooter.scss';

import { Link } from 'react-router-dom';
import { CONFIG } from '@/config';
import { ROUTES_PATHS } from '@/const';

const AppFooter = () => {
  return (
    <footer className="app-footer">
      <div className="app-footer__container container">
        <div className="app-footer__content">
          <Link className="app-footer__logo" to={ROUTES_PATHS.home}>
            <svg className="app-footer__logo-img" height="24" width="93">
              <use href="/icons/sprite.svg#icon-app-logo"></use>
            </svg>
          </Link>
          <div className="app-footer__links-wrapper">
            <a
              className="app-footer__link"
              href={CONFIG.discordLink}
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              <svg className="app-footer__link-icon" height="18" width="16">
                <use href="/icons/sprite.svg#icon-discord"></use>
              </svg>
            </a>
            <a
              className="app-footer__link"
              href={CONFIG.twitterLink}
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              <svg className="app-footer__link-icon" height="14" width="17">
                <use href="/icons/sprite.svg#icon-twitter"></use>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
