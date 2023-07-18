import useResizeObserver from '@react-hook/resize-observer';
import { createContext, useMemo } from 'react';

import useStateRef from '@/hooks/useStateRef';

export const AppContext = createContext({});

export const AppContextProvider = ({ children }) => {
  const [isDesktop, setIsDesktop, isDesktopRef] = useStateRef(true);
  const [needSkipAnimation, setNeedSkipAnimation, needSkipAnimationRef] =
    useStateRef(false);

  useResizeObserver(document.documentElement, ({ contentRect }) => {
    setIsDesktop(contentRect.width >= 1024);
  });

  const memoizedContextValue = useMemo(() => {
    return {
      isDesktop,
      isDesktopRef,
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
