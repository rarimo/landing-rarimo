import { throttle } from 'throttle-debounce';

const parallaxObjectRefs = document.querySelectorAll('.primary-video-parallax');

export const initParallax = () => {
  const refsArray = [...parallaxObjectRefs];

  // Fallback autoplay for mobile Safari
  refsArray.forEach(videoRef => {
    videoRef.play();
  });

  const parallax = () => {
    refsArray.forEach(videoRef => {
      const parentRef = videoRef.parentElement;
      const speed = 2;
      const parentOffsetTop = parentRef.offsetTop;
      const windowScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const parentHeight = parentRef.clientHeight;

      // The next pixel to show on screen
      const windowBottom = windowScrollY + windowHeight;

      // If block is shown on screen
      if (
        windowBottom > parentOffsetTop &&
        windowScrollY < parentOffsetTop + parentHeight
      ) {
        // Number of pixels shown after block appear
        const imgBottom = (windowBottom - parentOffsetTop) * speed;
        // Max number of pixels until block disappear
        const imgTop = windowHeight + parentHeight;
        // Porcentage between start showing until disappearing
        const imgPercent = (imgBottom / imgTop) * 100 + (50 - speed * 50);

        videoRef.style.top = `${imgPercent}%`;
        videoRef.style.transform = `translate(-50%, ${-imgPercent}%)`;
      }
    });
  };

  const onScroll = throttle(20, parallax);

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
};
