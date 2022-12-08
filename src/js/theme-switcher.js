const darkSchemeMedia = matchMedia('(prefers-color-scheme: dark)');
const switcherRadios = document.querySelectorAll('.switcher__radio');

function setupSwitcher() {
  const savedScheme = getSavedScheme();

  if (savedScheme !== null) {
    const currentRadio = document.querySelector(
      `.switcher__radio[value=${savedScheme}]`,
    );
    currentRadio.checked = true;
  }
  [...switcherRadios].forEach(radio => {
    radio.addEventListener('change', event => {
      setScheme(event.target.value);
    });
  });
}

function setupScheme() {
  const savedScheme = getSavedScheme();
  setScheme(savedScheme ?? 'light');
  // const savedScheme = getSavedScheme();
  // const systemScheme = getSystemScheme();

  // if (savedScheme === null) return;

  // if (savedScheme !== systemScheme) {
  //   setScheme(savedScheme);
  // }
}

function setScheme(scheme) {
  switchMedia(scheme);

  if (scheme === 'auto') {
    clearScheme();
  } else {
    saveScheme(scheme);
  }
}

function switchMedia(scheme) {
  let lightMedia;
  let darkMedia;

  if (scheme === 'auto') {
    lightMedia = '(prefers-color-scheme: light)';
    darkMedia = '(prefers-color-scheme: dark)';
  } else {
    document.documentElement.setAttribute('data-theme', scheme);
  }
}
function getSystemScheme() {
  const isDarkScheme = darkSchemeMedia.matches;

  return isDarkScheme ? 'dark' : 'light';
}
function getSavedScheme() {
  return localStorage.getItem('color-scheme');
}
function saveScheme(scheme) {
  localStorage.setItem('color-scheme', scheme);
}
function clearScheme() {
  localStorage.removeItem('color-scheme');
}

setupSwitcher();
setupScheme();
