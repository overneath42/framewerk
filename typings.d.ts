// Type definitions for Framewerk 0.1.0
// Project: https://github.com/overneath42/framewerk
// Definitions by: Justin Toon <http://justintoon.com>
// TypeScript Version: 2.4.2

declare module '@overneath42/framewerk' {
  interface ControllerList {
    [key: string]: () => Controller;
  }

  class Controller implements fw.IController {
    constructor(props: fw.IController);

    container?: fw.Container;
    name: string;
    targets: fw.TargetsObject;
    events?: fw.MethodObject;
    methods: fw.MethodObject;

    static getTargets(targets?: fw.ConfigObject): fw.TargetsObject;
    initialize(): void;
    createEvents(): void;
  }

  class Plugin implements fw.IPlugin {
    constructor(props: fw.IPlugin);

    container?: fw.Container;
    plugin: Function;
    target: fw.Container;
    defaultOptions: fw.ConfigObject;
    instanceOptions: fw.ConfigObject;
    isJQueryPlugin: boolean;

    static foundElements(selector: string, container: HTMLElement): boolean;
    private static prepareOptions(
      defaultOptions: fw.ConfigObject,
      instanceOptions: fw.ConfigObject
    ): fw.ConfigObject;
    private static isFunction(object: any): boolean;

    initialize(): void;
  }

  class ControllerApi {
    constructor(props: fw.IController);

    container: fw.Container;
    targets: fw.TargetsObject;
    methods: fw.MethodObject;

    call(...parms: string[]): void;
    private getMethod(key: string): () => any;
  }

  class PluginApi {
    constructor(props: fw.IPlugin);

    container: fw.Container;

    callPlugin(): void;
  }

  function fw(
    controllers?: ControllerList,
    plugins?: Plugin[]
  ): {
    initialize(): void;
  };
}

declare namespace fw {
  type Container = HTMLElement | HTMLBodyElement;

  interface ConfigObject {
    [key: string]: string | Function;
  }

  interface MethodObject {
    [key: string]: Function;
  }

  interface TargetsObject {
    [key: string]: HTMLElement | HTMLElement[];
  }

  interface NodeListObject<T extends HTMLElement> {
    [key: string]: NodeListOf<T>;
  }

  interface IPrototype {
    container?: Container;
  }

  interface IController extends IPrototype {
    name: string;
    targets: TargetsObject;
    events?: MethodObject;
    methods?: MethodObject;
  }

  interface IPlugin extends IPrototype {
    plugin: Function;
    target: Container;
    defaultOptions?: Object;
    instanceOptions?: Object;
    isJQueryPlugin: boolean;
  }
}
