import VueAccessibleModalComponent from './components/VueAccessibleModal.vue'
import { Show, Close } from './events'

class VueAccessibleModal {
  constructor(vm) {
    this._root = vm.$root
  }

  show(modal, options = {}) {
    this._root.$emit(Show, modal, options)
  }

  close() {
    this._root.$emit(Close)
  }

  confirm(message, options = {}) {
    return new Promise((resolve, reject) => {
      this._root.$emit(
        Show,
        options.component,
        Object.assign({}, options, {
          props: { message, resolve, reject },
        })
      )
    })
  }
}

/**
 * Plugin install function.
 * @param {Function} Vue - the Vue constructor.
 */
const Plugin = {
  install(Vue, options) {
    if (Vue.$_accessibleModalInstalled) return
    Vue.$_accessibleModalInstalled = true

    Vue.mixin({
      beforeCreate() {
        this.$modal = new VueAccessibleModal(this, options)
      },
    })

    Vue.component('VueAccessibleModal', VueAccessibleModalComponent)

    Vue.prototype.$_accessibleModalOptions = {
      transition: null || options.transition,
    }
  },
}

export default Plugin
