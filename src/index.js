// @flow

import { assert } from './utils'
import { generateModal } from './generators/Modal'
import { generateMediator } from './generators/mediator'

let Vue: any

function install (_Vue: any) {
  assert(!Vue, 'Already installed')

  Vue = _Vue

  const mediator = Vue.prototype.$modal = generateMediator(Vue)
  Vue.component('modal', generateModal(Vue, mediator))
}

export default {
  install
}
