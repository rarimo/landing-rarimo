import './AppBar.scss';

import useResizeObserver from '@react-hook/resize-observer';
import cn from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { throttle } from 'throttle-debounce';

import AppSidebar from '@/components/AppSidebar';
import BurgerButton from '@/components/BurgerButton';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { CONFIG } from '@/config';
import { ROUTES_PATHS } from '@/const';
import { handleNavClick } from '@/helpers';
import { navigation } from '@/template-data';

const APP_BAR_THRESHOLD = 60;

const AppBar = () => {
  const { t } = useTranslation();

  const [isAppBarHidden, setIsAppBarHidden] = useState(false);
  const [isVisibleSidebar, setIsVisibleSidebar] = useState(false);
  const [isAppBarFilled, setIsAppBarFilled] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  const lastScrollPosition = useRef(0);

  const toggleShowHeader = () => {
    const currentScrollPosition = window.pageYOffset;
    const isScrollUnderThreshold = currentScrollPosition > APP_BAR_THRESHOLD;

    setIsAppBarFilled(isScrollUnderThreshold);
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

          {isDesktop ? (
            <>
              <nav className="app-bar__navigation">
                <ul className="app-bar__nav-list">
                  {navigation.map((link, index) => (
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
                  ))}
                </ul>
              </nav>

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
                <a
                  className="app-bar__link"
                  href={CONFIG.telegramLink}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                >
                  <span>{t('app-bar.telegram')}</span>
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
