import './AppButton.scss';

import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export const APP_BUTTON_SCHEMES = {
  primary: 'primary',
  secondary: 'secondary',
  text: 'text',
};

const AppButton = ({
  className,
  routePath,
  href,
  textKey,
  scheme = APP_BUTTON_SCHEMES.primary,
  children,
  onClick,
  disabled = false,
  ...rest
}) => {
  const { t } = useTranslation();

  if (routePath && !disabled) {
    return (
      <Link
        className={cn(['app-button', `app-button--${scheme}`, className])}
        to={routePath}
        onClick={onClick}
        {...rest}
      >
        <span className="app-button__content">{children ?? t(textKey)}</span>
      </Link>
    );
  }

  if (href && !disabled) {
    return (
      <a
        className={cn(['app-button', `app-button--${scheme}`, className])}
        href={href}
        target="_blank"
        rel="nofollow noopener noreferrer"
        onClick={onClick}
        {...rest}
      >
        <span className="app-button__content">{children ?? t(textKey)}</span>
      </a>
    );
  }

  return (
    <button
      disabled={disabled}
      className={cn(['app-button', `app-button--${scheme}`, className])}
      type="button"
      onClick={onClick}
      {...rest}
    >
      <span className="app-button__content">{children ?? t(textKey)}</span>
    </button>
  );
};

export default AppButton;
