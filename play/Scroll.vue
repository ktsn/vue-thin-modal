<template>
  <div>
    <button class="button" type="button" @click="$modal.push('foo')">Open Modal</button>
    <p class="float">
      This should not move during opening/closing a modal
    </p>
    <modal name="foo">
      <div class="basic-modal">
        <h1 class="title">Foo</h1>
        <button type="button" @click="$modal.pop()">Close</button>
      </div>
    </modal>
    <p class="long">
      This is a long content
    </p>
  </div>
</template>

<style scoped>
.button {
  position: fixed;
  top: 40%;
  left: 350px;
}

.float {
  float: right;
}

.long {
  width: 300px;
  height: 3000px;
  background-image: linear-gradient(to bottom, #afa, #36f);
}
</style>
