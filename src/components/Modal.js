// @flow

export default {
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
      return this.$modal.currentName
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
    const portal = this.$modal._getPortal()
    Object.keys(this.eventListners).forEach(event => {
      portal.$on(event, this.eventListners[event])
    })
  },

  beforeDestroy () {
    const portal = this.$modal._getPortal()

    portal.unregister(this.name)
    Object.keys(this.eventListners).forEach(event => {
      portal.$off(event, this.eventListners[event])
    })
  },

  updated () {
    const portal = this.$modal._getPortal()

    portal.update(this.name, this.current, {
      show: this.name === this.current,
      backdropTransition: this.backdropTransition,
      contentTransition: this.contentTransition,
      disableBackdrop: this.disableBackdrop
    }, this.$slots)
  },

  render (h: Function) {
    return this.preMount && this.current !== this.name
      ? h('div', {
        style: {
          display: 'none'
        }
      }, this.$slots.default)
      : h()
  }
}
