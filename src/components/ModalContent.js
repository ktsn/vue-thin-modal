// @flow

import { addStaticClass, onAfterLeave, assert } from '../utils'

export default {
  functional: true,
  name: 'modal-content',

  props: {
    show: Boolean,
    contentTransition: Object
  },

  render (h: Function, { props, data, children }: any) {
    const listeners = data.on || {}
    const { show, contentTransition } = props
    const child = ensureOnlyChild(children)

    if (child) {
      addStaticClass(child.data, 'modal-content')
    }

    const transitionData = onAfterLeave(
      { props: contentTransition },
      listeners.leave
    )

    return (
      h('div', { staticClass: 'modal-content-wrapper' }, [
        h('transition', transitionData, [
          show && child
        ])
      ])
    )
  }
}

function ensureOnlyChild (children) {
  const domChildren = children.filter(c => c.tag)
  assert(domChildren.length <= 1, 'Modal must have only one child')
  return domChildren[0]
}
