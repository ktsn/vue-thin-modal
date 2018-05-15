// @flow

import type { Mediator } from './mediator'
import ModalPortal from '../components/ModalPortal'
import { appendToBody } from '../dom'

export function generateModal (Vue: any, mediator: Mediator) {
  let portal

  return {
    name: 'modal',

    props: {
      name: {
        type: String,
        required: true
      },
      disableBackdrop: Boolean,
      preMount: Boolean,
      backdropTransition: {
        type: Object,
        default () {
          return { name: 'modal-backdrop' }
        }
      },
      contentTransition: {
        type: Object,
        default () {
          return { name: 'modal-content' }
        }
      }
    },

    computed: {
      current () {
        return mediator.currentName
      }
    },

    beforeMount () {
      if (!portal) {
        portal = new Vue(ModalPortal)
          .$mount()
          .$on('close', () => mediator.pop())
      }
    },

    beforeDestroy () {
      portal.unregister(this.name)
    },

    render (h: Function) {
      if (this.current && !portal.$el.parentNode) {
        appendToBody(portal.$el)
      }

      portal.update(this.name, this.current, {
        show: this.name === this.current,
        backdropTransition: this.backdropTransition,
        contentTransition: this.contentTransition,
        disableBackdrop: this.disableBackdrop
      }, this.$slots)

      return this.preMount && this.current !== this.name
        ? h('div', {
          style: {
            display: 'none'
          }
        }, this.$slots.default)
        : h()
    }
  }
}
