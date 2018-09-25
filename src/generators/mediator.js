// @flow

import { activeElement } from '../dom'
import { assert } from '../utils'

export interface Mediator {
  currentName: string;
  push (name: string): void;
  pop (): void;
  replace (name: string): void;
}

export function generateMediator (Vue: any): Mediator {
  const state = {
    portal: null
  }

  return new Vue({
    // Mark this Vue instance is a mediator to Avoid infinite loop
    // by trying to create another mediator in the beforeCreate hook in this mediator.
    vueThinModalMediator: true,

    data: {
      stack: [],
      prevName: null
    },

    computed: {
      currentName () {
        const stack = this.stack
        const modal = stack[stack.length - 1]
        return modal && modal.name
      }
    },

    methods: {
      push (name: string): void {
        const focusedElement = activeElement()
        if (focusedElement) {
          focusedElement.blur()
        }

        const item = {
          name,
          focusedElement
        }

        // Prevent to make reactive
        Object.freeze(item)

        this.stack.push(item)
      },

      pop (): void {
        const item = this.stack.pop()
        if (item && item.focusedElement) {
          item.focusedElement.focus()
        }
      },

      replace (name: string): void {
        this.pop()
        this.push(name)
      },

      _setPortal(portal: any): void {
        assert(!state.portal, '<modal-portal> is already created.')
        state.portal = portal
      },

      _getPortal(): any {
        assert(state.portal, 'You need to put <modal-portal> or set `autoMountPortal: true` plugin option.')
        return state.portal
      }
    },

    watch: {
      currentName (_, prevName) {
        this.prevName = prevName
      }
    }
  })
}
