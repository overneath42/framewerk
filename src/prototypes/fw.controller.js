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
   * Initialize the {@link Controller}.
   *
   * @since 0.1.0
   *
   * @returns {ControllerApi} An API for interacting with the {@Controller}.
   */
  initialize(): ControllerApi {
    this.createEvents();

    return new ControllerApi();
  }

  /**
   * Initialize all events provided to the {@link Controller}.
   *
   * @type {function}
   * @since 0.1.0
   */
  createEvents() {
    Object.keys(this.events).forEach(key => {
      try {
        this.events[key]();
      } catch (error) {
        // this organization can and will tolerate failure
        return false;
      }
    });
  }
}
