import { play } from 'vue-play'

import Vue from 'vue'
import VueModal from '../'
import '../dist/vue-thin-modal.css'

import Simple from './Simple.vue'
import DisableBackdrop from './disableBackdrop.vue'
import BackdropSlot from './BackdropSlot.vue'
import ScrollBar from './ScrollBar.vue'

Vue.use(VueModal)

play('Vue Modal')
  .add('Simple', Simple)
  .add('DisableBackdrop', DisableBackdrop)
  .add('BackdropSlot', BackdropSlot)
  .add('ScrollBar', ScrollBar)
