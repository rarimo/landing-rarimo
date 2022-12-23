import './AppLink.scss';

import cn from 'classnames';
import { useTranslation } from 'react-i18next';

const AppLink = ({ className, href, textKey, isPrimaryScheme }) => {
  const { t } = useTranslation();

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
