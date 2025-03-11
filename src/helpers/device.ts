'use client'

const isClient = typeof window !== 'undefined'

export function isMobile() {
  return (
    isClient &&
    /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini|Windows Phone/i.test(
      window.navigator.userAgent,
    )
  )
}

export function isIos() {
  return isClient && /iPhone|iPad|iPod/i.test(window.navigator.userAgent)
}

export function isAndroid() {
  return isClient && /Android/i.test(window.navigator.userAgent)
}

export function isSmallScreen() {
  return isClient && window.innerWidth < 480
}

export function isMediumScreen() {
  return isClient && window.innerWidth < 600
}

export function isLargeScreen() {
  return isClient && window.innerWidth < 1200
}

export function isDesktop() {
  return isClient && window.innerWidth >= 1200
}

export function isSafari() {
  return (
    isClient &&
    /^((?!chrome|android).)*safari/i.test(window.navigator.userAgent)
  )
}
