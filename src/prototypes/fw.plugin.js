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
export class Plugin implements Plugin$Interface {
  container: string;
  target: string;
  plugin: Function;
  defaultOptions: Object;
  instanceOptions: Object;
  isJQueryPlugin: boolean;
  initialize: ?string => void;
  callPlugin: (?string, ?string, ?(string | Object), ?Object) => void;
  execute: Function => void;
  isFunction: any => boolean;
  setOptions: ?Object => Object;
  getContainer: ?string => string;

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
  constructor(props: Plugin$Interface) {
    this.plugin = props.plugin;
    this.container = props.container || 'body';
    this.target = props.target || 'body';
    this.defaultOptions = props.defaultOptions || {};
    this.instanceOptions = props.instanceOptions || {};
    this.isJQueryPlugin = props.isJQueryPlugin || false;
  }

  /**
   * Initializes the {@link Plugin}.
   *
   * @since 0.1.0
   *
   * @returns {PluginApi} An API for interacting with the {@link Plugin}.
   */
  initialize(): PluginApi {
    this.callPlugin();

    return new PluginApi();
  }

  /**
   * Call the main {@link Plugin} function against a selector. All arguments are optional,
   * and instance values will be used if one or the other is not provided.
   *
   * @since 0.1.0
   *
   * @param {string} [container] - A valid selector string to execute the plugin within.
   * @param {string} [target] - A valid selector string or element to execute the plugin against.
   * @param {(string|Object)} [options] - Info to provide to the function call.
   * @param {Object} [params] - Additional parameters to provide.
   */
  callPlugin(
    container?: string,
    target?: string,
    options?: string | Object,
    params?: Object
  ) {
    container = this.getContainer(container);
    target = target || this.target;
    options = options || this.instanceOptions;

    if (typeof options === 'object') {
      options = this.setOptions(options);
    }

    if (target && this.foundElements(target, container)) {
      // if the plugin requires jQuery, we'll check to make sure
      // jQuery is defined, since this library does not add it.
      if (this.isJQueryPlugin && typeof window.jQuery !== 'undefined') {
        target = window.jQuery(target);
      }

      const args = [].concat([target], [options], params ? [params] : []);
      this.execute(this.plugin(...args));
    }
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

  /**
   * Determine if a function actually is a function
   *
   * @since 0.1.0
   *
   * @param {any} object The object to test.
   *
   * @return {boolean}
   */
  isFunction(object: any): boolean {
    return typeof object === 'function';
  }

  /**
   * Determine if the plugin target exists within the current view.
   *
   * @since 0.1.0
   *
   * @param  {string} selector - A valid selector string to target.
   * @param  {string} container - A valid selector string to search within.
   *
   * @returns {boolean}
   */
  foundElements(selector: string, container?: string): boolean {
    if (!selector) return false;

    container = container || this.container;
    return document.querySelectorAll(selector).length > 0;
  }

  /**
   * Merges default and user options.
   *
   * @since 0.1.0
   *
   * @param {Object} [options] Additional options.
   *
   * @returns {Object} The merged options object.
   */
  setOptions(options: ?Object): Object {
    return Object.assign(
      {},
      this.defaultOptions,
      this.instanceOptions,
      options || {}
    );
  }

  /**
   * Get the target container in which to execute
   * the plugin. Will return the instance container if
   * no argument is provided, ultimately falling back to
   * the page body.
   *
   * @since 0.1.0
   *
   * @param {string} [container] A valid selector string.
   *
   * @returns {string}
   */
  getContainer(container: ?string): string {
    return container || this.container || 'body';
  }
}
