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
    data: {
      stack: []
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
        const { focusedElement } = this.stack.pop()
        if (focusedElement) {
          focusedElement.focus()
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
    }
  })
}
