import './BurgerButton.scss';

import cn from 'classnames';

const BurgerButton = ({ isSidebarOpened = false, onClick, className }) => {
  return (
    <button
      className={cn([
        'burger-button',
        className,
        {
          'burger-button--is-opened': isSidebarOpened,
        },
      ])}
      onClick={onClick}
      type="button"
    >
      <div className="burger-button__inner"></div>
    </button>
  );
};

export default BurgerButton;
