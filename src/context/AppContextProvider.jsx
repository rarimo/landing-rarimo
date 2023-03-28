import useResizeObserver from '@react-hook/resize-observer';
import { createContext, useEffect, useMemo, useRef } from 'react';

const DEFAULT_RECT_COUNT = 40;

export const AppContext = createContext({});

export const AppContextProvider = ({ children, isInited }) => {
  const rootRef = useRef(null);
  const containerRef = useRef(null);

  const defineSectionWrapperShift = pixelsPerRem => {
    const bodyWidth = document.body.clientWidth;
    const containerWidth = containerRef.current.clientWidth;
    const diff = bodyWidth - containerWidth;
    const bgRectSize =
      Number.parseFloat(
        getComputedStyle(rootRef.current).getPropertyValue(
          '--primary-bg-rect-size',
        ),
      ) * 16; // *16 for converting in pixels
    const shiftInPx = (diff / 2) % bgRectSize;

    rootRef.current.style.setProperty(
      '--section-wrapper-shift',
      shiftInPx / pixelsPerRem + 'rem',
    );
  };

  const defineBgRectSize = pixelsPerRem => {
    const containerWidth = containerRef.current.clientWidth;
    const rectSizeInPx = containerWidth / DEFAULT_RECT_COUNT;

    rootRef.current.style.setProperty(
      '--primary-bg-rect-size',
      rectSizeInPx / pixelsPerRem + 'rem',
    );
  };

  const positionBg = () => {
    if (!isInited) return;

    if (!containerRef.current || !rootRef.current) {
      rootRef.current = document.documentElement;
      containerRef.current = rootRef.current.querySelector('.container');
    }

    const pixelsPerRem = Number(
      getComputedStyle(rootRef.current).fontSize.slice(0, -2),
    );

    defineBgRectSize(pixelsPerRem);
    defineSectionWrapperShift(pixelsPerRem);
  };

  useResizeObserver(document.body, entry => {
    positionBg();
  });

  useEffect(() => {
    positionBg();
  }, [isInited]);

  const memoizedContextValue = useMemo(() => {
    return {};
  }, []);

  return (
    <AppContext.Provider value={memoizedContextValue}>
      {children}
    </AppContext.Provider>
  );
};
