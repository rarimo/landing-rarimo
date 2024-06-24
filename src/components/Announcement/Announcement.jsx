import './Announcement.scss';

const LAUNCH_DATE = new Date('2024-06-27');
const DAYS_LEFT = Math.ceil((LAUNCH_DATE - new Date()) / (1000 * 60 * 60 * 24));
const ANNOUNCEMENT_MESSAGE =
  DAYS_LEFT === 0
    ? 'RariMe app launched!'
    : `RariMe app launching in ${DAYS_LEFT} ${
        DAYS_LEFT === 1 ? 'day' : 'days'
      }`;

export default function Announcement() {
  return (
    <a
      className="announcement"
      href="https://rarime.com"
      target="_blank"
      rel="noreferrer"
    >
      <span className="announcement__title">Announcement:</span>
      <div className="announcement__content">
        <svg width="20" height="20">
          <use href="/icons/sprite.svg#icon-rarime"></use>
        </svg>
        <span className="announcement__content-text">
          {ANNOUNCEMENT_MESSAGE}
        </span>
        <svg width="13" height="13">
          <use href="/icons/sprite.svg#icon-arrow-right"></use>
        </svg>
      </div>
    </a>
  );
}
