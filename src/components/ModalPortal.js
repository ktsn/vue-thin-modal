// @flow

import Backdrop from './Backdrop'
import ModalContent from './ModalContent'
import { addDocumentClass, removeDocumentClass } from '../dom'
import { wait, noop } from '../utils'

const openClassBody = 'modal-open'

export default {
  name: 'modal-portal',

  methods: {
    update (name: string, current: string, props: any, children: any[]) {
      // Inject key into children vnode
      children.forEach(child => {
        if (child.key) return

        if (!child.data) {
          child.data = {}
        }
        child.key = child.data.key = name
      })

      this._current = current
      this._modals[name] = {
        props,
        children
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
    this._current = null
    this._modals = {}
  },

  render (h: Function) {
    if (this._current != null) {
      addDocumentClass(openClassBody)
    }

    const modal = this._modals[this._current]

    if (modal) {
      return createModalVNode(
        h,
        {
          props: modal.props,
          // It is required to provide noop as leave hook
          // because previous leave hook may parsist.
          on: { leave: noop }
        },
        modal.children
      )
    } else {
      const numTransition = 2

      // Wait until all transition element are leaved
      // and remove the class from document element after that.
      const onAfterLeave = wait(numTransition, () => {
        removeDocumentClass(openClassBody)
      })

      return createModalVNode(h, { on: { leave: onAfterLeave }}, [])
    }
  }
}

function createModalVNode (h: Function, data: any, children: any[]) {
  return (
    h('div', { staticClass: 'modal-wrapper' }, [
      h(Backdrop, data),
      h(ModalContent, data, children)
    ])
  )
}
