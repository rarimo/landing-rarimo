import { CONFIG } from '@/config';
import { useEffect, useRef } from 'react';
import { throttle } from 'throttle-debounce';

const PrimaryVideoParallax = () => {
  const videoRef = useRef(null);

  const parallax = () => {
    const parentRef = videoRef.current?.parentElement;
    const speed = 2;
    const parentOffsetTop = parentRef?.offsetTop;
    const windowScrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const parentHeight = parentRef?.clientHeight;

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

      videoRef.current.style.top = `${imgPercent}%`;
      videoRef.current.style.transform = `translate(-50%, ${-imgPercent}%)`;
    }
  };

  const onScroll = useRef(throttle(20, parallax));

  useEffect(() => {
    videoRef.current?.play();

    window.addEventListener('scroll', onScroll.current, { passive: true });
    setTimeout(() => {
      onScroll.current();
    }, CONFIG.initLoaderDelay);

    return () => {
      window.removeEventListener('scroll', onScroll.current, { passive: true });
    };
  }, []);

  return (
    <video
      ref={videoRef}
      muted
      loop
      playsInline
      className="primary-video-parallax"
      poster="/img/bg/primary-stains-bg.jpg"
    >
      <source src="/video/primary-video-bg.webm" type="video/webm" />
      <source src="/video/primary-video-bg.mp4" type="video/mp4" />
    </video>
  );
};

export default PrimaryVideoParallax;
