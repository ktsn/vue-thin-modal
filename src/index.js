// @flow

import { assert } from './utils'
import Modal from './components/Modal'
import ModalPortal from './components/ModalPortal'
import { generateMediator } from './generators/mediator'
import { appendToBody, onReady } from './dom'

interface VueThinModalOptions {
  autoMountPortal?: boolean;
}

let Vue: any

function install(_Vue: any, options: VueThinModalOptions = {}) {
  assert(Vue !== _Vue, 'Already installed')

  Vue = _Vue

  const descriptor: any = {
    get() {
      return this.$root.$_vueThinModal
    }
  }

  Object.defineProperty(Vue.prototype, '$modal', descriptor)

  Vue.component('modal', Modal)
  Vue.component('modal-portal', ModalPortal)

  if (options.autoMountPortal !== false) {
    // If the portal is auto mounted, should share singleton mediator
    // because the root instance of the portal component is different with the app one.
    // Note that auto mount will not be used on SSR environment.
    Vue.prototype.$_vueThinModal = generateMediator(Vue)

    // Mount portal component under the body element.
    const ModalPortalCtor = Vue.extend(ModalPortal)
    const portal = new ModalPortalCtor()

    onReady(() => {
      portal.$mount()
      appendToBody(portal.$el)
    })
  } else {
    // If the portal will be manually mounted, generate the medator for each root instance.
    // Then we can handle SSR environment which may create multiple instances of portal among each sessions.
    Vue.mixin({
      beforeCreate() {
        if (!this.$parent && !this.$options.vueThinModalMediator) {
          this.$_vueThinModal = generateMediator(Vue)
        }
      }
    })
  }
}

export { Modal, ModalPortal, generateMediator }

export default {
  install
}
