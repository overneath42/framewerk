import * as faker from 'faker';
import { Controller } from '../../src/prototypes/fw.controller';

export function targetsObject(): fw.ConfigObject {
  return {
    a: 'a',
    span: 'span',
    div: 'div',
    p: 'p'
  };
}

export function controllerProps(): fw.IController {
  return {
    name: faker.random.word(),
    // is this cheating!?
    targets: Controller.getTargets(targetsObject())
  };
}

export function controllerDom(): string {
  return `
    <div>
      <p>${faker.lorem.paragraph(1)}</p>
      <p>${faker.lorem.paragraph(1)}</p>
      <p>${faker.lorem.paragraph(1)}</p>
      <p>${faker.lorem.paragraph(1)}</p>

      <span>${faker.lorem.word()}</span>

      <a href="#">Link 1</a>
      <a href="#">Link 2</a>
      <a href="#">Link 3</a>
    </div>
  `;
}
