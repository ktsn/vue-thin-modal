import Vue, { PluginFunction } from 'vue';

export interface VueThinModalOptions {
  autoMountPortal?: boolean;
}

declare class VueThinModal {
  currentName: string;
  push(name: string): void;
  pop(): void;
  replace(name: string): void;
}

declare module 'vue/types/vue' {
  interface Vue {
    readonly $modal: VueThinModal;
  }
}

declare const _default: {
  install: PluginFunction<VueThinModalOptions>;
};

export default _default;
