const MOBILE_REGEX =
  /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini|Windows Phone/i

export function isMobile() {
  return (
    typeof window !== 'undefined' &&
    MOBILE_REGEX.test(window.navigator.userAgent)
  )
}

export function isIos() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent)
}

export function isAndroid() {
  return /Android/i.test(navigator.userAgent)
}

export function isSmallScreen() {
  return typeof window !== 'undefined' && window.innerWidth < 480
}

export function isMediumScreen() {
  return typeof window !== 'undefined' && window.innerWidth < 600
}

export function isLargeScreen() {
  return typeof window !== 'undefined' && window.innerWidth < 1200
}

export function isDesktop() {
  return typeof window !== 'undefined' && window.innerWidth >= 1200
}

export function isSafari() {
  return (
    typeof window !== 'undefined' &&
    /Safari/i.test(navigator.userAgent) &&
    !/Chrome/i.test(navigator.userAgent)
  )
}
