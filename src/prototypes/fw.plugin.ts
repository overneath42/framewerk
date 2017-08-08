/**
 * @file The prototype object for `Plugin`.
 *
 * @author Justin Toon
 * @license MIT
 */

import PluginApi from '../apis/fw.plugin-api';

/**
 * A generic prototype for wrapping a third-party plugin to allow
 * for a common execution pattern.
 *
 * @since 0.1.0
 */
export class Plugin {
  public container: fw.Container;
  public target: fw.Container;
  public plugin: Function;
  public defaultOptions: Object;
  public instanceOptions: Object;
  public isJQueryPlugin: boolean;

  /**
   * Creates a new {@link Plugin}.
   *
   * @param {Function} plugin The primary plugin entry.
   * @param {HTMLElement} [container] A selector string for a container to instantiate the plugin within.
   * @param {string} [target] A selector string for a target to execute the plugin against.
   * @param {Object} [defaultOptions] Default options shared by all instances of the plugin.
   * @param {Object} [instanceOptions] Options specific to the current instance.
   * @param {boolean} [isJQueryPlugin] Whether or not the plugin requires jQuery.
   */
  constructor(props: fw.IPlugin) {
    this.plugin = props.plugin;
    this.container = props.container || document.querySelector('body');
    this.target = props.container || document.querySelector('body');
    this.defaultOptions = props.defaultOptions || {};
    this.instanceOptions = props.instanceOptions || {};
    this.isJQueryPlugin = props.isJQueryPlugin || false;
  }

  public static foundElements(
    selector: string,
    container: HTMLElement
  ): boolean {
    if (!selector) return false;

    return container.querySelectorAll(selector).length > 0;
  }

  /**
   * Merges default and user options.
   *
   * @since 0.1.0
   *
   * @static
   * @param {fw.ConfigObject} [defaultOptions = {}] Default options.
   * @param {fw.ConfigObject} [instanceOptions = {}] Instance options.
   *
   * @returns {fw.ConfigObject} Returns the merged options object.
   */
  private static prepareOptions(
    defaultOptions: fw.ConfigObject = {},
    instanceOptions: fw.ConfigObject = {}
  ): fw.ConfigObject {
    return Object.assign(defaultOptions, instanceOptions);
  }

  /**
   * Determine if a function actually is a function.
   *
   * @since 0.1.0
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

  /**
   * Initializes the {@link Plugin}.
   *
   * @since 0.1.0
   *
   * @returns {PluginApi} Returns an instance of the API for interacting with the {@link Plugin}.
   */
  public initialize(): PluginApi {
    return new PluginApi({
      container: this.container,
      target: this.target,
      plugin: this.plugin,
      isJQueryPlugin: this.isJQueryPlugin,
      defaultOptions: Object
    });
  }

  /**
   * Attempts to execute a {@link Plugin} method. Catches and logs any exceptions.
   *
   * @since 0.1.0
   *
   * @param {Function} command The plugin method to execute.
   */
  public execute(command: Function) {
    // make sure the provided command and the internally-initialized plugin
    // are both executable functions
    if ([this.plugin, command].every(Plugin.isFunction)) {
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
