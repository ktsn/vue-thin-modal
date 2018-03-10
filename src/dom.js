// @flow
/* eslint-env browser */

const isBrowser = typeof window !== undefined

export function appendToBody (el: HTMLElement): void {
  if (isBrowser && document.body) {
    document.body.appendChild(el)
  }
}

export function addBodyClass (className: string): void {
  if (isBrowser && document.body) {
    document.body.classList.add(className)
  }
}

export function removeBodyClass (className: string): void {
  if (isBrowser && document.body) {
    document.body.classList.remove(className)
  }
}

export function setBodyCss (name: string, value: string): void {
  if (isBrowser && document.body) {
    const s: any = document.body.style
    s[name] = value
  }
}

export function getScrollBarWidth (): ?number {
  if (!isBrowser || !document.documentElement) {
    return null
  }
  return window.innerWidth - document.documentElement.offsetWidth
}

export function activeElement (): ?HTMLElement {
  if (isBrowser) {
    return document.activeElement
  }
}
