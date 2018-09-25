// @flow

import Backdrop from './Backdrop'
import ModalContent from './ModalContent'
import {
  addBodyClass,
  removeBodyClass,
  setBodyCss,
  getScrollBarWidth
} from '../dom'
import { assert } from '../utils'

const openClassBody = 'modal-open'

interface ModalSlots {
  default?: any[];
  backdrop?: any[];
}

export default {
  name: 'modal-portal',

  data() {
    return {
      modals: {}
    }
  },

  computed: {
    prev() {
      return this.$modal.prevName
    },

    current() {
      return this.$modal.currentName
    }
  },

  methods: {
    update(name: string, props: any, slots: ModalSlots) {
      const children = slots.default || []

      // Inject key into children vnode
      children.forEach(child => {
        if (child.key) return

        if (!child.data) {
          child.data = {}
        }
        child.key = child.data.key = name
      })

      this.$set(this.modals, name, {
        props,
        children,
        backdrop: slots.backdrop
      })
    },

    unregister(name: string) {
      this.$delete(this.modals, name)
    }
  },

  beforeCreate() {
    this.$modal._setPortal(this)
  },

  beforeMount() {
    this.$on('click-backdrop', () => {
      this.$modal.pop()
    })

    this.$on('before-open', () => {
      if (this.current != null) {
        const padding = getScrollBarWidth()
        if (padding) {
          setBodyCss('paddingRight', padding + 'px')
        }
        addBodyClass(openClassBody)
      }
    })

    this.$on('closed', () => {
      if (this.current == null) {
        setBodyCss('paddingRight', '')
        removeBodyClass(openClassBody)
      }
    })
  },

  beforeDestroy() {
    assert(
      false,
      '<modal-portal> should not be destroyed. If you are using v-if on <modal-portal>, use v-show instead.'
    )
  },

  render(h: Function) {
    const modal = this.modals[this.current]

    const events = {
      // Only react the first transition event.
      'before-enter': () => this.$emit('before-open', this.current),
      'before-leave': () => this.$emit('before-close', this.prev),

      // Need to wait until all transition element are completed
      'after-enter': () => this.$emit('opened', this.current),
      'after-leave': () => this.$emit('closed', this.prev),

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

function createModalVNode(
  h: Function,
  data: any,
  children: any[],
  backdrop: ?any
) {
  return h('div', { staticClass: 'modal-wrapper' }, [
    h(Backdrop, data, backdrop),
    h(ModalContent, data, children)
  ])
}
