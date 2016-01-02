import { toPairs } from './DataStructure';

/**
 * Test if two classMap object are the same
 *
 * @param {Object} a A plain JS object, with string as key, boolean as value
 * @param {Object} b Same as a
 *
 * @return {Boolean} True is a, b have the same key and mapped value
 */
export function isSelectorMapEqual(a, b) {
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);

  if (aKeys.length !== bKeys.length) {
    return false;
  }

  for (const key of aKeys) {
    if (a[key] !== b[key]) {
      return false;
    }
  }

  return true;
}

/**
 * A curried function. Take query defination and size object,
 * return a selectorMap by testing size against rules in query defination
 *
 * @param {Object} query Object contains container query break points
 * @param {Object} size  With width and height property
 *
 * @return {Object} A map of selector to boolean
 */
export function parseQuery(query) {
  const rules = [];

  for (const [selectorName, {minWidth, maxWidth, minHeight, maxHeight}] of toPairs(query)) {
    rules.push([
      selectorName,
      {
        minWidth: minWidth || 0,
        maxWidth: maxWidth || Infinity,
        minHeight: minHeight || 0,
        maxHeight: maxHeight || Infinity
      }
    ]);
  }

  return function ({width, height}) {
    const selectorMap = {};

    for (const [selectorName, {minWidth, maxWidth, minHeight, maxHeight}] of rules) {
      selectorMap[selectorName] = (
        minWidth <= width && width <= maxWidth &&
        minHeight <= height && height <= maxHeight
      );
    }

    return selectorMap;
  };
}
