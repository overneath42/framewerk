import { ControllerList } from 'framewerk';

/**
 * @file The primary entry for Framewerk.
 *
 * @author Justin Toon
 * @license MIT
 *
 * @requires ./prototypes/fw.controller.js:Controller
 * @requires ./prototypes/fw.plugin.js:Plugin
 */

import { Controller, Plugin } from './prototypes';

/**
 * A framework for managing scripting on top of server-rendered pages.
 *
 * @class Framewerk
 * @since 0.1.0
 */
export default class Framewerk {
  /**
   * The {@link Controller} class.
   *
   * @static
   * @since 0.1.0
   */
  public static Controller = Controller;

  /**
   * The {@link Plugin} class.
   *
   * @static
   * @since 0.1.0
   */
  public static Plugin = Plugin;

  /**
   * Controllers attached to the current Framewerk instance.
   *
   * @type {Fw.ControllerList}
   * @since 0.1.0
   */
  public controllers: ControllerList;

  /**
   * Plugins attached to the current Framewerk instance.
   *
   * @type {Plugin[]}
   * @since 0.1.0
   */
  public plugins: Plugin[];

  constructor(controllers?: ControllerList, plugins?: Plugin[]) {
    this.controllers = controllers || {};
    this.plugins = plugins || [];
  }

  /**
   * Initialize the Framewerk package.
   *
   * @since 0.1.0
   * @todo Make this do something
   */
  public initialize() {
    [].slice.call(this.controllers).forEach(element => {

    });
  }
}
