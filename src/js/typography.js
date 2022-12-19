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
  root.style.setProperty('--p-size-xm', clampBuilder(1200, 1512, 0.875, 1));
  root.style.setProperty('--h2-size-xm', clampBuilder(1200, 1512, 3.5, 4.375));
  root.style.setProperty('--h3-size-xm', clampBuilder(1200, 1512, 2, 3));
};
