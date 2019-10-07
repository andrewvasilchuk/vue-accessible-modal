import VueAccessibleModal from './components/VueAccessibleModal.vue'

const Plugin = {
  install(Vue, options) {
    if (this.installed) {
      return
    }

    this.installed = true
    this.event = new Vue()
    this.confirmComponent = options.confirmComponent

    Vue.prototype.$modal = {
      show(modal, options = {}) {
        Plugin.event.$emit('show', modal, options)
      },
      close() {
        Plugin.event.$emit('close')
      },
      confirm(message, options = {}) {
        // if component is not passed pass the default
        if (!options.component) {
          options.component = Plugin.confirmComponent
        }

        return new Promise((resolve, reject) => {
          Plugin.event.$emit(
            'show',
            options.component,
            Object.assign({}, options, { props: { message, resolve, reject } })
          )
        })
      },
    }
    Vue.component('VueAccessibleModal', VueAccessibleModal)
  },
}

export default Plugin
