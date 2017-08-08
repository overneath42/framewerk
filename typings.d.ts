// Type definitions for Framewerk 0.1.0
// Project: https://github.com/overneath42/framewerk
// Definitions by: Justin Toon <http://justintoon.com>
// TypeScript Version: 2.4.2

declare namespace fw {
  interface IPrototype {
    name?: string;
    container?: Container;
  }

  interface IController extends IPrototype {
    targets?: NodeListObject<HTMLElement>;
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

  interface IApi {
    container: Container
  }

  interface IControllerApi extends IApi {
    targets: NodeListObject<HTMLElement>;
    methods?: MethodObject
  }

  interface IPluginApi extends IApi {

  }

  function fw(
    controllers?: ControllerList,
    plugins?: Plugin[]
  ): {
    initialize(): void;
  };
  type Container = HTMLElement | HTMLBodyElement;

  interface ConfigObject {
    [key: string]: string | Function;
  }

  interface MethodObject {
    [key: string]: Function;
  }

  interface NodeListObject<T extends HTMLElement> {
    [key: string]: NodeListOf<T>;
  }

  interface ControllerList {
    [key: string]: () => fw.Controller;
  }

  class Framewerk {
    constructor(controllers?: ControllerList, plugins?: Plugin[]);
    static Controller: Controller;
    static Plugin: Plugin;
    controllers?: ControllerList;
    plugins?: Plugin[];
    initialize(): void;
  }

  class Controller implements IController {
    constructor(props: IController);

    container?: Container;
    name: string;
    targets: NodeListObject<HTMLElement>;
    events: MethodObject;
    methods: MethodObject;

    static getTargets(targets?: ConfigObject): NodeListObject<HTMLElement>;
    initialize(): void;
    createEvents(): void;
  }

  class Plugin implements IPlugin {
    constructor(props: IPlugin);

    container?: Container;
    plugin: Function;
    target: Container;
    defaultOptions: ConfigObject;
    instanceOptions: ConfigObject;
    isJQueryPlugin: boolean;

    static foundElements(selector: string, container: HTMLElement): boolean;
    private static prepareOptions(
      defaultOptions: ConfigObject,
      instanceOptions: ConfigObject
    ): ConfigObject;
    private static isFunction(object: any): boolean;

    initialize(): void;
  }

  class ControllerApi implements IControllerApi {
    constructor(props: IController);

    container: Container;
    targets: NodeListObject<HTMLElement>;
    methods: MethodObject;

    call(...parms: string[]): void;
    private getMethod(key: string): () => any;
  }

  class PluginApi implements IPluginApi {
    constructor(props: IPlugin);

    container: Container;

    callPlugin(): void;
  }
}

declare module 'framewerk' {
  export = fw;
}
