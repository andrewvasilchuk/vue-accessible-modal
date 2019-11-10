<template>
  <transition :name="transition" @after-enter="$emit('show')" @after-leave="$emit('close')">
    <div
      v-if="open"
      ref="modal"
      v-bind="attributes"
      :class="className"
      role="dialog"
      aria-modal="true"
      :aria-label="label"
      @keyup.esc="close"
      @keydown.tab="focusHandler"
    >
      <div class="v-modal__backdrop" @click="close">
        <slot name="backdrop"></slot>
      </div>
      <div class="v-modal__inner">
        <div class="v-modal__holder">
          <div ref="content" class="v-modal__content">
            <component :is="component" v-bind="props" v-on="listeners" @hook:mounted="mountedHook"></component>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Plugin from '../'
import focusableElements from '../utils/focusable-elements'

export default {
  name: 'VueAccessibleModal',
  data() {
    return {
      open: false,
      component: null,
      options: {},
      lastFocusedElement: null,
    }
  },
  computed: {
    transition() {
      const { options } = this
      return options.transition
    },
    className() {
      const { options, component } = this
      const arr = ['v-modal']

      if (options && options.classes) {
        arr.push(options.classes)
      }

      if (component && component.modal && component.modal.classes) {
        arr.push(component.modal.classes)
      }

      return arr
    },
    attributes() {
      const { options } = this
      if (options) return options.attributes
      return {}
    },
    props() {
      const { options } = this
      if (options) return options.props
      return {}
    },
    listeners() {
      const { options } = this
      if (options) return options.listeners
      return {}
    },
    label() {
      const { component, options } = this
      return (
        options.label || (component && component.modal && component.modal.label)
      )
    },
  },
  created() {
    Plugin.event.$on('show', this.show)

    Plugin.event.$on('close', this.close)
  },
  methods: {
    show(component, options) {
      const { activeElement } = document

      if (activeElement) {
        this.lastFocusedElement = activeElement
      }

      this.open = true
      this.component = component
      this.options = options
    },
    close() {
      const { lastFocusedElement, props } = this

      if (lastFocusedElement) {
        lastFocusedElement.focus()
      }

      if (props && props.reject) {
        props.reject()
      }

      this.open = false
    },
    getFocusableElements() {
      const { modal } = this.$refs
      if (modal) {
        const elements = modal.querySelectorAll(focusableElements)

        if (elements) {
          // return only visible elements (e.g. display !== none)

          return Array.prototype.slice
            .call(elements)
            .filter(element => element.offsetParent !== null)
        } else {
          return []
        }
      }

      return []
    },
    focusHandler(e) {
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
    mountedHook(e) {
      const focusableElements = this.getFocusableElements()

      if (focusableElements.length) {
        focusableElements[0].focus()
      }
    },
  },
}
</script>
