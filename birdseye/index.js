import birdseye from '@birdseye/app'
import { catalogFor } from '@birdseye/vue'

import Vue from 'vue'
import VueModal from '../'
import '../dist/vue-thin-modal.css'

import Simple from './Simple.vue'
import DisableBackdrop from './DisableBackdrop.vue'
import BackdropSlot from './BackdropSlot.vue'
import Scroll from './Scroll.vue'
import ScrollSemanticUi from './ScrollSemanticUi.vue'
import PreMount from './PreMount.vue'
import Events from './Events.vue'

Vue.use(VueModal)

const catalogs = [
  catalogFor(Simple, 'Simple').add('preview'),
  catalogFor(DisableBackdrop, 'DisableBackdrop').add('preview'),
  catalogFor(BackdropSlot, 'BackdropSlot').add('preview'),
  catalogFor(Scroll, 'Scroll').add('preview'),
  catalogFor(ScrollSemanticUi, 'ScrollSemanticUi').add('preview'),
  catalogFor(PreMount, 'PreMount').add('preview'),
  catalogFor(Events, 'Events').add('preview'),
]

birdseye('#app', catalogs)
