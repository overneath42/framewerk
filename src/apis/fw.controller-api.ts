/**
 * @file The public API for an initialized `Controller`.
 *
 * @author Justin Toon
 * @license MIT
 */

import { Controller } from '../prototypes/fw.controller';

/**
 * @module framewerk/controller/api
 */

/**
 * An API for accessing properties and executing methods
 * within an instance of {@link Controller}.
 *
 * @implements {FramewerkApis.Controller}
 * @since 0.1.0
 */

export default class ControllerApi implements FramewerkApis.Controller {
  private selectors: ConfigObject;
  private methods: MethodObject;

  constructor(props: Framewerk.IController) {
    this.selectors = props.selectors;
    this.methods = props.methods;
  }

  public call(...params: string[]) {

  }

  private getMethod(key: string) {
    return this.methods[key];
  }
}
