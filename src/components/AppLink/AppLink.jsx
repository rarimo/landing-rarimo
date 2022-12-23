import './AppLink.scss';

import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const AppLink = ({ className, routePath, href, textKey, isPrimaryScheme }) => {
  const { t } = useTranslation();

  if (routePath) {
    return (
      <Link
        className={cn([
          'app-link',
          className,
          {
            'app-link--primary': isPrimaryScheme,
          },
        ])}
        to={routePath}
      >
        {t(textKey)}
      </Link>
    );
  }

  return (
    <a
      className={cn([
        'app-link',
        className,
        {
          'app-link--primary': isPrimaryScheme,
        },
      ])}
      href={href}
      target="_blank"
      rel="nofollow noopener noreferrer"
    >
      {t(textKey)}
    </a>
  );
};

export default AppLink;
