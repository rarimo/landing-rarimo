const loaderRef = document.querySelector('.js-init-loader');
const rootRef = document.querySelector('#root');

export const hideLoader = () => {
  rootRef.style.opacity = '1';

  const loaderStyles = getComputedStyle(loaderRef);
  const delay = Number.parseFloat(loaderStyles.transitionDuration) * 1000;

  loaderRef.classList.add('init-loader--hidden');
  document.body.classList.add('body--no-after');

  setTimeout(() => {
    loaderRef.remove();
  }, delay);
};
