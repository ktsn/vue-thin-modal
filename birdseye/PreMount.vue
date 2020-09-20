<template>
  <div>
    <button type="button" @click="$modal.push('image')">Open Modal</button>
    <p>{{ !loaded ? 'Modal image is loading...' : 'Modal image is loaded' }}</p>
    <modal name="image" pre-mount>
      <div class="modal">
        <img
          class="modal-image"
          src="http://via.placeholder.com/3000x3000"
          alt="" @load="loaded = true"
        >
      </div>
    </modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loaded: false
    }
  }
}
</script>

<style scoped>
.modal,
.modal-image {
  max-width: 100%;
}
</style>
