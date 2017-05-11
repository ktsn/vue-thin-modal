// @flow

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
        this.stack.push({ name })
      },

      pop (): void {
        this.stack.pop()
      },

      replace (name: string): void {
        this.stack.pop()
        this.stack.push({ name })
      }
    }
  })
}
