<template>
  <div>
    <button @click="$modal.push('example')">Open modal</button>
    <modal name="example">
      <div slot="backdrop" class="example-backdrop">Inserted backdrop</div>
      <div>
        <h1 class="title">Backdrop Slot</h1>
        <button @click="$modal.pop()">Close modal</button>
      </div>
    </modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      disableBackdrop: true
    }
  }
}
</script>

<style scoped>
.title {
  margin: 0;
  font-weight: normal;
}

.example-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(48, 112, 196, 0.7);
  font-size: 20px;
  z-index: 1000;
}
</style>
