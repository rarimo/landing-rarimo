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
