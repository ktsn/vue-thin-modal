// @flow

import { assert } from './utils'
import Modal from './components/Modal'
import ModalPortal from './components/ModalPortal'
import { generateMediator } from './generators/mediator'
import { appendToBody, onReady } from './dom'

interface VueThinModalOptions {
  autoMountPortal?: boolean
}

let Vue: any

function install (_Vue: any, options: VueThinModalOptions = {}) {
  assert(!Vue, 'Already installed')

  Vue = _Vue

  Vue.prototype.$modal = generateMediator(Vue)
  Vue.component('modal', Modal)
  Vue.component('modal-portal', ModalPortal)

  if (options.autoMountPortal !== false) {
    const ModalPortalCtor = Vue.extend(ModalPortal)
    const portal = new ModalPortalCtor()

    onReady(() => {
      portal.$mount()
      appendToBody(portal.$el)
    })
  }
}

export { Modal, ModalPortal, generateMediator }

export default {
  install
}
