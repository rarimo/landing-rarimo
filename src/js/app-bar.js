import { throttle } from 'throttle-debounce';

const appBarRef = document.getElementById('app-bar');

const APP_BAR_THRESHOLD = 60;
let prevIsAppBarFilled = false;

const toggleShowHeader = () => {
  const currentScrollPosition = window.pageYOffset;
  let _isAppBarFilled = currentScrollPosition > APP_BAR_THRESHOLD;

  if (_isAppBarFilled !== prevIsAppBarFilled) {
    appBarRef.classList.toggle('app-bar--filled');

    prevIsAppBarFilled = _isAppBarFilled;
  }
};
const onScroll = throttle(400, toggleShowHeader);

window.addEventListener('scroll', onScroll);
