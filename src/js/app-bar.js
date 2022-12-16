import { throttle } from 'throttle-debounce';

const appBarRef = document.getElementById('app-bar');

const APP_BAR_THRESHOLD = 60;
let prevIsAppBarFilled = false;
let lastScrollPosition = 0;

const toggleShowHeader = () => {
  const currentScrollPosition = window.pageYOffset;
  const isScrollUnderThreshold = currentScrollPosition > APP_BAR_THRESHOLD;

  if (isScrollUnderThreshold !== prevIsAppBarFilled) {
    appBarRef.classList.toggle('app-bar--filled');

    prevIsAppBarFilled = isScrollUnderThreshold;
  }

  if (currentScrollPosition > lastScrollPosition && isScrollUnderThreshold) {
    appBarRef.classList.add('app-bar--hidden');
  } else if (currentScrollPosition < lastScrollPosition) {
    appBarRef.classList.remove('app-bar--hidden');
  }

  lastScrollPosition = currentScrollPosition;
};
const onScroll = throttle(400, toggleShowHeader);

window.addEventListener('scroll', onScroll);
