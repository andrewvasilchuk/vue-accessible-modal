import Vue, { VNodeData } from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    $modal: {
      show(
        component: Vue,
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
      label: string
      attributes?: Record<string, any>
      transition: string
    }
  }
}
