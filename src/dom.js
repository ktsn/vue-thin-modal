// @flow
/* eslint-env browser */

const isBrowser = typeof window !== undefined

export function appendToBody (el: HTMLElement): void {
  if (isBrowser && document.body) {
    document.body.appendChild(el)
  }
}

export function addDocumentClass (className: string): void {
  if (isBrowser && document.documentElement) {
    document.documentElement.classList.add(className)
  }
}

export function removeDocumentClass (className: string): void {
  if (isBrowser && document.documentElement) {
    document.documentElement.classList.remove(className)
  }
}

export function activeElement (): ?HTMLElement {
  if (isBrowser) {
    return document.activeElement
  }
}
