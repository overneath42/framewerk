/* @flow */

/**
 * @file The prototype object for `Controller`.
 *
 * @author Justin Toon
 * @license MIT
 */

/**
 * A generic prototype for creating a function which will
 * execute scripting within a specified container.
 *
 * @class Controller
 * @since 0.1.0
 */
export class Controller implements ControllerInterface {
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
  constructor(props: ControllerInterface) {
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
   * @memberof Controller
   */
  initialize() {
    this.createEvents();
  }

  /**
   * Initialize all events provided to the {@link Controller}.
   *
   * @type {function}
   * @since 0.1.0
   * @memberof Controller
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
