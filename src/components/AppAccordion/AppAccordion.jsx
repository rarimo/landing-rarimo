import './AppAccordion.scss';

const AppAccordion = ({ title, content, isActive, onSelect, tabIndex }) => {
  return (
    <div className={`app-accordion ${isActive ? 'app-accordion--opened' : ''}`}>
      <div
        role="tab"
        className="app-accordion__line"
        tabIndex={tabIndex}
        onClick={onSelect}
        onKeyDown={event => {
          if (event.code === 'Enter') onSelect();
        }}
      >
        <h3 className="app-accordion__title">{title}</h3>
        <svg width={20} height={20} className="app-accordion__icon">
          <use href="/icons/sprite.svg#icon-arrow-down"></use>
        </svg>
      </div>
      <div className="app-accordion__inner">{content}</div>
    </div>
  );
};

export default AppAccordion;
