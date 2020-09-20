<template>
  <div>
    <input type="checkbox" name="disable" v-model="disableBackdrop">Disable backdrop close
    <button @click="$modal.push('example')">Open modal</button>
    <modal name="example" :disable-backdrop="disableBackdrop">
      <div>
        <h1 class="title">Disable Backdrop</h1>
        <p>disable-backdrop: {{ String(disableBackdrop) }}</p>
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
</style>
