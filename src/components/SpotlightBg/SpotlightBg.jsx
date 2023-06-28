import './SpotlightBg.scss';

import { useEffect, useRef } from 'react';

import useAppContext from '@/hooks/useAppContext';

let onMousemove;

const SpotlightBg = () => {
  const { isDesktop } = useAppContext();

  const spotlightRef = useRef(null);

  useEffect(() => {
    if (isDesktop) {
      const parentHeight =
        spotlightRef.current?.parentNode?.clientHeight ??
        window.screen.availHeight;

      const onMousemove = ({ pageX, pageY }) => {
        if (!spotlightRef.current || window.scrollY > parentHeight) return;

        const x = pageX;
        const y = pageY;
        const spotlightSize = 'transparent 80px, rgba(0, 0, 0, 0.8) 200px)';

        spotlightRef.current.style.backgroundImage = `radial-gradient(circle at ${x}px ${y}px, ${spotlightSize}`;
      };

      document.addEventListener('mousemove', onMousemove);
      return;
    }

    if (!isDesktop) {
      window.removeEventListener('mousemove', onMousemove);
    }

    return () => {
      window.removeEventListener('mousemove', onMousemove);
    };
  }, [isDesktop]);

  return (
    <>
      <div className="spotlight-bg__bg-rect-backdrop" />
      {isDesktop && (
        <div ref={spotlightRef} className="spotlight-bg__spotlight" />
      )}
    </>
  );
};

export default SpotlightBg;
