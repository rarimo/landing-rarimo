import './AppBar.scss';

import cn from 'classnames';
import { throttle } from 'lodash-es';
import { lazy, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import ThemeSwitcher from '@/components/ThemeSwitcher';
import { CONFIG } from '@/config';
import { ROUTES_PATHS } from '@/const';
import useAppContext from '@/hooks/useAppContext';
import useNavigation from '@/hooks/useNavigation';
import useRouteLocation from '@/hooks/useRouteLocation';
import { navigation } from '@/template-data';

const AppSidebar = lazy(() => import('@/components/AppSidebar'));
const BurgerButton = lazy(() => import('@/components/BurgerButton'));

const APP_BAR_THRESHOLD = 60;

let onScroll;
let scrollToTopTimeout;

const AppBar = () => {
  const { t } = useTranslation();
  const { displayLocation } = useRouteLocation();
  const { handleNavClick } = useNavigation();
  const { isDesktop, needSkipAnimationRef } = useAppContext();

  const [isAppBarHidden, setIsAppBarHidden] = useState(false);
  const [isVisibleSidebar, setIsVisibleSidebar] = useState(false);
  const [isAppBarFilled, setIsAppBarFilled] = useState(false);

  const lastScrollPosition = useRef(0);

  const toggleShowHeader = () => {
    const currentScrollPosition = window.scrollY;
    const isScrollUnderThreshold = currentScrollPosition > APP_BAR_THRESHOLD;

    setIsAppBarFilled(isScrollUnderThreshold);
    if (
      currentScrollPosition > lastScrollPosition.current &&
      isScrollUnderThreshold
    ) {
      setIsAppBarHidden(true);
    } else if (currentScrollPosition < lastScrollPosition.current) {
      if (needSkipAnimationRef.current && !scrollToTopTimeout) {
        scrollToTopTimeout = setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          scrollToTopTimeout = undefined;
        }, 1500);
      }
      setIsAppBarHidden(false);
    }
    lastScrollPosition.current = currentScrollPosition;
  };

  const toggleSidebarVisibility = () => {
    setIsVisibleSidebar(prev => !prev);
  };

  useEffect(() => {
    setIsVisibleSidebar(false);
  }, [isDesktop]);

  useEffect(() => {
    onScroll = throttle(toggleShowHeader, 400);
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
          'app-bar--filled': isAppBarFilled,
        },
      ])}
    >
      <div className="app-bar__container">
        <div className="app-bar__content container">
          <Link className="app-bar__logo" to={ROUTES_PATHS.home}>
            <svg className="app-bar__logo-img" height="28" width="108">
              <use href="/icons/sprite.svg#icon-app-logo"></use>
            </svg>
          </Link>

          {isDesktop && (
            <nav className="app-bar__navigation">
              <ul className="app-bar__nav-list">
                {navigation.map(
                  (link, index) =>
                    (!link.includeRoutes ||
                      link.includeRoutes?.includes(
                        displayLocation.pathname,
                      )) && (
                      <li
                        className="app-bar__nav-item"
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
              </ul>
            </nav>
          )}

          <div className="app-bar__links-wrapper">
            <a
              className="app-bar__link"
              href={CONFIG.discordLink}
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              <svg className="app-bar__link-icon">
                <use href="/icons/sprite.svg#icon-discord"></use>
              </svg>
            </a>
            <a
              className="app-bar__link"
              href={CONFIG.twitterLink}
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              <svg className="app-bar__link-icon">
                <use href="/icons/sprite.svg#icon-x"></use>
              </svg>
            </a>

            {!isDesktop && (
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
          </div>

          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
};

export default AppBar;
