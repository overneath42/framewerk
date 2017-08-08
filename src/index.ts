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

interface ControllerList {
  [key: string]: () => Controller;
}

/**
 * A framework for managing scripting on top of server-rendered pages.
 *
 * @class Framewerk
 * @since 0.1.0
 */
function fw(controllers: ControllerList, plugins: Plugin[]) {
  return {
    initialize
  };

  ////////////

  /**
   * Initialize the Framewerk package.
   *
   * @since 0.1.0
   */
  function initialize() {
    const controllerKeys = Object.keys(controllers);

    if (controllerKeys.length) {
      controllerKeys.forEach(name => {
        controllers[name]().initialize();
      });
    }
  }
}

export { fw, Controller, Plugin };
