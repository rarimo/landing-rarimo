import './SectionCard.scss';

const SectionCard = ({ children }) => {
  return (
    <div className="section-card">
      <div className="section-card__bg-rect">
        <div className="section-card__content">
          <>{children}</>
        </div>
      </div>
    </div>
  );
};

export default SectionCard;
