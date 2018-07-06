<template>
  <div>
    <button type="button" @click="onClick">Show Modal</button>
    <p>Emitted Events</p>
    <ul>
      <li v-for="(text, i) in log" :key="i">{{ text }}</li>
    </ul>
    <modal
      name="foo"
      @before-open="log.push('before-open')"
      @opened="log.push('opened')"
      @before-close="log.push('before-close')"
      @closed="log.push('closed')"
    >
      <div class="basic-modal">
        <h1 class="title">Foo</h1>
        <button class="button" type="button" @click="close">Close</button>
      </div>
    </modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      log: []
    }
  },

  methods: {
    open (name) {
      this.$modal.push(name)
    },

    close () {
      this.$modal.pop()
    },

    onClick () {
      this.open('foo')
    }
  }
}
</script>

<style scoped>
.title {
  margin: 0;
  font-weight: normal;
}
</style>
