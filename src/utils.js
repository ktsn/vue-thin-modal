// @flow

export function noop () {}

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

export function wait (times: number, cb: () => void): () => void {
  let count = 0
  return () => {
    count += 1
    if (count >= times) {
      cb()
    }
  }
}

export function onAfterLeave (vnodeData: Object, cb: ?() => void): Object {
  if (!cb) return vnodeData

  const hooks = vnodeData.on || {}
  const prev: Function = hooks.afterLeave

  if (prev) {
    hooks.afterLeave = el => {
      prev(el)
      // $FlowFixMe: ignore null type
      cb()
    }
  } else {
    hooks.afterLeave = cb
  }

  vnodeData.on = hooks

  return vnodeData
}

export function assert (value: any, message: string): void {
  if (!value) {
    throw new Error('[vue-modal] ' + message)
  }
}
