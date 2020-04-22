// @flow

import Backdrop from './Backdrop'
import ModalContent from './ModalContent'
import {
  addBodyClass,
  removeBodyClass,
  setBodyCss,
  getScrollBarWidth
} from '../dom'

const openClassBody = 'modal-open'

interface ModalSlots {
  default?: any[];
  backdrop?: any[];
}
interface ModalData {
  data: any;
  children: any[];
  backdrop: ?any;
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
    getModals() {
      const stack = this.$modal.stack.slice().reverse()
      const nonOverlayIndex = stack.findIndex(({ overlay }) => !overlay)
      if (nonOverlayIndex === -1) return stack
      return stack.slice(0, nonOverlayIndex + 1).reverse()
    },

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

  render(h: Function) {
    const events = {
      // Only react the first transition event.
      'before-enter': () => this.$emit('before-open', this.current),
      'before-leave': () => this.$emit('before-close', this.prev),

      // Need to wait until all transition element are completed
      'after-enter': () => this.$emit('opened', this.current),
      'after-leave': () => this.$emit('closed', this.prev),

      'click-backdrop': () => this.$emit('click-backdrop')
    }
    const modals = this.getModals()
      .map(({ name }) => this.modals[name])
      .filter(v => v)

    // for transition
    const emptyModal = { children: [] }

    return createModalVNode(
      h,
      [...modals, emptyModal].map(({ props, children, backdrop }) => ({
        data: {
          props,
          on: events
        },
        children,
        backdrop
      }))
    )
  }
}

function createModalVNode(h: Function, modals: ModalData[]) {
  return h('div', { staticClass: 'modal-wrapper' }, [
    ...modals.map(({ data, children, backdrop }) => [
      h(Backdrop, data, backdrop),
      h(ModalContent, data, children)
    ])
  ])
}
