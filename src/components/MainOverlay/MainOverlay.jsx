import './MainOverlay.scss';

import cn from 'classnames';
// import { useEffect } from 'react';

const MainOverlay = ({ isVisible, onClick, className }) => {
  // useEffect(() => {
  //   // prevent body scrolling when overlay is visible
  //   const bodyRef = document.body;

  //   if (isVisible) {
  //     bodyRef.style.top = `-${window.scrollY}px`;
  //     bodyRef.style.position = 'fixed';
  //     return;
  //   }

  //   const htmlRef = document.documentElement;
  //   const scrollY = bodyRef.style.top;
  //   bodyRef.style.position = '';
  //   bodyRef.style.top = '';
  //   htmlRef.style.scrollBehavior = 'auto';
  //   window.scrollTo(0, parseInt(scrollY || '0') * -1);
  //   htmlRef.style.scrollBehavior = 'smooth';
  // }, [isVisible]);

  return (
    <div
      className={cn([
        'main-overlay',
        className,
        {
          'main-overlay--is-visible': isVisible,
        },
      ])}
      onClick={onClick}
    ></div>
  );
};

export default MainOverlay;
