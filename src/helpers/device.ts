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
  return typeof window !== 'undefined' && window.innerWidth < 1024
}

export function isMediumScreen() {
  return typeof window !== 'undefined' && window.innerWidth < 600
}

export function isLargeScreen() {
  return typeof window !== 'undefined' && window.innerWidth < 1200
}
