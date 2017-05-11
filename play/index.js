import { play } from 'vue-play'

import Vue from 'vue'
import VueModal from '../'
import '../dist/vue-thin-modal.css'

import Simple from './Simple.vue'

Vue.use(VueModal)

play('Vue Modal')
  .add('Simple', Simple)
