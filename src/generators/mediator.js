// @flow

import { activeElement } from '../dom'

export interface Mediator {
  currentName: string;
  push (name: string): void;
  pop (): void;
  replace (name: string): void;
}

export function generateMediator (Vue: any): Mediator {
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
      }
    }
  })
}
