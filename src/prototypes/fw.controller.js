/* @flow */

/**
 * @file The prototype object for `Controller`.
 *
 * @author Justin Toon
 * @license MIT
 */

import ControllerApi from '../apis/fw.controller-api';

/**
 * A generic prototype for creating a function which will
 * execute scripting within a specified container.
 *
 * @since 0.1.0
 */
export class Controller implements Controller$Interface {
  name: string;
  selectors: ConfigObject;
  events: MethodObject;
  methods: MethodObject;
  container: string;
  initialize: () => void;
  createEvents: () => void;

  /**
   * Creates a new {@link Controller}.
   *
   * @param {string} name - The name of the Controller.
   * @param {Object} selectors - Selector strings to use within the controller.
   * @param {Object} events - Functions to create event listeners.
   * @param {Object} methods - Methods to execute within the {@link Controller} container.
   * @param {string} [container] - Selector string of a container element to manage.
   */
  constructor(props: Controller$Interface) {
    this.name = props.name;
    this.selectors = props.selectors || {};
    this.events = props.events || {};
    this.methods = props.methods || {};
    this.container = props.container || `[data-controller="${props.name}"]` || 'body';
  }

  /**
   * Initialize a set of functions to create event listeners.
   *
   * @static
   * @param {Object} events An object of functions which will add event listeners when called.
   */
  static initEventListeners(events: MethodObject) {
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
  initialize(): ControllerApi {
    Controller.initEventListeners(this.events);
    return new ControllerApi();
  }
}
