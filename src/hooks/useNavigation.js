import { useNavigate } from 'react-router-dom';

const useNavigation = () => {
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

      targetElement.scrollIntoView({ behavior: 'smooth' });
      callback?.();
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
