export const fillFramesRange = startFrame => {
  return Array(2)
    .fill(null)
    .map((_, i) => startFrame + i);
};
