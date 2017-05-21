// Type definitions for Framewerk 0.1.0
// Project: https://github.com/overneath42/framewerk
// Definitions by: Justin Toon <http://justintoon.com>

interface ControllerInterface {
  name: string;
  selectors: ConfigObject;
  events: MethodObject;
  methods: MethodObject;
  container: string;
}

interface PluginInterface {
  plugin: Function;
  container: string;
  target: string;
  defaultOptions: Object;
  instanceOptions: Object;
  isJQueryPlugin: boolean;
}

declare namespace Framewerk {
  class Controller implements ControllerInterface {
    name: string;
    selectors: ConfigObject;
    events: MethodObject;
    methods: MethodObject;
    container: string;
    initialize(): void;
    createEvents(): void;
  }

  class Plugin implements PluginInterface {
    plugin: Function;
    container: string;
    target: string;
    defaultOptions: Object;
    instanceOptions: Object;
    isJQueryPlugin: boolean;
    initialize(container: string | undefined): void;
    callPlugin(container?: string, target?: string, options?: string | Object, params?: Object): void;
    execute(command: Function): void;
    isFunction(object: any): boolean;
    setOptions(options?: Object): Object;
    getContainer(container?: string): string;
 }
}