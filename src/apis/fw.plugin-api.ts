/**
 * @file The public API for an initialized {@link Plugin}.
 *
 * @author Justin Toon
 * @license MIT
 */

import Plugin from '../prototypes/fw.plugin';

/**
 * An API for executing methods against an instance of {@link Plugin}.
 *
 * @class PluginApi
 * @since 0.1.0
 */
export default class PluginApi implements FramewerkApis.Plugin {
  container?: HTMLElement;
  target: string;
  plugin: Function;
  defaultOptions?: Object;

  /**
   * Creates an instance of PluginApi.
   * @param {Plugin$Api} props
   */
  constructor(props: Framewerk.IPlugin) {
    this.container = props.container;
    this.target = props.target;
    this.plugin = props.plugin;
    this.defaultOptions = props.defaultOptions || {};
  }

  /**
   * Call the main {@link Plugin} function against a selector.
   */
  callPlugin() {
    if (this.container && Plugin.foundElements(this.target, this.container)) {

    }
  }
}
