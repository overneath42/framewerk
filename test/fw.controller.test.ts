import 'mocha';
import { expect } from 'chai';
import { Controller } from '../src/prototypes/fw.controller';
import * as fixtures from './fixtures/controller.fixtures';

const { controllerDom, controllerProps, targetsObject } = fixtures;

describe('Controller', () => {
  let testController: Controller;
  let props: fw.IController;

  beforeEach(() => {
    props = controllerProps();
    document.documentElement.innerHTML = controllerDom();
  });

  it('should create the Controller', () => {
    testController = new Controller(props);

    expect(testController.name).to.equal(props.name);
  });

  describe('static getTargets', () => {
    it('should correctly locate targeted elements within the current document', () => {
      const targets = targetsObject();
      const testResult = Controller.getTargets(targets);

      debugger;

      expect((testResult.p as HTMLElement[]).length).to.equal(3);
    });
  });

  // describe('static initEventListeners', () => {
  //   it('should create event listeners', () => {});
  // });

  // describe('initialize', () => {});
});
