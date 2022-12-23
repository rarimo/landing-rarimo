import './AppBar.scss';

import { useEffect, useRef } from 'react';
import { throttle } from 'throttle-debounce';
import ThemeSwitcher from '@/components/ThemeSwitcher';

const AppBar = () => {
  const appBarRef = useRef(null);

  const APP_BAR_THRESHOLD = 60;
  let prevIsAppBarFilled = false;
  let lastScrollPosition = 0;

  const toggleShowHeader = () => {
    const currentScrollPosition = window.pageYOffset;
    const isScrollUnderThreshold = currentScrollPosition > APP_BAR_THRESHOLD;

    if (isScrollUnderThreshold !== prevIsAppBarFilled) {
      appBarRef.current?.classList.toggle('app-bar--filled');

      prevIsAppBarFilled = isScrollUnderThreshold;
    }

    if (currentScrollPosition > lastScrollPosition && isScrollUnderThreshold) {
      appBarRef.current?.classList.add('app-bar--hidden');
    } else if (currentScrollPosition < lastScrollPosition) {
      appBarRef.current?.classList.remove('app-bar--hidden');
    }

    lastScrollPosition = currentScrollPosition;
  };

  const onScroll = useRef(throttle(400, toggleShowHeader));

  useEffect(() => {
    window.addEventListener('scroll', onScroll.current, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll.current, { passive: true });
    };
  }, []);

  return (
    <header ref={appBarRef} className="app-bar">
      <div className="app-bar__container container">
        <div className="app-bar__content">
          <a href="#" className="app-bar__logo">
            <svg className="app-bar__logo-img" height="28" width="108">
              <use href="/sprite.svg#icon-app-logo"></use>
            </svg>
          </a>
          <div className="app-bar__navigation"></div>

          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
};

export default AppBar;
