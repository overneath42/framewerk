declare interface PluginInterface {
  plugin: Function;
  container: string;
  target: string;
  defaultOptions: Object;
  instanceOptions: Object;
  isJQueryPlugin: boolean;
}