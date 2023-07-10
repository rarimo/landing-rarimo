let minScrollWheelInterval = 100; // minimum milliseconds between scrolls

let lastScrollWheelTimestamp = 0;
let lastScrollWheelDelta = 0;

export const getIsInertialScrolling = event => {
  const now = Date.now();

  const rapidSuccession =
    now - lastScrollWheelTimestamp < minScrollWheelInterval;
  const otherDirection = lastScrollWheelDelta > 0 !== event.deltaY > 0;
  const speedDecrease =
    Math.abs(event.deltaY) <= Math.abs(lastScrollWheelDelta);

  const isHuman = otherDirection || !rapidSuccession || !speedDecrease;

  lastScrollWheelTimestamp = now;
  lastScrollWheelDelta = event.deltaY;

  return !isHuman;
};
