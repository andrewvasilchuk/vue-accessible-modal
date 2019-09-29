import VueAccessibleModal from './components/VueAccessibleModal.vue'

const Plugin = {
  install(Vue) {
    if (this.installed) {
      return
    }

    this.installed = true
    this.event = new Vue()

    Vue.prototype.$modal = {
      show(modal, options = {}) {
        Plugin.event.$emit('show', modal, options)
      },
      close() {
        Plugin.event.$emit('close')
      },
    }
    Vue.component('VueAccessibleModal', VueAccessibleModal)
  },
}

export default Plugin
