import './AppSidebar.scss';

import cn from 'classnames';
import { memo } from 'react';
import Portal from '@/components/Portal';
import MainOverlay from '@/components/MainOverlay';

const AppSidebar = ({ isVisible, toggleVisibility }) => {
  return (
    <Portal>
      <MainOverlay isVisible={isVisible} onClick={toggleVisibility} />
      <aside
        className={cn([
          'app-sidebar',
          {
            'app-sidebar--is-visible': isVisible,
          },
        ])}
      ></aside>
    </Portal>
  );
};

export default memo(AppSidebar);
