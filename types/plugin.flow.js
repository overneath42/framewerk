declare interface Plugin$Interface {
  plugin: Function;
  container: string;
  target: string;
  defaultOptions: Object;
  instanceOptions: Object;
  isJQueryPlugin: boolean;
}

declare interface Plugin$Api {
  container: ?HTMLElement;
  target: string;
  plugin: Function;
  defaultOptions: ?Object;
}