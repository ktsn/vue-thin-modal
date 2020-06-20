// @flow

export default {
  functional: true,
  name: 'backdrop',

  props: {
    show: Boolean,
    backdropTransition: Object,
  },

  render(h: Function, { props, slots }: any) {
    const { show, backdropTransition } = props

    const transitionData = {
      props: backdropTransition,
    }

    return h('transition', transitionData, [
      show && (slots().default || h('div', { staticClass: 'modal-backdrop' })),
    ])
  },
}
