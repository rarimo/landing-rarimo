export const scrollWindow = function () {
  if (window.scrollY != 0) {
    setTimeout(function () {
      window.scrollTo(0, window.scrollY - 20);
      scrollWindow();
    }, 1);
  }
};
