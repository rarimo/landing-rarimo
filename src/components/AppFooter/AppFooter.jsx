import { CONFIG } from '@/config';
import './AppFooter.scss';

const AppFooter = () => {
  return (
    <footer className="app-footer">
      <div className="app-footer__container container">
        <div className="app-footer__content">
          <a href="#" className="app-footer__logo">
            <svg className="app-footer__logo-img" height="24" width="93">
              <use href="/sprite.svg#icon-app-logo"></use>
            </svg>
          </a>
          <div className="app-footer__links-wrapper">
            <a
              className="app-footer__link"
              href={CONFIG.discordLink}
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              <svg className="app-footer__link-icon" height="18" width="16">
                <use href="/sprite.svg#icon-discord"></use>
              </svg>
            </a>
            <a
              className="app-footer__link"
              href={CONFIG.twitterLink}
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              <svg className="app-footer__link-icon" height="14" width="17">
                <use href="/sprite.svg#icon-twitter"></use>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
