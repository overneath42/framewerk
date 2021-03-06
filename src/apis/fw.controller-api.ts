/**
 * @file The public API for an initialized `Controller`.
 *
 * @author Justin Toon
 * @license MIT
 */

import { Controller } from '../prototypes/fw.controller';

/**
 * An API for accessing properties and executing methods
 * within an instance of {@link Controller}.
 *
 * @implements {FramewerkApis.Controller}
 * @since 1.0.0
 */

export default class ControllerApi {
  public targets: fw.TargetsObject;
  public methods: fw.MethodObject;

  constructor(props: fw.IController) {
    this.targets = props.targets;
    this.methods = props.methods;
  }

  public call(...params: string[]) {}

  private getMethod(key: string) {
    return this.methods[key];
  }
}
