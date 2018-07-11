// @flow

import { assert } from './utils'
import ModalPortal from './components/ModalPortal'
import { generateModal } from './generators/Modal'
import { generateMediator } from './generators/mediator'
import { appendToBody, onReady } from './dom'

interface VueThinModalOptions {
  autoMountPortal?: boolean
}

let Vue: any

function install (_Vue: any, options: VueThinModalOptions = {}) {
  assert(!Vue, 'Already installed')

  Vue = _Vue

  const mediator = Vue.prototype.$modal = generateMediator(Vue)
  Vue.component('modal', generateModal(Vue, mediator))
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

export { generateModal, generateMediator }

export default {
  install
}
