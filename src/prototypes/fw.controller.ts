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
 * @since 0.1.0
 */
export class Controller implements Framewerk.Controller {
  container?: Container;
  public name: string;
  public selectors: ConfigObject;
  public events: MethodObject;
  public methods: MethodObject;

  /**
   * Creates a new {@link Controller}.
   *
   * @param {string} [container] - Selector string of a container element to manage.
   * @param {string} name - The name of the Controller.
   * @param {Object} selectors - Selector strings to use within the controller.
   * @param {Object} events - Functions to create event listeners.
   * @param {Object} methods - Methods to execute within the {@link Controller} container.
   */
  constructor(props: Framewerk.IController) {
    this.container = Controller.assignContainer(props);
    this.name = props.name;
    this.selectors = props.selectors || {};
    this.events = props.events || {};
    this.methods = props.methods || {};
  }

  /**
   * Initialize a set of functions to create event listeners.
   *
   * @static
   * @param {MethodObject} events An object of functions which will add event listeners when called.
   */
  private static initEventListeners(events: MethodObject) {
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
   * Assigns an appropriate selector string to the {@link Controller}. Will
   * choose the first option below which qualifies:
   *
   * 1. A specified container assigned to `props.container`
   * 2. A `data-controller` selector based on `props.name`
   * 3. `body`
   *
   * @static
   * @param {Framewerk.IController} props Controller properties.
   *
   * @returns {string}
   */
  private static assignContainer(props: Framewerk.IController): Container {
    if (props.container) {
      return props.container;
    } else if (props.name) {
      return document.querySelector(dataSelector('controller', props.name)) as HTMLElement;
    } else {
      return document.querySelector('body');
    }
  }

  /**
   * Initialize the {@link Controller}.
   *
   * @since 0.1.0
   *
   * @returns {ControllerApi} An API for interacting with the {@Controller}.
   */
  public initialize(): ControllerApi {
    Controller.initEventListeners(this.events);

    return new ControllerApi({
      selectors: this.selectors,
      methods: this.methods
    });
  }
}
