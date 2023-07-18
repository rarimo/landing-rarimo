import { throttle } from 'lodash-es';
import { useEffect, useRef } from 'react';

import { VIDEO_BG_COLOR } from '@/const';

const videoData = {
  [VIDEO_BG_COLOR.primary]: {
    poster: '/img/bg/primary-stains-bg.jpg',
    webm: '/video/primary-video-bg.webm',
    mp4: '/video/primary-video-bg.mp4',
  },
  [VIDEO_BG_COLOR.blue]: {
    poster: '/img/bg/primary-stains-bg.jpg',
    webm: '/video/blue-video-bg.webm',
    mp4: '/video/blue-video-bg.mp4',
  },
};

const PrimaryVideoParallax = ({ type = VIDEO_BG_COLOR.primary }) => {
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

  const onScroll = useRef(throttle(parallax, 20));

  useEffect(() => {
    videoRef.current?.play();

    window.addEventListener('scroll', onScroll.current, { passive: true });
    setTimeout(() => {
      onScroll.current();
    }, 200);

    return () => {
      window.removeEventListener('scroll', onScroll.current, { passive: true });
    };
  }, []);

  const currentVideoData = videoData[type];

  return (
    <video
      ref={videoRef}
      muted
      loop
      playsInline
      className="primary-video-parallax"
      poster={currentVideoData.poster}
    >
      <source src={currentVideoData.webm} type="video/webm" />
      <source src={currentVideoData.mp4} type="video/mp4" />
    </video>
  );
};

export default PrimaryVideoParallax;
