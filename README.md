# vue-thin-modal

[![Build Status](https://travis-ci.org/ktsn/vue-thin-modal.svg?branch=master)](https://travis-ci.org/ktsn/vue-thin-modal)
[![vue-thin-modal Dev Token](https://badge.devtoken.rocks/vue-thin-modal)](https://devtoken.rocks/package/vue-thin-modal)

vue-thin-modal provides thin but powerful modal component. Its styles, transitions and contents are fully customizable.

## Installation

```bash
$ npm install --save vue-thin-modal
# or
$ yarn add vue-thin-modal
```

## Usage

1. Import `VueThinModal` and install it in Vue constructor.

  ```js
  import Vue from 'vue'
  import VueThinModal from 'vue-thin-modal'

  Vue.use(VueThinModal)

  new Vue({
    // ...
  })
  ```

2. (Optional) Import base CSS file for the modal wherever you want or you can define your own styles.

  ```js
  import 'vue-thin-modal/dist/vue-thin-modal.css'
  ```

3. Use `<modal>` component in your apps. You can see `this.$modal` in your components

  ```vue
  <template>
    <div>
      <button type="button" @click="open">Open Modal</button>
      <modal name="example">
        <div class="basic-modal">
          <h1 class="title">Modal Title</h1>
          <button class="button" type="button" @click="close">Close Modal</button>
        </div>
      </modal>
    </div>
  </template>

  <script>
  export default {
    methods: {
      open () {
        this.$modal.push('example')
      },

      close () {
        this.$modal.pop()
      }
    }
  }
  </script>
  ```
  
### Auto installing vue-thin-modal

If you have `Vue` constructor on `window`, you don't need to call `Vue.use(VueThinModal)` since it will be called automatically. This is the case when you load Vue.js and vue-thin-modal via `<script>` element.

### Manually mount portal

By default, the modal content will be automatically sent just under the `<body>` element by `<modal-portal>` component. You can disable this behavior by setting `autoMountPortal: false` option.

```js
import Vue from 'vue'
import VueThinModal from 'vue-thin-modal'

Vue.use(VueThinModal, {
  autoMountPortal: false
})
```

In that case, you have to put `<modal-portal>` by yourself.

```vue
<template>
  <div id="app">
    <!-- Application body goes here -->

    <modal-portal />
  </div>
</template>
```

This is useful when you want to inject some plugin instances from the root Vue instance because the auto-mounted portal will not belong to the user defined root Vue instance. For example, you need to put the portal manually when you use [`vue-i18n`](https://github.com/kazupon/vue-i18n) plugin.

```js
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import VueThinModal from 'vue-thin-modal'

Vue.use(VueThinModal, {
  autoMountPortal: false
})

Vue.use(VueI18n)

// Create VueI18n instance with options
const i18n = new VueI18n({
  // vue-i18n options
})


new Vue({
  el: '#app',

  // Since you need to inject i18n instance here,
  // you should put <modal-portal> by yourself.
  i18n,

  // ... remaining options ...
})
```

## References

### `<modal>` component

#### Props

* `name` - String, required

  Required as the modal name. The `name` must be unique against every modal you would use.

* `pre-mount` - Boolean

  If `true`, the modal contents will be pre mounted into the DOM tree. It is useful if you want to pre load the large images on your modal contents before opened.

* `disable-backdrop` - Boolean

  If `true`, the modal will not be closed by clicking backdrop.

* `content-transition` - String | Object

  The transition property for the modal content. When passing `String` as the value, it will be used as transition name. When passing `Object`, it may contain the same options for the Vue's `<transition>` component. If omitted, the default value – `{ name: 'modal-content' }` – will be used.

* `backdrop-transition` - String | Object

  Same as `content-transition` except for the modal backdrop. The default value is `{ name: 'modal-backdrop' }`

#### Events

* `before-open`

  Emitted before opening a modal.

* `opened`

  Emitted after opening a modal.

* `before-close`

  Emitted before closing a modal.

* `closed`

  Emitted after closing a modal.

#### Slots

* `(default)` - A modal content. Must be only element.

* `backdrop` - A modal backdrop element.

### `this.$modal` mediator

#### Properties

* currentName

  Returns a modal name that appears currently.

#### Methods

* push(name: string): void

  Show the modal that cooresponding with the `name`.

* pop(): void

  Hide the modal that is appearing.

* replace(name: string): void

  Hide the modal that is appearing and show a new modal.

## License

MIT
