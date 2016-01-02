/**
 * Convert obj to array of key value pairs
 *
 * @param {Object} obj A plain JS object
 *
 * @return {Array<Pair<string, Object>>} Pairs
 */
export function toPairs(obj) {
  return Object.keys(obj).map((key) => [key, obj[key]]);
}

/**
 * Create a shallow copy of provided object, will only use Object.keys
 * returned key.
 *
 * @param {Object} obj Object to copy
 *
 * @return {Object} A shallow copy of provided object
 */
export function shallowCopyObj(obj) {
  const copy = {};
  for (const key of Object.keys(obj)) {
    copy[key] = obj[key];
  }
  return copy;
}
