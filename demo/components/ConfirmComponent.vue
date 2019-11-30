<template>
  <section>
    <h1>{{ message }}</h1>
    <button type="button" @click="resolveHandler">Resolve</button>
    <button type="button" @click="rejectHandler">Reject</button>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ConfirmComponent',
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
      this.resolve({ success: true, value: 'User likes Javascript' })
    },
    rejectHandler() {
      this.reject({ success: false, value: 'User dislikes Javascript' })
    },
  },
})
</script>
