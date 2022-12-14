const loaderRef = document.querySelector('.js-init-loader');
const appRef = document.querySelector('.js-application');

export const hideLoader = () => {
  appRef.style.display = '';

  const loaderStyles = getComputedStyle(loaderRef);
  const delay = Number.parseFloat(loaderStyles.transitionDuration) * 1000;

  loaderRef.classList.add('init-loader--hidden');

  setTimeout(() => {
    loaderRef.remove();
  }, delay);
};
