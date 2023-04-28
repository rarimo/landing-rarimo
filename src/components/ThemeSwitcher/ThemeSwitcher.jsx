/* eslint-disable no-unused-vars */
import './ThemeSwitcher.scss';

import cn from 'classnames';
import { useEffect, useState } from 'react';

import { COLOR_SCHEME_KEY, SCHEMES } from '@/const';

const ThemeSwitcher = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [isLightTheme, setIsLightTheme] = useState(false);

  const darkSchemeMedia = matchMedia('(prefers-color-scheme: dark)');
  const documentElementRef = document.documentElement;

  function setupScheme() {
    // const systemScheme = getSystemScheme();
    // const savedScheme = getSavedScheme();

    // setScheme(getIsValidScheme(savedScheme) ? savedScheme : systemScheme);
    setScheme(SCHEMES.dark);
  }

  function getIsValidScheme(scheme) {
    return Boolean(
      scheme && Object.keys(SCHEMES).find(schemeName => schemeName === scheme),
    );
  }

  function setScheme(scheme) {
    if (scheme === SCHEMES.light) {
      setIsLightTheme(true);
      setIsDarkTheme(false);
      documentElementRef.setAttribute(COLOR_SCHEME_KEY, SCHEMES.light);
      return;
    }

    if (scheme === SCHEMES.dark) {
      setIsDarkTheme(true);
      setIsLightTheme(false);
      documentElementRef.setAttribute(COLOR_SCHEME_KEY, SCHEMES.dark);
    }
  }

  function onClickSwitcher() {
    const prevScheme = documentElementRef.getAttribute(COLOR_SCHEME_KEY);
    const newScheme =
      prevScheme === SCHEMES.light ? SCHEMES.dark : SCHEMES.light;

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

  useEffect(() => {
    setupScheme();
  }, []);

  return (
    <></>
    // <button
    //   className={cn([
    //     'theme-switcher',
    //     {
    //       'theme-switcher--light': isLightTheme,
    //       'theme-switcher--dark': isDarkTheme,
    //     },
    //   ])}
    //   type="button"
    //   onClick={onClickSwitcher}
    // >
    //   <svg className="theme-switcher__icon" height="17" width="17">
    //     <use className="theme-switcher__sun"
    //  href="/icons/sprite.svg#icon-sun"></use>
    //     <use
    //       className="theme-switcher__moon"
    //       href="/icons/sprite.svg#icon-moon"
    //     ></use>
    //   </svg>
    // </button>
  );
};

export default ThemeSwitcher;
