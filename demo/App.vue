<template>
  <section>
    <h1>vue-accessible-modal</h1>
    <button type="button" @click="openModal">Open modal</button>
    <button type="button" @click="openConfirmModal">Open confirm modal</button>
    <vue-accessible-modal @show="showHandler" @close="closeHandler">
      <template v-slot:backdrop></template>
    </vue-accessible-modal>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import ExampleComponent from './components/ExampleComponent.vue'
import ConfirmComponent from './components/ConfirmComponent.vue'

export default Vue.extend({
  name: 'App',
  methods: {
    openModal() {
      this.$modal.show(ExampleComponent, {
        props: {
          foo: 'foo',
          bar: 'bar',
        },
        listeners: { submit: (data: object) => console.log(data) },
        label: 'Modal',
        classes: 'foo bar',
        attributes: {
          id: 'bar',
        },
        transition: 'rotate-in',
      })
    },
    openConfirmModal() {
      this.$modal
        .confirm<string>(ConfirmComponent, 'Do you like JavaScript?')
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
    showHandler() {
      console.log('show')
    },
    closeHandler() {
      console.log('close')
    },
  },
})
</script>

<style lang="scss">
@import '../src/styles/core.scss';

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.48s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.rotate-in-enter-active,
.rotate-in-leave-active {
  transition: transform 0.48s;
}
.rotate-in-enter, .rotate-in-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: rotate3d(0, 0, 1, -192deg);
}

button:focus {
  background: red;
}
</style>
