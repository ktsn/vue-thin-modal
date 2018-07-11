// @flow

import { assert } from './utils'

const state = {
  portal: null
}

export function setPortal(portal: any): void {
  assert(!state.portal, '<modal-portal> is already created.')
  state.portal = portal
}

export function getPortal(): any {
  assert(state.portal, 'You need to put <modal-portal> or set `autoMountPortal: true` plugin option.')
  return state.portal
}
