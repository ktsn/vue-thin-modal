<template>
  <div>
    <button @click="$modal.push('example')">Open modal</button>
    <modal name="example" aria-labelledby="title">
      <div role="document">
        <h1 class="title" id="title">Accessible</h1>
        <button @click="$modal.pop()">Close modal</button>
      </div>
    </modal>
  </div>
</template>

<style scoped>
.title {
  margin: 0;
  font-weight: normal;
}
</style>
