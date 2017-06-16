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
  controllers: Controller[];
  plugins: Plugin[];
  initialize(): void;

  /**
   * The {@link Controller} class.
   *
   * @static
   * @since 0.1.0
   */
  static Controller() {
    return Controller;
  }
  /**
   * The {@link Plugin} class.
   *
   * @static
   * @since 0.1.0
   */
  static Plugin() {
    return Plugin;
  }

  /**
   * Initialize the Framewerk package.
   *
   * @since 0.1.0
   * @todo Make this do something
   */
  initialize() {

  }
}
