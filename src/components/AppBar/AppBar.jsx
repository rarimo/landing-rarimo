import './AppBar.scss';

import cn from 'classnames';
import useResizeObserver from '@react-hook/resize-observer';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { throttle } from 'throttle-debounce';
import BurgerButton from '@/components/BurgerButton';
import AppSidebar from '@/components/AppSidebar';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { ROUTES_PATHS } from '@/const';
import { CONFIG } from '@/config';

const APP_BAR_THRESHOLD = 60;

const AppBar = () => {
  const { t } = useTranslation();

  const [isAppBarHidden, setIsAppBarHidden] = useState(false);
  const [isVisibleSidebar, setIsVisibleSidebar] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

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

  const toggleSidebarVisibility = () => {
    setIsVisibleSidebar(prev => !prev);
  };

  useResizeObserver(document.body, ({ contentRect }) => {
    setIsDesktop(contentRect.width >= 1024);
  });

  useEffect(() => {
    setIsVisibleSidebar(false);
  }, [isDesktop]);

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
        'app-bar container',
        {
          'app-bar--hidden': isAppBarHidden,
        },
      ])}
    >
      <div className="app-bar__container container">
        <div className="app-bar__content">
          <Link className="app-bar__logo" to={ROUTES_PATHS.home}>
            <svg className="app-bar__logo-img" height="28" width="108">
              <use href="/icons/sprite.svg#icon-app-logo"></use>
            </svg>
          </Link>

          {isDesktop ? (
            <>
              <div className="app-bar__navigation"></div>

              <div className="app-bar__links-wrapper">
                <a
                  className="app-bar__link"
                  href={CONFIG.discordLink}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                >
                  <span>{t('app-bar.discord')}</span>
                  <svg className="app-bar__link-icon" height="12" width="12">
                    <use href="/icons/sprite.svg#icon-arrow-right"></use>
                  </svg>
                </a>
                <a
                  className="app-bar__link"
                  href={CONFIG.twitterLink}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                >
                  <span>{t('app-bar.twitter')}</span>
                  <svg className="app-bar__link-icon" height="12" width="12">
                    <use href="/icons/sprite.svg#icon-arrow-right"></use>
                  </svg>
                </a>
              </div>
            </>
          ) : (
            <>
              <BurgerButton
                className="app-bar__sidebar-btn"
                onClick={toggleSidebarVisibility}
              />
              <AppSidebar
                isVisible={isVisibleSidebar}
                toggleVisibility={toggleSidebarVisibility}
              />
            </>
          )}

          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
};

export default AppBar;
