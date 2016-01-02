import { toPairs } from './DataStructure';

/**
 * Test if two classMap object are the same
 *
 * @param {Object|null} a A plain JS object, with string as key, boolean as value
 * @param {Object|null} b Same as a
 *
 * @return {boolean} True if a and b have the same key and mapped value,
 *                   or both are null.
 */
export function isSelectorMapEqual(a, b) {
  if (a === b) {
    return true;
  } else if (a === null || b === null) {
    return false;
  }

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
