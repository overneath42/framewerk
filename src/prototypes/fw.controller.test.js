import { Controller } from './fw.controller';

describe('Controller', () => {
  let testController;

  beforeEach(() => {
    testController = new Controller({
      name: 'test',
      container: 'body',
      selectors: {},
      events: {}
    });
  });

  test('should create the Controller', () => {
    expect(testController.name).toBe('test');
    expect(testController.container).toBe('body');
  });

  describe('static initEventListeners', () => {
    test('should create event listeners', () => {

    });
  });

  describe('initialize', () => {

  });
});
