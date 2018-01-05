<template>
  <div>
    <button @click="open('test')">Open</button>
    <p class="float">
      This should not move during opening/closing a modal
    </p>
    <modal name="test">
      <div class="basic-modal">
        <h1 class="title">Modal Title</h1>
        <button class="button" @click="close">Close</button>
      </div>
    </modal>
  </div>
</template>

<script>
export default {
  methods: {
    open (name) {
      this.$modal.push(name)
    },

    close () {
      this.$modal.pop()
    }
  }
}
</script>

<style>
html {
  overflow-y: scroll;
}

.float {
  float: right;
}
</style>
