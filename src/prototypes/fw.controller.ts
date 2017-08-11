/**
 * @file The prototype object for `Controller`.
 *
 * @author Justin Toon
 * @license MIT
 */

import ControllerApi from '../apis/fw.controller-api';
import { dataSelector } from '../utils/fw.utils';

/**
 * A generic prototype for creating a function which will
 * execute scripting within a specified container.
 *
 * @since 1.0.0
 */
export class Controller {
  public container?: fw.Container;
  public name: string;
  public targets: fw.TargetsObject;
  public events: fw.MethodObject;
  public methods: fw.MethodObject;

  /**
   * Creates a new {@link Controller}.
   *
   * @param {string} name The name of the Controller.
   * @param {HTMLElement} [container] The container element to manage.
   * @param {Object} targets A collection of arrays of HTML elements.
   * @param {Object} [events] Functions to create event listeners.
   * @param {Object} [methods] Methods to execute within the Controller container.
   */
  constructor(props: fw.IController) {
    this.name = props.name;
    this.container = Controller.assignContainer(props);
    this.targets = props.targets || {};
    this.events = props.events || {};
    this.methods = props.methods || {};
  }

  /**
   * Convert a named list of selector strings into NodeLists.
   *
   * @static
   * @param {(string | ConfigObject)} [targets] Predefined targets.
   *
   * @returns {Object}
   */
  public static getTargets(targets?: fw.ConfigObject): fw.TargetsObject {
    let selectedElements: fw.TargetsObject = {};

    if (targets) {
      Object.keys(targets).forEach((key: string) => {
        const selected = document.querySelectorAll(
          targets[key] as string
        ) as NodeListOf<HTMLElement>;

        selectedElements[key] =
          selected.length === 1 ? selected.item(0) : [].slice.call(selected);
      });
    }

    return selectedElements;
  }

  /**
   * Assigns an appropriate selector string to the {@link Controller}. Will
   * choose the first option below which qualifies:
   *
   * 1. A specified container assigned to `props.container`
   * 2. A `data-controller` selector based on `props.name`
   * 3. `body`
   *
   * @static
   * @param {Controller} [props] Controller properties.
   *
   * @returns {fw.Container}
   */
  private static assignContainer(props?: fw.IController): fw.Container {
    if (props.container) {
      return props.container;
    } else if (props.name) {
      return document.querySelector(
        dataSelector('controller', props.name)
      ) as HTMLElement;
    } else {
      return document.querySelector('body');
    }
  }

  /**
   * Initialize a set of functions to create event listeners.
   *
   * @static
   * @param {MethodObject} events An object of functions which will add event listeners when called.
   */
  private static initEventListeners(events: fw.MethodObject) {
    Object.keys(events).forEach(key => {
      try {
        // attempt to initialize the event
        events[key]();
      } catch (error) {
        // if it fails, log the event and continue
        console.debug(error);
        return false;
      }
    });
  }

  /**
   * Initialize the {@link Controller}.
   *
   * @since 0.1.0
   *
   * @returns {ControllerApi} An API for interacting with the {@Controller}.
   */
  public initialize(): ControllerApi {
    const { container, events, targets, methods } = this;

    Controller.initEventListeners(events);

    return new ControllerApi({
      name,
      container,
      targets,
      methods
    });
  }
}
