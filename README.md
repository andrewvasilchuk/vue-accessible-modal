# vue-accessible-modal

> Vue.js component for accessible modals.

- [vue-accessible-modal](#vue-accessible-modal)
  - [Features](#features)
  - [Demo](#demo)
  - [Installation](#installation)
    - [Via NPM](#via-npm)
    - [Via Yarn](#via-yarn)
  - [Initialization](#initialization)
    - [As a plugin](#as-a-plugin)
  - [Usage](#usage)
    - [Template](#template)
    - [Styles](#styles)
    - [API](#api)
    - [Emitted events](#emitted-events)
      - [Example of subscribing to events](#example-of-subscribing-to-events)
    - [Example of possible usage of the library](#example-of-possible-usage-of-the-library)
  - [Powered by](#powered-by)
  - [License](#license)

## Features

- 📟 fully accessible to screen readers;
- ⌨️ supports keyboard navigation;
- 🎯 focus trap;
- restores focus when modal is closed;
- simple API.

## Demo

[![Edit vue-accessible-modal](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/vue-accessible-modal-9m474?fontsize=14)

## Installation

### Via NPM

```bash
npm install vue-accessible-modal --save
```

### Via Yarn

```bash
yarn add vue-accessible-modal
```

## Initialization

### As a plugin

It must be called before `new Vue()`.

```javascript
import Vue from 'vue'
import VueAccessibleModal from 'vue-accessible-modal'

// optional options
const options = {
  transition: 'fade',
}

Vue.use(VueAccessibleModal, options)
```

## Usage

### Template

First off you should insert the `<vue-accessible-modal />` component into your `template`, this is where your modals will be rendered:

```html
<template>
  <vue-accessible-modal />
</template>
```

### Styles

Then don't forget to include core styles:

`SASS`:

```scss
@import 'vue-accessible-modal/src/styles/core.scss';
```

Or already compiled `CSS`:

`CSS`:

```scss
@import 'vue-accessible-modal/dist/index.css';
```

> ⚠️ Note that when you import already compiled CSS you don't have ability to override `SASS` variables during build process, so it preferable to use`.scss` file. But you still have ability to override default styles and change CSS custom properties during runtime.

There are `SASS` variables you can override during build process:

```scss
$v-modal-holder-padding: 32px !default;
$v-modal-backdrop-color: rgba(#333, 0.88) !default;
$v-modal-content-background-color: #fff !default;
```

And [`CSS` custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) you can override during runtime:

```scss
:root {
  --v-modal-holder-padding: #{$v-modal-holder-padding};
  --v-modal-backdrop-color: #{$v-modal-backdrop-color};
  --v-modal-content-background-color: #{$v-modal-content-background-color};
}
```

### API

> 🌈 The main purpose of the library is just to give you a simple wrapper over your modal components that makes them accessible and provide you with simple **show**/**close** API over them.

When you install the plugin it injects `$modal` property into each component during `beforeCreate` hook, so you can **show** or **close** modals through `this.$modal.show` or `this.$modal.close` methods appropriately.

> ⚠️ Note that your modal component should contain at least one focusable element to set focus on. There should be at least one button that closes the dialog `<button @click="$modal.close()">Close dialog</button>`.

`$modal.show(component: VueComponent, options?: object)` method accepts two arguments:

1. `component`: Vue.js component you want to display in the modal.
2. `options`: object through which you can customize the behaviour of the modal.

`options` object can contain the following properties:

| Property     | Description                                                                                       |
| ------------ | ------------------------------------------------------------------------------------------------- |
| `props`      | `props` that will be passed to provided component via `v-bind="props"`                            |
| `listeners`  | an object with listeners to listen to events emitted from passed component via `v-on="listeners"` |
| `classes`    | custom classes that will be applied to the modal                                                  |
| `label`      | value of `aria-label` attribute                                                                   |
| `attributes` | any attribute you want to bind to the modal                                                       |
| `transition` | `name` of the transition that will be passed to `transition` component                            |

> ℹ️ Note that through `options.attributes` you can bind any HTML attribute to a modal.
> For example if you want to bind `aria-labelledby` or `aria-describedby`, you can do the following:

```js
{
  props: { },
  listeners: { },
  attributes: {
    id: 'foo',
    'aria-labelledby': 'foo',
    'aria-describedby': 'bar',
  },
}
```

To close modal from anywhere in your app you should call `this.$modal.close()` method.

> 🆕 Support version 0.4.0

Since version `0.4.0` you can use `vue-accessible-modal` to confirm user actions.
`this.$modal.confirm(component: VueComponent, message: string, options?: object)` accepts tha same arguments as the `$modal.show` method, but the second argument is message (the value that will be passed to your component as `message` prop).

Your confirm component should accept three props: `message` , `resolve` and `reject` (since `$modal.confirm` leverages `Promise`).

Bellow is the example of usage of `$modal.confirm`:

`ConfirmComponent.vue`:

```html
<template>
  <section>
    <h1>{{ message }}</h1>
    <button type="button" @click="resolveHandler">Resolve</button>
    <button type="button" @click="rejectHandler">Reject</button>
  </section>
</template>
```

```ts
import Vue from 'vue'

export default Vue.extend({
  name: 'ConfirmComponent',
  // required props
  props: {
    message: {
      type: String,
      required: true,
    },
    resolve: {
      type: Function,
      required: true,
    },
    reject: {
      type: Function,
      required: true,
    },
  },
  methods: {
    resolveHandler() {
      // this value will be passed to `then`
      this.resolve('foo')
    },
    rejectHandler() {
      // this value will be passed to `catch`
      this.reject('bar')
    },
  },
})
```

```ts
import ConfirmComponent from 'path/to/confirm/component'

export default {
  // ...
  methods: {
    confirm() {
      this.$modal
        .confirm(ConfirmComponent, 'Do you like JavaScript?')
        .then(val => {
          console.log(val)
        })
        .catch(val => {
          console.log(val)
        })
        .finally(() => {
          this.$modal.close()
        })
    },
  },
  // ...
}
```

### Emitted events

`<vue-accessible-modal>` component emits some events you can subscribe to:

| Event   | Description                               |
| ------- | ----------------------------------------- |
| `show`  | Emitted when a modal is completely shown  |
| `close` | Emitted when a modal is completely closed |

#### Example of subscribing to events

```html
<template>
  <vue-accessible-modal
    @show="showHandler"
    @close="closeHandler"
  ></vue-accessible-modal>
</template>
```

### Example of possible usage of the library

```js
import YourAwesomeComponent from './YorAwesomeComponent.vue'

export default {
  // ...
  methods: {
    submitHandler(e) {
      console.log(e)
    },
    showModal() {
      this.$modal.show(YourAwesomeComponent, {
        props: { foo: 'bar' },
        listeners: { submit: this.submitHandler },
        classes: ['foo', 'bar'],
        label: 'My awesome modal',
        attributes: {
          id: 'modal',
          'data-attribute': 'foo',
        },
        transition: 'fade',
      })
    },
  },
  // ...
}
```

> ℹ️ Note that your modal component can contain property named `modal`, which value will be applied to the modal component:

```js
export default {
  name: 'YourAwesomeComponent',
  data() {
    return {}
  },
  modal: {
    classes: ['foo', { bar: true }],
    label: 'foo',
    attributes: {
      id: 'baz',
    },
  },
}
```

This gives you a convenient way of providing custom `classes`, `label` and `attributes` specific to modal component.

> ⚠️ Notice that values provided via `options` in object will take precedence over values provided via component's `modal` property.

## Powered by

- `Vue.js`;
- `Typescript`;
- `Rollup` (and plugins);
- `SASS`;
- `PostCSS`;
- `Autoprefixer`;

## License

[MIT](http://opensource.org/licenses/MIT)
