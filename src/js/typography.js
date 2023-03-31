const root = document.documentElement;

// Takes the viewport widths in pixels and the font sizes in rem
function clampBuilder(minWidthPx, maxWidthPx, minFontSize, maxFontSize) {
  const pixelsPerRem = Number(getComputedStyle(root).fontSize.slice(0, -2));

  const minWidth = minWidthPx / pixelsPerRem;
  const maxWidth = maxWidthPx / pixelsPerRem;

  const slope = (maxFontSize - minFontSize) / (maxWidth - minWidth);
  const yAxisIntersection = -minWidth * slope + minFontSize;

  const result = `clamp(${minFontSize}rem, ${yAxisIntersection}rem + ${
    slope * 100
  }vw, ${maxFontSize}rem)`;

  return result;
}

export const defineDesktopFontSizes = () => {
  root.style.setProperty('--p-size-xm', clampBuilder(1200, 1600, 0.875, 1.25));
  root.style.setProperty('--h1-size-xm', clampBuilder(1200, 1600, 6.5, 9.125));
  root.style.setProperty('--h2-size-xm', clampBuilder(1200, 1600, 3.5, 4.375));
  root.style.setProperty('--h3-size-xm', clampBuilder(1200, 1600, 3, 3.75));
  root.style.setProperty('--h4-size-xm', clampBuilder(1200, 1600, 2.625, 3.5));
  root.style.setProperty('--h5-size-xm', clampBuilder(1200, 1600, 2.375, 3.25));
  root.style.setProperty('--h6-size-xm', clampBuilder(1200, 1600, 1.375, 2));
};
