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

function pruneCallbackByCount (predicate: (count: number) => boolean, cb: () => void) {
  let count = 0
  return () => {
    count += 1
    if (predicate(count)) {
      cb()
    }
  }
}

export function only (times: number, cb: () => void): () => void {
  return pruneCallbackByCount(count => count <= times, cb)
}

export function wait (times: number, cb: () => void): () => void {
  return pruneCallbackByCount(count => count >= times, cb)
}

export function assert (value: any, message: string): void {
  if (!value) {
    throw new Error('[vue-modal] ' + message)
  }
}
