<template>
  <Scroll />
</template>

<script>
import Scroll from './Scroll.vue'
import semantic from '!style-loader?injectType=lazyStyleTag!css-loader!./assets/semantic.site.css'

export default {
  components: {
    Scroll
  },

  mounted() {
    semantic.use()
  },

  beforeDestroy() {
    semantic.unuse()
  }
};
</script>
