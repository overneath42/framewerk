/**
 * @file The public API for an initialized {@link Plugin}.
 *
 * @author Justin Toon
 * @license MIT
 */

import { Plugin } from '../prototypes/fw.plugin';

/**
 * An API for executing methods against an instance of {@link Plugin}.
 *
 * @class PluginApi
 * @since 1.0.0
 */
export default class PluginApi {
  container?: HTMLElement;
  target: string;
  plugin: Function;
  options?: fw.ConfigObject;

  /**
   * Creates an instance of PluginApi.
   * @param {Plugin$Api} props
   */
  constructor(props: fw.IPluginApi) {
    this.container = props.container;
    this.target = props.target;
    this.plugin = props.plugin;
    this.options = props.options || {};
  }

  /**
   * Determine if a function actually is a function.
   *
   * @since 1.0.0
   *
   * @static
   * @param {*} object The object to test.
   *
   * @return {boolean} Returns `true` if it was a function.
   */
  private static isFunction(object: any): boolean {
    return typeof object === 'function';
  }

  /**
   * Determine if any instances of target element are located
   * within a given container element.
   *
   * @static
   * @param {string} selector The selector string to query for.
   * @param {HTMLElement} container The container to search within.
   *
   * @returns {boolean}
   */
  private static foundElements(
    selector: string,
    container: HTMLElement
  ): boolean {
    if (!selector) return false;

    return container.querySelectorAll(selector).length > 0;
  }

  /**
   * Call the main {@link Plugin} function against a selector.
   */
  public callPlugin(
    container: fw.Container = this.container,
    target: string = this.target,
    options: fw.ConfigObject
  ) {
    if (PluginApi.foundElements(target, container)) {
      const args = [target, options];

      this.execute(this.plugin.apply(args));
    }
  }

  /**
   * Attempts to execute a {@link Plugin} method. Catches and logs any exceptions.
   *
   * @since 1.0.0
   *
   * @param {Function} command The plugin method to execute.
   */
  private execute(command: Function) {
    // make sure the provided command and the internally-initialized plugin
    // are both executable functions
    if ([this.plugin, command].every(PluginApi.isFunction)) {
      try {
        // bind current context to the function…
        command = command.bind(this);
        // …and try it.
        command();
      } catch (error) {
        // if it doesn't work, log the error and go on.
        console.debug(error);
      }
    }
  }
}
