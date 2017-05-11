// @flow

declare module vue {
  declare var exports: any;
}

declare module vuex {
  declare var exports: any;
}

interface ActionContext<S> {
  state: S;
  getters: any;
  dispatch: (type: string, payload: any) => void;
  commit: (type: string, payload: any) => void;
}
