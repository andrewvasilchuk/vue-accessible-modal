<template>
  <div class="box">
    <code>Props:</code>
    <pre>{{ $props }}</pre>
    <button type="button" @click="emitEvent">Emit event</button>
    <button>Helo World</button>
    <button disabled>Helo World</button>
    <button type="button" @click="closeModal">Close modal</button>
    <textarea></textarea>
    <textarea disabled></textarea>
    <input type="text" />
    <input type="text" disabled />
    <div tabindex="0">Focus</div>
    <button type="button" style="display:none;">Button</button>
    <button type="button" style="display:none;">Button</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ExampleComponent',
  props: {
    foo: {
      type: String,
      required: true,
    },
    bar: {
      type: String,
      required: true,
    },
  },
  methods: {
    emitEvent() {
      this.$emit('submit', { foo: this.foo, bar: this.bar })
    },
    closeModal() {
      this.$modal.close()
    },
  },
  modal: {
    classes: ['baz', 'poo', { javascript: true, jQuery: false }],
    label: 'Foo bar',
    attributes: {
      'data-test': 'foo',
    },
  },
})
</script>

<style>
.box {
  padding: 16px;
}
</style>
