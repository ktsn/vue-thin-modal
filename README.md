# vue-thin-modal

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

## References

### `<modal>` component

#### Props

* `name` - String, required

  Required as the modal name. The `name` must be unique against every modal you would use.

* `disable-backdrop` - Boolean

  If `true`, The modal will not be closed by clicking backdrop.

* `content-transition` - Object

  It is the same options as the props of Vue's `<transition>` component. You can customize the modal content transition by using this prop. If omitted a default transition will be used.

* `backdrop-transition` - Object

  Same as `content-transition` except for the modal backdrop.

### `this.$modal` mediator

#### Properties

* currentName

  Returns a modal name that appears currently.

#### Methods

* push(name: string): void

  Show the modal that cooresnponding with the `name`.

* pop(): void

  Hide the modal that is appearing.

* replace(name: string): void

  Hide the modal that is appearing and show a new modal.

## License

MIT
