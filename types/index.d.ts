import Vue, { PluginFunction, VNodeData, Component } from 'vue'

declare const VueAccessibleModal: VueAccessibleModal

export default VueAccessibleModal

export interface VueAccessibleModalOptions {
  props: Vue['$props']
  listeners: Vue['$listeners']
  classes: VNodeData['class']
  label: string
  attributes: Record<string, any>
  transition: string
}

export type VueAccessibleModalComponentOptions = Partial<
  Pick<VueAccessibleModalOptions, 'classes' | 'label' | 'attributes'>
>

export type VueAccessibleModalPluginFunctionOptions = Partial<
  Pick<VueAccessibleModalOptions, 'transition'>
>

export type VueAccessibleModalMethodOptions = Partial<VueAccessibleModalOptions>

export interface VueAccessibleModal {
  install: PluginFunction<VueAccessibleModalPluginFunctionOptions>
}

declare module 'vue/types/vue' {
  interface Vue {
    $modal: {
      show(
        component: Component,
        options?: VueAccessibleModalMethodOptions
      ): void
      close(): void
      confirm<T>(
        component: Component,
        message: string,
        options?: VueAccessibleModalMethodOptions
      ): Promise<T>
    }
    $_accessibleModalOptions: VueAccessibleModalPluginFunctionOptions
  }

  interface VueConstructor {
    $_accessible_modal_installed?: true
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    modal?: VueAccessibleModalComponentOptions
  }
}
