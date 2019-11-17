import Vue, { Component, PluginObject } from 'vue'
import VueAccessibleModalComponent from './components/VueAccessibleModal.vue'
import Events from './events'
import {
  VueAccessibleModalPluginFunctionOptions,
  VueAccessibleModalMethodOptions,
} from '../types'

class VueAccessibleModal {
  private _root: Vue

  constructor(vm: Vue) {
    this._root = vm.$root
  }

  show(modal: Component, options?: VueAccessibleModalMethodOptions) {
    this._root.$emit(Events.Show, modal, options)
  }

  close() {
    this._root.$emit(Events.Close)
  }

  confirm<T>(
    component: Component,
    message: string,
    options?: VueAccessibleModalMethodOptions
  ) {
    return new Promise<T>((resolve, reject) => {
      this._root.$emit(
        Events.Confirm,
        component,
        message,
        {
          resolve,
          reject,
        },
        options
      )
    })
  }
}

const Plugin: PluginObject<VueAccessibleModalPluginFunctionOptions> = {
  install(Vue, options = {}) {
    if (Vue.$_accessible_modal_installed) return
    Vue.$_accessible_modal_installed = true

    Vue.mixin({
      beforeCreate() {
        this.$modal = new VueAccessibleModal(this)
      },
    })

    Vue.component('VueAccessibleModal', VueAccessibleModalComponent)

    Vue.prototype.$_accessibleModalOptions = {
      transition: undefined || options.transition,
    }
  },
}

export default Plugin
