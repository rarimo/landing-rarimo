/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import './AppSidebar.scss';

import cn from 'classnames';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import BurgerButton from '@/components/BurgerButton';
import MainOverlay from '@/components/MainOverlay';
import Portal from '@/components/Portal';
import { CONFIG } from '@/config';
import useNavigation from '@/hooks/useNavigation';
import useRouteLocation from '@/hooks/useRouteLocation';
import { navigation } from '@/template-data';

const AppSidebar = ({ isVisible, toggleVisibility }) => {
  const { t } = useTranslation();
  const { displayLocation } = useRouteLocation();
  const { handleNavClick } = useNavigation();

  return (
    <Portal>
      <MainOverlay isVisible={isVisible} onClick={toggleVisibility} />
      <aside
        className={cn([
          'app-sidebar',
          {
            'app-sidebar--is-visible': isVisible,
          },
        ])}
      >
        <header className="app-sidebar__header">
          <svg className="app-sidebar__logo" height="28" width="108">
            <use href="/icons/sprite.svg#icon-app-logo"></use>
          </svg>
          <BurgerButton onClick={toggleVisibility} isSidebarOpened />
        </header>
        <div className="app-sidebar__content">
          <nav className="app-sidebar__navigation">
            <ul className="app-sidebar__nav-list">
              {navigation.map(
                (link, index) =>
                  (!link.includeRoutes ||
                    link.includeRoutes?.includes(displayLocation.pathname)) && (
                    <li
                      className="app-sidebar__nav-item"
                      key={index}
                      onClick={() => handleNavClick(link, toggleVisibility)}
                    >
                      {t(link.textKey)}
                    </li>
                  ),
              )}
            </ul>
          </nav>

          <div className="app-sidebar__divider"></div>

          <div className="app-sidebar__social-links-wrapper">
            <a
              className="app-sidebar__social-link"
              href={CONFIG.discordLink}
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              <span>{t('app-sidebar.discord')}</span>
              <svg
                className="app-sidebar__social-link-icon"
                height="12"
                width="12"
              >
                <use href="/icons/sprite.svg#icon-arrow-right"></use>
              </svg>
            </a>
            <a
              className="app-sidebar__social-link"
              href={CONFIG.twitterLink}
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              <span>{t('app-sidebar.twitter')}</span>
              <svg
                className="app-sidebar__social-link-icon"
                height="12"
                width="12"
              >
                <use href="/icons/sprite.svg#icon-arrow-right"></use>
              </svg>
            </a>
            <a
              className="app-sidebar__social-link"
              href={CONFIG.telegramLink}
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              <span>{t('app-sidebar.telegram')}</span>
              <svg
                className="app-sidebar__social-link-icon"
                height="12"
                width="12"
              >
                <use href="/icons/sprite.svg#icon-arrow-right"></use>
              </svg>
            </a>
          </div>
        </div>
      </aside>
    </Portal>
  );
};

export default memo(AppSidebar);
