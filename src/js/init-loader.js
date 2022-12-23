const loaderRef = document.querySelector('.js-init-loader');
const rootRef = document.querySelector('#root');

export const hideLoader = () => {
  rootRef.style.display = '';

  const loaderStyles = getComputedStyle(loaderRef);
  const delay = Number.parseFloat(loaderStyles.transitionDuration) * 1000;

  loaderRef.classList.add('init-loader--hidden');

  setTimeout(() => {
    loaderRef.remove();
  }, delay);
};
