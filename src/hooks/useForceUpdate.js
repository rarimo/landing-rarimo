import { useState } from 'react';

const useForceUpdate = () => {
  const [, setValue] = useState(0);
  return () => setValue(prev => prev + 1);
};

export default useForceUpdate;
