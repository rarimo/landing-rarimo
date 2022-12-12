import { COLOR_SCHEME_KEY, SCHEMES } from '@/const/theme.const';

const darkSchemeMedia = matchMedia('(prefers-color-scheme: dark)');
const documentElementRef = document.documentElement;
const themeSwitcherBtnRef = document.querySelector('.js-theme-switcher');

function setupSwitcher() {
  themeSwitcherBtnRef.addEventListener('click', onClickSwitcher);
}

function setupScheme() {
  const systemScheme = getSystemScheme();
  const savedScheme = getSavedScheme();

  setScheme(getIsValidScheme(savedScheme) ? savedScheme : systemScheme);
}

function getIsValidScheme(scheme) {
  return Boolean(
    scheme && Object.keys(SCHEMES).find(schemeName => schemeName === scheme),
  );
}

function setScheme(scheme) {
  if (scheme === SCHEMES.light) {
    themeSwitcherBtnRef.classList.remove('theme-switcher--dark');
    themeSwitcherBtnRef.classList.add('theme-switcher--light');
    documentElementRef.setAttribute(COLOR_SCHEME_KEY, SCHEMES.light);
    return;
  }

  if (scheme === SCHEMES.dark) {
    themeSwitcherBtnRef.classList.remove('theme-switcher--light');
    themeSwitcherBtnRef.classList.add('theme-switcher--dark');
    documentElementRef.setAttribute(COLOR_SCHEME_KEY, SCHEMES.dark);
  }
}

function onClickSwitcher() {
  const prevScheme = documentElementRef.getAttribute(COLOR_SCHEME_KEY);
  const newScheme = prevScheme === SCHEMES.light ? SCHEMES.dark : SCHEMES.light;

  setScheme(newScheme);
  saveScheme(newScheme);
}

function getSystemScheme() {
  const isDarkScheme = darkSchemeMedia.matches;

  return isDarkScheme ? SCHEMES.dark : SCHEMES.light;
}

function getSavedScheme() {
  return localStorage.getItem(COLOR_SCHEME_KEY);
}

function saveScheme(scheme) {
  localStorage.setItem(COLOR_SCHEME_KEY, scheme);
}

setupScheme();
setupSwitcher();
