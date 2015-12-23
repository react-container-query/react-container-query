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
  const widthRules = [];
  const heightRules = [];
  const pairs = toPairs(query);
  const allClassNames = pairs.map(([className]) => className);

  for (const [className, rules] of pairs) {
    const {minWidth, maxWidth, minHeight, maxHeight} = rules;

    if (minWidth || maxWidth) {
      widthRules.push([className, {minWidth: minWidth || 0, maxWidth}]);
    }

    if (minHeight || maxHeight) {
      heightRules.push([className, {minHeight: minHeight || 0, maxHeight}]);
    }
  }

  widthRules.sort((a, b) => a[1].minWidth - b[1].minWidth);
  heightRules.sort((a, b) => a[1].minHeight - b[1].minHeight);

  return function ({width, height}) {
    const classMap = {};

    for (const className of allClassNames) {
      classMap[className] = false;
    }

    if (width !== null) {
      for (const [className, {minWidth, maxWidth}] of widthRules) {
        if (minWidth <= width) {
          if (maxWidth == null) {
            classMap[className] = true;
            continue;
          }

          if (width <= maxWidth) {
            classMap[className] = true;
          }
        }
      }
    }

    if (height !== null) {
      for (const [className, {minHeight, maxHeight}] of heightRules) {
        if (minHeight <= height) {
          if (maxHeight == null) {
            classMap[className] = true;
            continue;
          }

          if (height <= maxHeight) {
            classMap[className] = true;
          }
        }
      }
    }

    return classMap;
  };
}
