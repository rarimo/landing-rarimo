import useResizeObserver from '@react-hook/resize-observer';
import { createContext, useMemo } from 'react';

import useStateRef from '@/hooks/useStateRef';

export const AppContext = createContext({});

export const AppContextProvider = ({ children }) => {
  const [isDesktop, setIsDesktop, isDesktopRef] = useStateRef(true);
  const [isMobile, setIsMobile, isMobileRef] = useStateRef(true);

  const [needSkipAnimation, setNeedSkipAnimation, needSkipAnimationRef] =
    useStateRef(false);

  useResizeObserver(document.documentElement, ({ contentRect }) => {
    setIsDesktop(contentRect.width >= 1024);
    setIsMobile(contentRect.width <= 425);
  });

  const memoizedContextValue = useMemo(() => {
    return {
      isDesktop,
      isDesktopRef,
      isMobile,
      isMobileRef,
      needSkipAnimation,
      setNeedSkipAnimation,
      needSkipAnimationRef,
    };
  }, [isDesktop, needSkipAnimation]);

  return (
    <AppContext.Provider value={memoizedContextValue}>
      {children}
    </AppContext.Provider>
  );
};
