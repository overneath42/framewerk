/* @flow */

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
export default class Plugin implements Framewerk.Plugin {
  container: string;
  target: string;
  plugin: Function;
  defaultOptions: Object;
  instanceOptions: Object;
  isJQueryPlugin: boolean;

  /**
   * Creates a new {@link Plugin}.
   *
   * @param {Function} plugin The primary plugin entry.
   * @param {string} [container] A selector string for a container to instantiate the plugin within.
   * @param {string} [target] A selector string for a target to execute the plugin against.
   * @param {Object} [defaultOptions] Default options shared by all instances of the plugin.
   * @param {Object} [instanceOptions] Options specific to the current instance.
   * @param {boolean} [isJQueryPlugin] Whether or not the plugin requires jQuery.
   */
  constructor(props: Framewerk.IPlugin) {
    this.plugin = props.plugin;
    this.container = props.container || 'body';
    this.target = props.target || 'body';
    this.defaultOptions = props.defaultOptions || {};
    this.instanceOptions = props.instanceOptions || {};
    this.isJQueryPlugin = props.isJQueryPlugin || false;
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
  static foundElements(selector: string, container: HTMLElement): boolean {
    if (!selector) return false;

    return container.querySelectorAll(selector).length > 0;
  }

  /**
   * Determine if a function actually is a function
   *
   * @since 0.1.0
   *
   * @static
   * @param {*} object The object to test.
   *
   * @return {boolean}
   */
  static isFunction(object: any): boolean {
    return typeof object === 'function';
  }

/**
   * Merges default and user options.
   *
   * @since 0.1.0
   *
   * @static
   * @param {Object} [defaultOptions = {}] Default options.
   * @param {Object} [instanceOptions] Instance options.
   *
   * @returns {Object} The merged options object.
   */
  static prepareOptions(defaultOptions: Object = {}, instanceOptions: Object = {}): Object {
    return Object.assign(defaultOptions, instanceOptions);
  }

  /**
   * Initializes the {@link Plugin}.
   *
   * @since 0.1.0
   *
   * @returns {PluginApi} An API for interacting with the {@link Plugin}.
   */
  initialize(): PluginApi {
    return new PluginApi({
      container: document.querySelector(this.container),
      target: this.target,
      plugin: this.plugin,
      defaultOptions: Object
    });
  }

  /**
   * Attempts to execute a {@link Plugin} method. Catches and logs any exceptions.
   *
   * @since 0.1.0
   *
   * @param {Function} command The plugin method to execute.
   *
   * @return {void}
   */
  execute(command: Function) {
    // make sure the provided command and the internally-initialized plugin
    // are both executable functions
    if ([this.plugin, command].every(this.isFunction)) {
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
