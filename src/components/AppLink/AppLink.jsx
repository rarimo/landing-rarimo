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
  children,
  onClick,
  ...rest
}) => {
  const { t } = useTranslation();

  if (routePath) {
    return (
      <Link
        className={cn(['app-link', `app-link--${scheme}`, className])}
        to={routePath}
        {...rest}
      >
        <span className="app-link__content">{children ?? t(textKey)}</span>
      </Link>
    );
  }

  if (onClick) {
    return (
      <button
        className={cn(['app-link', `app-link--${scheme}`, className])}
        type="button"
        onClick={onClick}
        {...rest}
      >
        <span className="app-link__content">{children ?? t(textKey)}</span>
      </button>
    );
  }

  return (
    <a
      className={cn(['app-link', `app-link--${scheme}`, className])}
      href={href}
      target="_blank"
      rel="nofollow noopener noreferrer"
      {...rest}
    >
      <span className="app-link__content">{children ?? t(textKey)}</span>
    </a>
  );
};

export default AppLink;
