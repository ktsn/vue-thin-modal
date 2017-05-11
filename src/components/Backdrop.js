// @flow

import { onAfterLeave } from '../utils'

export default {
  functional: true,
  name: 'backdrop',

  props: {
    show: Boolean,
    backdropTransition: Object
  },

  render (h: Function, { props, data }: any) {
    const listeners = data.on || {}
    const { show, backdropTransition } = props

    const transitionData = onAfterLeave(
      { props: backdropTransition },
      listeners.leave
    )

    return h('transition', transitionData, [
      show && h('div', { staticClass: 'modal-backdrop' })
    ])
  }
}
