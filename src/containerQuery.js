export function toPairs(obj) {
  return Object.keys(obj).map((key) => [key, obj[key]]);
}

export function isClassMapEqual(a, b) {
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

export function parseQuery(query) {
  const rules = [];

  for (const [className, {minWidth, maxWidth, minHeight, maxHeight}] of toPairs(query)) {
    rules.push([
      className,
      {
        minWidth: minWidth || 0,
        maxWidth: maxWidth || Infinity,
        minHeight: minHeight || 0,
        maxHeight: maxHeight || Infinity
      }
    ]);
  }

  return function ({width, height}) {
    const classMap = {};

    for (const [className, {minWidth, maxWidth, minHeight, maxHeight}] of rules) {
      classMap[className] = (
        minWidth <= width && width <= maxWidth &&
        minHeight <= height && height <= maxHeight
      );
    }

    return classMap;
  };
}
