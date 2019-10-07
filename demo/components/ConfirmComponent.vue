<template>
  <section>
    <h1>{{ message }}</h1>
    <button type="button" @click="resolveHandler">Resolve</button>
    <button type="button" @click="rejectHandler">Reject</button>
  </section>
</template>

<script>
export default {
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
      this.resolve('foo')
    },
    rejectHandler() {
      this.reject('bar')
    },
  },
}
</script>