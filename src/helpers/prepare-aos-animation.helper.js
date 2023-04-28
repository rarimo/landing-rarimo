import { getShiftedDelay } from '@/helpers';

export const prepareCharacterAnimation = () => {
  const refs = [...document.querySelectorAll('.js-character-animation')];

  refs.forEach(ref => {
    if (ref.innerHTML.startsWith('<span')) return;

    const splitedSymbols = ref.innerText.split('');
    const mapped = splitedSymbols.map(
      (symbol, index) =>
        `<span style="display: inline-block" data-aos="fade-up" data-aos-delay="${getShiftedDelay(
          index,
          100,
        )}">${symbol}</span>`,
    );
    ref.innerHTML = mapped.join('');
  });
};

export const prepareStringAnimation = () => {
  const refs = [...document.querySelectorAll('.js-string-animation')];

  refs.forEach(ref => {
    if (ref.innerHTML.startsWith('<div')) return;

    const blockWidth = ref.offsetWidth;
    const spaceWidth = getSpaceWidth(ref);

    const splitedWords = ref.innerText.split(' ');
    const mapped = splitedWords.map(
      word => `<span style="display: inline-block;">${word}</span>`,
    );
    ref.innerHTML = mapped.join('');

    let remainingWidthInBlock = blockWidth;
    let stringCounter = 0;

    const resultHtml = [...ref.children].reduce((acc, wordRef) => {
      const wordWidth = wordRef.offsetWidth;

      if (remainingWidthInBlock - wordWidth >= 0) {
        remainingWidthInBlock = remainingWidthInBlock - wordWidth - spaceWidth;
        return acc + wordRef.innerText + ' ';
      } else {
        stringCounter += 1;
        remainingWidthInBlock = blockWidth - wordWidth - spaceWidth;
        return (
          acc.trim() +
          `</div></div><div style="overflow: hidden;"><div data-aos="fade-up" data-aos-delay="${getShiftedDelay(
            stringCounter,
            100,
          )}">` +
          wordRef.innerText +
          ' '
        );
      }
    }, `<div style="overflow: hidden;"><div data-aos="fade-up">`);
    ref.innerHTML = resultHtml + '</div></div>';
  });
};

function getSpaceWidth(parentElement) {
  const spaceElement = document.createElement('span');
  spaceElement.innerHTML = '&nbsp'; // non-breaking space
  parentElement.appendChild(spaceElement);
  const spaceWidth = spaceElement.offsetWidth;
  parentElement.removeChild(spaceElement);
  return spaceWidth;
}
