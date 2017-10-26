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
 * @since 1.0.0
 */
export class Plugin {
  public container: fw.Container;
  public target: string;
  public plugin: Function;
  public defaultOptions: fw.ConfigObject;
  public instanceOptions: fw.ConfigObject;
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
    this.target = props.target || 'body';
    this.defaultOptions = props.defaultOptions || {};
    this.instanceOptions = props.instanceOptions || {};
    this.isJQueryPlugin = props.isJQueryPlugin || false;
  }


  /**
   * Merges default and user options.
   *
   * @since 1.0.0
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
   * Initializes the {@link Plugin}.
   *
   * @since 1.0.0
   *
   * @returns {PluginApi} Returns an instance of the API for interacting with the {@link Plugin}.
   */
  public initialize(): PluginApi {
    return new PluginApi({
      container: this.container,
      target: this.target,
      plugin: this.plugin,
      options: Plugin.prepareOptions(this.defaultOptions, this.instanceOptions)
    });
  }
}
