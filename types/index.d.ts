import Vue, { PluginFunction, VNodeData, Component} from 'vue'

declare const VueAccessibleModal: VueAccessibleModal

export default VueAccessibleModal

export interface VueAccessibleModal {
  install: PluginFunction<{
    confirmComponent: Vue
    transition: string
  }>
}

declare module 'vue/types/vue' {
  interface Vue {
    $modal: {
      show(
        component: Component,
        options?: {
          props?: Vue['$props']
          listeners?: Vue['$listeners']
          classes?: VNodeData['class']
          label?: string
          attributes?: Record<string, any>
          transition?: string
        }
      ): void
      close(): void
    }
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    modal?: {
      classes?: VNodeData['class']
      label?: string
      attributes?: Record<string, any>
      transition?: string
    }
  }
}
