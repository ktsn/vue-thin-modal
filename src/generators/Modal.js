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

    beforeCreate () {
      if (!portal) {
        portal = new Vue(ModalPortal).$mount()
      }
    },

    beforeDestroy () {
      portal.unregister()
    },

    render () {
      if (this.current && !portal.$el.parentNode) {
        appendToBody(portal.$el)
      }

      portal.update(this.name, this.current, {
        show: this.name === this.current,
        backdropTransition: this.backdropTransition,
        contentTransition: this.contentTransition
      }, this.$slots.default)
    }
  }
}
