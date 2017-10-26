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
  [key: string]: (container: fw.Container) => Controller;
}

interface PluginList {
  [key: string]: (container: fw.Container) => Plugin;
}

/**
 * A framework for managing scripting on top of server-rendered pages.
 *
 * @class Framewerk
 * @since 1.0.0
 */
function fw(
  controllers: ControllerList,
  plugins?: Plugin[],
  pluginTargets?: fw.ConfigObject
) {
  return {
    initialize
  };

  ////////////

  /**
   * Initialize the Framewerk package.
   *
   * @since 1.0.0
   */
  function initialize(
    container: fw.Container = document.querySelector('body')
  ) {
    const controllerKeys = Object.keys(controllers);

    if (controllerKeys.length) {
      controllerKeys.forEach(name => {
        const selector = dataSelector('controller', name);
        const controllerContainer = document.querySelector(selector);

        if (controllerContainer) {
          controllers[name](container).initialize();
        }
      });
    }

    if (plugins && pluginTargets) {
      const pluginKeys = Object.keys(pluginTargets);

      if (pluginKeys.length) {
        pluginKeys.forEach(name => {
          plugins[name](pluginTargets[name]);
        });
      }
    }
  }
}

export { fw, Controller, Plugin };
