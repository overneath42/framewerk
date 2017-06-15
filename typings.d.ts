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

interface Api {

}

declare namespace Framewerk {
  export interface IController {
    name: string;
    selectors: ConfigObject;
    events: MethodObject;
    methods: MethodObject;
    container: string;
  }

  export interface IPlugin {
    plugin: Function;
    container: string;
    target: string;
    defaultOptions: Object;
    instanceOptions: Object;
    isJQueryPlugin: boolean;
  }

  export class Controller implements IController {
    name: string;
    selectors: ConfigObject;
    events: MethodObject;
    methods: MethodObject;
    container: string;
    // initialize(): void;
    // createEvents(): void;
  }

  export class Plugin implements IPlugin {
    plugin: Function;
    container: string;
    target: string;
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
  export interface Controller extends Api {

  }

  export interface Plugin extends Api {

  }
}

interface Framewerk {
  controllers: Framewerk.Controller[];
  plugins: Framewerk.Plugin[];
  initialize(): void;
}
