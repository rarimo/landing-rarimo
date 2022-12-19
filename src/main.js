import '@/styles/index.scss';
import { throttle } from 'throttle-debounce';

import { initLocalization } from '@/localization';
import { defineDesktopFontSizes, hideLoader, initSwiper } from '@/js';

const imgRef = document.querySelector('.img-parallax');

const imgParent = imgRef.parentElement;

function parallaxImg() {
  const speed = 2;
  const imgY = imgParent.offsetTop;
  const winY = window.scrollY;
  const winH = window.innerHeight;
  const parentH = imgParent.clientHeight;

  // The next pixel to show on screen
  const winBottom = winY + winH;

  // If block is shown on screen
  if (winBottom > imgY && winY < imgY + parentH) {
    // Number of pixels shown after block appear
    var imgBottom = (winBottom - imgY) * speed;
    // Max number of pixels until block disappear
    var imgTop = winH + parentH;
    // Porcentage between start showing until disappearing
    var imgPercent = (imgBottom / imgTop) * 100 - speed * 50;
  }
  imgRef.style.top = `${imgPercent}%`;
  imgRef.style.transform = `translate(-50%, -${imgPercent}%)`;
}

const setup = () => {
  initLocalization();

  setTimeout(() => {
    hideLoader();
    initSwiper();
    defineDesktopFontSizes();

    const onScroll = throttle(20, parallaxImg);

    window.addEventListener('scroll', onScroll);
    onScroll();
  }, 500);
};

setup();
