import { createContext, useEffect, useMemo, useRef } from 'react';
import useResizeObserver from '@react-hook/resize-observer';
import useRouteLocationContext from '@/hooks/useRouteLocation';
import { getScrollbarWidth } from '@/helpers';

const DEFAULT_RECT_SIZE = 40;

const getDefaultRectCount = containerWidth => {
  switch (true) {
    case containerWidth >= 1200:
      return 40;
    case containerWidth >= 1024:
      return 34;
    default:
      return Math.round((containerWidth * 2.7) / 100); // 2.7%
  }
};

export const AppContext = createContext({});

export const AppContextProvider = ({ children, isInited }) => {
  const { displayLocation } = useRouteLocationContext();

  const rootRef = useRef(null);
  const containerRef = useRef(null);
  const scrollbarWidth = useRef(null);

  const defineSectionWrapperShift = pixelsPerRem => {
    const bodyWidth = document.body.clientWidth;
    const containerWidth = containerRef.current?.clientWidth ?? 0;
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
    const containerWidth = containerRef.current?.clientWidth ?? 0;
    const defaultRectCount = getDefaultRectCount(
      containerWidth + scrollbarWidth.current,
    );
    const rectSizeInPx = containerWidth / defaultRectCount || DEFAULT_RECT_SIZE;

    rootRef.current.style.setProperty(
      '--primary-bg-rect-size',
      `${rectSizeInPx / pixelsPerRem}rem`,
    );
  };

  const positionBg = () => {
    // FIXME: need to optimize interaction with DOM

    // if (!containerRef.current || !rootRef.current) {
    //   rootRef.current = document.documentElement;
    //   containerRef.current = rootRef.current.querySelector('.container');
    // }
    if (!rootRef.current) {
      rootRef.current = document.documentElement;
    }

    scrollbarWidth.current ??= getScrollbarWidth();

    containerRef.current = rootRef.current.querySelector('.container');

    const pixelsPerRem = Number(
      getComputedStyle(rootRef.current).fontSize.slice(0, -2),
    );

    defineBgRectSize(pixelsPerRem);
    defineSectionWrapperShift(pixelsPerRem);
  };

  useResizeObserver(document.body, () => {
    if (!isInited) return;

    positionBg();
  });

  useEffect(() => {
    if (!isInited) return;

    positionBg();
  }, [isInited, displayLocation]);

  const memoizedContextValue = useMemo(() => {
    return {};
  }, []);

  return (
    <AppContext.Provider value={memoizedContextValue}>
      {children}
    </AppContext.Provider>
  );
};
