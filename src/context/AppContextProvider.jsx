import useResizeObserver from '@react-hook/resize-observer';
import { createContext, useMemo } from 'react';

import useStateRef from '@/hooks/useStateRef';

export const AppContext = createContext({});

export const AppContextProvider = ({ children }) => {
  const [isDesktop, setIsDesktop, isDesktopRef] = useStateRef(true);

  useResizeObserver(document.documentElement, ({ contentRect }) => {
    setIsDesktop(contentRect.width >= 1024);
  });

  const memoizedContextValue = useMemo(() => {
    return {
      isDesktop,
      isDesktopRef,
    };
  }, [isDesktop]);

  return (
    <AppContext.Provider value={memoizedContextValue}>
      {children}
    </AppContext.Provider>
  );
};
