// @flow

import type { Mediator } from './mediator'
import { getPortal } from '../state'

export function generateModal (Vue: any, mediator: Mediator) {
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
      },

      eventListners () {
        const events = ['before-open', 'opened', 'before-close', 'closed']
        const listeners = {}
        events.forEach(event => {
          listeners[event] = (name: string) => {
            if (this.name === name) {
              this.$emit(event, name)
            }
          }
        })
        return listeners
      }
    },

    mounted () {
      const portal = getPortal()
      Object.keys(this.eventListners).forEach(event => {
        portal.$on(event, this.eventListners[event])
      })
    },

    beforeDestroy () {
      const portal = getPortal()

      portal.unregister(this.name)
      Object.keys(this.eventListners).forEach(event => {
        portal.$off(event, this.eventListners[event])
      })
    },

    render (h: Function) {
      const portal = getPortal()

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
