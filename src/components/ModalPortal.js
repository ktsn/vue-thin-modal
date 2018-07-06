// @flow

import Backdrop from './Backdrop'
import ModalContent from './ModalContent'
import { addBodyClass, removeBodyClass, setBodyCss, getScrollBarWidth } from '../dom'

const openClassBody = 'modal-open'

interface ModalSlots {
  default?: any[];
  backdrop?: any[];
}

export default {
  name: 'modal-portal',

  methods: {
    update (name: string, current: string, props: any, slots: ModalSlots) {
      const children = slots.default || []

      // Inject key into children vnode
      children.forEach(child => {
        if (child.key) return

        if (!child.data) {
          child.data = {}
        }
        child.key = child.data.key = name
      })

      if (this._current !== current) {
        this._prev = this._current
        this._current = current
      }

      this._modals[name] = {
        props,
        children,
        backdrop: slots.backdrop
      }

      this.scheduleUpdate()
    },

    scheduleUpdate () {
      if (this._scheduled) return
      this._scheduled = true

      this.$nextTick(() => {
        this.$forceUpdate()
        this._scheduled = false
      })
    },

    unregister (name: string) {
      this._modals[name] = undefined
    }
  },

  beforeMount () {
    this._prev = null
    this._current = null
    this._modals = {}
    this._scheduled = false

    this.$on('before-open', () => {
      if (this._current != null) {
        const padding = getScrollBarWidth()
        if (padding) {
          setBodyCss('paddingRight', padding + 'px')
        }
        addBodyClass(openClassBody)
      }
    })

    this.$on('closed', () => {
      if (this._current == null) {
        setBodyCss('paddingRight', '')
        removeBodyClass(openClassBody)
      }
    })
  },

  render (h: Function) {
    const modal = this._modals[this._current]

    const events = {
      // Only react the first transition event.
      'before-enter': () => this.$emit('before-open', this._current),
      'before-leave': () => this.$emit('before-close', this._prev),

      // Need to wait until all transition element are completed
      'after-enter': () => this.$emit('opened', this._current),
      'after-leave': () => this.$emit('closed', this._prev),

      'click-backdrop': () => this.$emit('click-backdrop')
    }

    if (modal) {
      return createModalVNode(
        h,
        {
          props: modal.props,
          on: events
        },
        modal.children,
        modal.backdrop
      )
    } else {
      return createModalVNode(h, { on: events }, [])
    }
  }
}

function createModalVNode (h: Function, data: any, children: any[], backdrop: ?any) {
  return (
    h('div', { staticClass: 'modal-wrapper' }, [
      h(Backdrop, data, backdrop),
      h(ModalContent, data, children)
    ])
  )
}
