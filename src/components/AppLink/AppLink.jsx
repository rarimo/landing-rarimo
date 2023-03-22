import './AppLink.scss';

import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export const APP_LINK_SCHEMES = {
  primary: 'primary',
  secondary: 'secondary',
};

const AppLink = ({
  className,
  routePath,
  href,
  textKey,
  scheme = APP_LINK_SCHEMES.primary,
}) => {
  const { t } = useTranslation();

  if (routePath) {
    return (
      <Link
        className={cn(['app-link', `app-link--${scheme}`, className])}
        to={routePath}
      >
        <span className="app-link__content">{t(textKey)}</span>
      </Link>
    );
  }

  return (
    <a
      className={cn(['app-link', `app-link--${scheme}`, className])}
      href={href}
      target="_blank"
      rel="nofollow noopener noreferrer"
    >
      <span className="app-link__content">{t(textKey)}</span>
    </a>
  );
};

export default AppLink;
