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
import { dataSelector } from './utils/fw.utils';

interface ControllerList {
  [key: string]: () => Controller;
}

/**
 * A framework for managing scripting on top of server-rendered pages.
 *
 * @class Framewerk
 * @since 1.0.0
 */
function fw(controllers: ControllerList, plugins: Plugin[]) {
  return {
    initialize
  };

  ////////////

  /**
   * Initialize the Framewerk package.
   *
   * @since 1.0.0
   */
  function initialize() {
    const controllerKeys = Object.keys(controllers);

    if (controllerKeys.length) {
      controllerKeys.forEach(name => {
        const selector = dataSelector('controller', name);
        const container = document.querySelector(selector);

        if (container) {
          controllers[name]().initialize();
        }
      });
    }
  }
}

export { fw, Controller, Plugin };
