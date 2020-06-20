// @flow

import { addStaticClass, assert } from '../utils'

export default {
  functional: true,
  name: 'modal-content',

  props: {
    show: Boolean,
    disableBackdrop: Boolean,
    contentTransition: Object,
  },

  render(h: Function, { props, data, slots }: any) {
    const listeners = data.on || {}
    const { show, disableBackdrop, contentTransition } = props
    const child = ensureOnlyChild(slots().default || [])

    if (child) {
      addStaticClass(child.data, 'modal-content')
    }

    const transitionData = {
      props: contentTransition,
      on: listeners,
    }

    return h(
      'div',
      {
        staticClass: 'modal-content-wrapper',
        attrs: {
          role: 'dialog',
          'aria-hidden': String(!show),
        },
        on: {
          click: (event: Event) => {
            if (disableBackdrop) return
            if (event.target !== event.currentTarget) return

            if (listeners['click-backdrop']) {
              listeners['click-backdrop']()
            }
          },
        },
      },
      [h('transition', transitionData, [show && child])]
    )
  },
}

function ensureOnlyChild(children) {
  const domChildren = children.filter((c) => c.tag)
  assert(domChildren.length <= 1, 'Modal must have only one child')
  return domChildren[0]
}
