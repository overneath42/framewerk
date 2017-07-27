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
export default class Framewerk implements IFramewerk {
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

  public controllers: Controller[];
  public plugins: Plugin[];

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
