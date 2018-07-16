// @flow

export function addStaticClass (
  data: { staticClass: ?string },
  staticClass: string
): void {
  if (!data.staticClass) {
    data.staticClass = staticClass
  } else {
    data.staticClass += ' ' + staticClass
  }
}

export function assert (value: any, message: string): void {
  if (!value) {
    throw new Error('[vue-thin-modal] ' + message)
  }
}
