import './AppBar.scss';

import cn from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { throttle } from 'throttle-debounce';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { ROUTES_PATHS } from '@/const';
import { CONFIG } from '@/config';
import { useTranslation } from 'react-i18next';

const APP_BAR_THRESHOLD = 60;

const AppBar = () => {
  const { t } = useTranslation();

  const [isAppBarHidden, setIsAppBarHidden] = useState(false);

  const lastScrollPosition = useRef(0);

  const toggleShowHeader = () => {
    const currentScrollPosition = window.pageYOffset;
    const isScrollUnderThreshold = currentScrollPosition > APP_BAR_THRESHOLD;

    if (
      currentScrollPosition > lastScrollPosition.current &&
      isScrollUnderThreshold
    ) {
      setIsAppBarHidden(true);
    } else if (currentScrollPosition < lastScrollPosition.current) {
      setIsAppBarHidden(false);
    }
    lastScrollPosition.current = currentScrollPosition;
  };

  useEffect(() => {
    const onScroll = throttle(400, toggleShowHeader);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll, { passive: true });
    };
  }, []);

  return (
    <header
      className={cn([
        'app-bar',
        {
          'app-bar--hidden': isAppBarHidden,
        },
      ])}
    >
      <div className="app-bar__container container">
        <div className="app-bar__content">
          <Link className="app-bar__logo" to={ROUTES_PATHS.home}>
            <svg className="app-bar__logo-img" height="28" width="108">
              <use href="/sprite.svg#icon-app-logo"></use>
            </svg>
          </Link>

          <div className="app-bar__navigation"></div>

          <div className="app-bar__links-wrapper">
            <a
              className="app-bar__link"
              href={CONFIG.discordLink}
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              <span>{t('app-bar.discord')}</span>
              <svg className="app-bar__link-icon" height="18" width="16">
                <use href="/sprite.svg#icon-discord"></use>
              </svg>
            </a>
            <a
              className="app-bar__link"
              href={CONFIG.twitterLink}
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              <span>{t('app-bar.twitter')}</span>
              <svg className="app-bar__link-icon" height="14" width="17">
                <use href="/sprite.svg#icon-twitter"></use>
              </svg>
            </a>
          </div>

          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
};

export default AppBar;
