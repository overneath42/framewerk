/**
 * @file Utility functions.
 *
 * @author Justin Toon
 * @license MIT
 */

/**
 * Creates a selector string to target a specific data attribute.
 * Accepts an attribute value in _camelCase_ or _snake-case_ and transforms appropriately. If the value starts with `^`,
 * the selector will be tailored to look for all elements with the given
 * data attribute and a value which starts with the provided selector string.
 *
 * @example
 * // returns '[data-attribute-name]`
 * dataSelector('attributeName');
 *
 * @example
 * // returns '[data-attribute-name]`
 * dataSelector('attribute-name');
 *
 * @example
 * // returns '[data-attribute-name="testValue"]'
 * dataSelector('attributeName', 'testValue');
 *
 * @example
 * // returns '[data-attribute-name^="testValue"]`
 * dataSelector('attributeName', '^testValue');
 *
 * @export
 * @param {string} attr The name of the data attribute.
 * @param {string} [value] A value to assign to the attribute.
 *
 * @return {string} - The formatted selector string.
 */
export function dataSelector(attr: string, value?: string): string {
  let operator: string = '=';

  if (attr.indexOf('-') === -1) {
    attr = camelToSnake(attr);
  }

  if (value && value.startsWith('^')) {
    operator = `${value.slice(0, 1)}${operator}`;
    value = value.slice(1);
  }

  return `[${attr}${operator}"${value}"]`;
}

/**
 * Converts a string from camelCase to snake-case.
 *
 * @example
 * // returns 'sample-attribute-name'
 * camelToSnake('sampleAttributeName);
 *
 * @see https://jamesroberts.name/blog/2010/02/22/string-functions-for-javascript-trim-to-camel-case-to-dashed-and-to-underscore/
 *
 * @param {string} str The string to transform.
 *
 * @return Returns the transformed string.
 */
export function camelToSnake(str: string) {
  return str.replace(/([A-Z])/g, $1 => `-${$1.toLowerCase()}`);
}
