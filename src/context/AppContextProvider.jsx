import useResizeObserver from '@react-hook/resize-observer';
import { createContext, useMemo, useState } from 'react';

export const AppContext = createContext({});

export const AppContextProvider = ({ children }) => {
  const [isDesktop, setIsDesktop] = useState(true);

  useResizeObserver(document.body, ({ contentRect }) => {
    setIsDesktop(contentRect.width >= 1024);
  });

  const memoizedContextValue = useMemo(() => {
    return {
      isDesktop,
    };
  }, [isDesktop]);

  return (
    <AppContext.Provider value={memoizedContextValue}>
      {children}
    </AppContext.Provider>
  );
};
