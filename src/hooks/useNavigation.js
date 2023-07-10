import { useNavigate } from 'react-router-dom';

import { CONFIG } from '@/config';
import useAppContext from '@/hooks/useAppContext';

const useNavigation = () => {
  const { setNeedSkipAnimation } = useAppContext();
  const navigate = useNavigate();

  const handleNavClick = (link, callback) => {
    if (link.routeLink) {
      navigate(link.routeLink);
      callback?.();
      return;
    }

    if (link.hash) {
      const targetElement = document.getElementById(link.path);
      if (!targetElement) return;
      setNeedSkipAnimation(true);
      targetElement.scrollIntoView({ behavior: 'smooth' });
      callback?.();
      setTimeout(() => {
        setNeedSkipAnimation(false);
      }, CONFIG.htmlScrollingTime);
      return;
    }

    if (link.external) {
      const linkElement = document.createElement('a');
      linkElement.href = link.path;
      linkElement.target = '_blank';
      linkElement.rel = 'nofollow noopener noreferrer';
      linkElement.click();
      return;
    }
  };

  return { handleNavClick };
};

export default useNavigation;
