<template>
  <transition
    :name="transition"
    @after-enter="$emit('show')"
    @after-leave="$emit('close')"
  >
    <div
      v-if="open"
      ref="modal"
      v-bind="attributes"
      :aria-label="label"
      :class="className"
      role="dialog"
      aria-modal="true"
      @keyup.esc="close"
      @keydown.tab="focusHandler"
    >
      <div class="v-modal__backdrop" @click="close">
        <slot name="backdrop"></slot>
      </div>
      <div class="v-modal__inner">
        <div class="v-modal__holder">
          <div ref="content" class="v-modal__content">
            <component
              :is="component"
              ref="component"
              v-bind="props"
              v-on="listeners"
              @hook:mounted="mountedHook"
            ></component>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue, { Component } from 'vue'
import focusableElements from '../utils/focusable-elements'
import Events from '../events/index'
import {
  VueAccessibleModalOptions,
  VueAccessibleModalComponentOptions,
  VueAccessibleModalMethodOptions,
} from '../../types'

type ConstructorParameters<T> = T extends new (...args: infer U) => any
  ? U
  : never

type PromiseConstructorParameter = ConstructorParameters<typeof Promise>[0]

type ResolveReject = {
  resolve: Parameters<PromiseConstructorParameter>[0]
  reject: Parameters<PromiseConstructorParameter>[1]
}

interface IData {
  open: boolean
  options: VueAccessibleModalMethodOptions | null
  component: Component | null
  componentOptions: VueAccessibleModalComponentOptions | null
  lastFocusedElement: HTMLElement | null
  confirmMessage: string | undefined
  resolveReject: ResolveReject | null
}

export default Vue.extend({
  name: 'VueAccessibleModal',

  data(): IData {
    return {
      open: false,
      options: null,
      component: null,
      componentOptions: null,
      lastFocusedElement: null,
      confirmMessage: undefined,
      resolveReject: null,
    }
  },

  computed: {
    transition(): string | undefined {
      const { options, $_accessibleModalOptions } = this
      if (options && options.transition) {
        return options.transition
      }

      return $_accessibleModalOptions.transition
    },
    className() {
      const { options, componentOptions } = this
      const arr = ['v-modal']

      if (options && options.classes) {
        arr.push(options.classes)
      }

      if (componentOptions && componentOptions.classes) {
        arr.push(componentOptions.classes)
      }

      return arr
    },
    attributes() {
      const { options, componentOptions } = this

      const obj = {}

      if (options && typeof options.attributes === 'object') {
        Object.assign(obj, options.attributes)
      }

      if (componentOptions && typeof componentOptions.attributes === 'object') {
        Object.assign(obj, componentOptions.attributes)
      }

      return obj
    },
    props() {
      const { options, confirmMessage, resolveReject } = this

      const obj = {}

      if (options && typeof options.props === 'object')
        Object.assign(obj, options.props)
      if (resolveReject) Object.assign(obj, resolveReject)
      if (confirmMessage) Object.assign(obj, { message: confirmMessage })

      return obj
    },
    listeners(): VueAccessibleModalOptions['listeners'] | {} {
      const { options } = this

      if (options && typeof options.listeners === 'object')
        return options.listeners
      return {}
    },
    label(): string | undefined {
      const { options, componentOptions } = this

      if (options && options.label) return options.label
      if (componentOptions && componentOptions.label)
        return componentOptions.label
    },
  },

  created() {
    this.$root.$on(Events.Show, this.show)
    this.$root.$on(Events.Confirm, this.confirm)
    this.$root.$on(Events.Close, this.close)
  },

  methods: {
    boot(component: Component, options?: VueAccessibleModalMethodOptions) {
      this.component = component
      this.options = options || null

      const { activeElement } = document
      if (activeElement) {
        this.lastFocusedElement = activeElement as HTMLElement
      }

      this.$nextTick(() => {
        this.open = true
      })
    },

    show(component: Component, options?: VueAccessibleModalMethodOptions) {
      this.boot(component, options)
    },

    confirm<T>(
      component: Component,
      message: string,
      resolveReject: ResolveReject,
      options?: VueAccessibleModalMethodOptions
    ) {
      this.confirmMessage = message
      this.resolveReject = resolveReject

      this.boot(component, options)
    },

    close() {
      const { lastFocusedElement, resolveReject, props } = this

      if (lastFocusedElement) {
        lastFocusedElement.focus()
      }

      if (resolveReject) {
        resolveReject.reject()
      }

      this.open = false
      this.componentOptions = null
    },

    getFocusableElements() {
      const { modal } = this.$refs

      const elements = (modal as Element).querySelectorAll<HTMLElement>(
        focusableElements
      )

      // return only visible elements (e.g. display !== none)
      return Array.from(elements).filter(
        element => element.offsetParent !== null
      )
    },

    focusHandler(e: KeyboardEvent) {
      const { activeElement } = document

      const focusableElements = this.getFocusableElements()

      if (!focusableElements.length) return

      const firstFocusableElement = focusableElements[0]
      const lastFocusedElement = focusableElements[focusableElements.length - 1]

      let element

      if (activeElement === firstFocusableElement && e.shiftKey) {
        element = lastFocusedElement
      } else if (activeElement === lastFocusedElement && !e.shiftKey) {
        element = firstFocusableElement
      }

      if (element) {
        e.preventDefault()
        element.focus()
      }
    },

    mountedHook() {
      const focusableElements = this.getFocusableElements()

      if (focusableElements.length !== 0) {
        focusableElements[0].focus()
      }

      const { modal } = (this.$refs.component as Vue).$options

      if (modal !== undefined) {
        this.componentOptions = modal
      }
    },
  },
})
</script>
