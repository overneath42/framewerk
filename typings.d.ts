// Type definitions for Framewerk 0.1.0
// Project: https://github.com/overneath42/framewerk
// Definitions by: Justin Toon <http://justintoon.com>
// TypeScript Version: 2.3

interface ConfigObject {
  [key: string]: string
}

interface MethodObject {
  [key: string]: Function
}

interface IApi {

}

type Container = HTMLElement | HTMLBodyElement;

declare namespace Framewerk {
  interface IPrototype {
    name?: string;
    container?: Container;
  }

  export interface IController extends IPrototype {
    selectors?: ConfigObject;
    events?: MethodObject;
    methods?: MethodObject;
  }

  export interface IPlugin extends IPrototype {
    container?: Container;
    plugin: Function;
    target: Container;
    defaultOptions?: Object;
    instanceOptions?: Object;
    isJQueryPlugin: boolean;
  }

  export class Controller implements IController {
    container?: Container;
    name: string;
    selectors: ConfigObject;
    events: MethodObject;
    methods: MethodObject;
    // initialize(): void;
    // createEvents(): void;
  }

  export class Plugin implements IPlugin {
    container?: Container;
    plugin: Function;
    target: Container;
    defaultOptions: Object;
    instanceOptions: Object;
    isJQueryPlugin: boolean;
    // initialize(container: string | undefined): void;
    // callPlugin(container?: string, target?: string, options?: string | Object, params?: Object): void;
    // execute(command: Function): void;
    // isFunction(object: any): boolean;
    // setOptions(options?: Object): Object;
    // getContainer(container?: string): string;
 }
}

declare namespace FramewerkApis {
  export interface Controller extends IApi {
    call(...params: string[]): void;
  }

  export interface Plugin extends IApi {

  }
}

interface IFramewerk {
  controllers: Framewerk.Controller[];
  plugins: Framewerk.Plugin[];
}
