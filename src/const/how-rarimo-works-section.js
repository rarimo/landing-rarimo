import { TOUCH_EVENTS } from '@/const/events';
import { fillFramesRange } from '@/helpers';

export const SWIPER_PARAMS = {
  longSwipes: false,
  allowTouchMove: false,
  grabCursor: false,
  resistance: false,
  speed: 1500,
  effect: 'creative',
  creativeEffect: {
    limitProgress: 2,
    prev: {
      translate: [0, '-106%', 1],
    },
    next: {
      translate: [0, '4vh', 0],
      scale: 0.95,
      opacity: 0.95,
    },
  },
};
export const SWIPER_PARAMS_MOBILE = {
  longSwipes: true,
  pagination: true,
  allowTouchMove: true,
  autoHeight: true,
  grabCursor: false,
  resistance: false,
  freeMode: true,
  effect: 'coverflow',
  coverflowEffect: {
    rotate: 5,
    scale: 0.98,
  },
};
export const LOTTIE_PARAMS = {
  renderer: 'svg',
  loop: false,
  autoplay: true,
  path: '/animation/how-rarimo-works.json',
};

export const LAST_STEP_FRAME = 96;

export const STEP_FRAMES = [
  fillFramesRange(20),
  fillFramesRange(55),
  fillFramesRange(LAST_STEP_FRAME),
];

export const SWIPER_PROGRESS = {
  zero: 0,
  one: 1,
};

export const TOUCHES = {
  [TOUCH_EVENTS.touchstart]: { x: -1, y: -1 },
  [TOUCH_EVENTS.touchmove]: { x: -1, y: -1 },
};

export const DEBOUNCE_DELAY = 50;

export const DIRECTIONS = {
  next: 1,
  last: -1,
};

export const OFFSET_SCROLL = 200;
