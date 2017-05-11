<template>
  <div>
    <input type="radio" name="modal" value="foo" v-model="current">Show Foo Modal
    <input type="radio" name="modal" value="bar" v-model="current">Show Bar Modal
    <input type="radio" name="modal" value="long" v-model="current">Show Long Modal
    <modal name="foo">
      <div class="basic-modal">
        <h1 class="title">Foo</h1>
        <button class="button" type="button" @click="close">Close</button>
      </div>
    </modal>
    <modal name="bar">
      <div class="basic-modal">
        <h1 class="title">Bar</h1>
        <button class="button" @click="open('foo')">Open Foo</button>
        <button class="button" type="button" @click="close">Close</button>
      </div>
    </modal>
    <modal name="long">
      <div class="basic-modal">
        <h1 class="title">Long Content</h1>
        <p>Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text </p>
        <button class="button" @click="close">Close</button>
      </div>
    </modal>
  </div>
</template>

<script>
export default {
  computed: {
    current: {
      get () {
        return this.$modal.currentName
      },
      set (name) {
        this.open(name)
      }
    }
  },

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

<style scoped>
.basic-modal {
  margin: 30px auto;
  padding: 30px;
  width: 800px;
}
.basic-modal.modal-content-leave-active {
  position: absolute;
  left: 0;
  right: 0;
}
.title {
  margin: 0;
  font-weight: normal;
}
</style>
