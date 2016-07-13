import invariant = require('invariant');
import toPairs = require('lodash/toPairs');
import {ContainerQueryDefinition} from './createContainerQueryMixin';

interface Rule {
  selectorName: string;
  minWidth: number;
  maxWidth: number;
  minHeight: number;
  maxHeight: number;
}

export interface Dimension {
  width: number;
  height: number;
}

export function parsePixels(value: string) {
  invariant(/px$/.test(value), 'value must be a pixel');
  const [, digit] = /(\d+)px$/.exec(value);
  return Number(digit);
}

export function parseQuery(query: ContainerQueryDefinition) {
  const rules: Rule[] = toPairs(query)
    .map(([selectorName, {minWidth, maxWidth, minHeight, maxHeight}]) => {
      return {
        selectorName,
        minWidth: minWidth || 0,
        maxWidth: maxWidth || Infinity,
        minHeight: minHeight || 0,
        maxHeight: maxHeight || Infinity
      };
    });

  return function (dimension: Dimension) {
    const {width, height} = dimension;
    const selectorMap: {[key: string]: boolean} = {};

    for (const {selectorName, minWidth, maxWidth, minHeight, maxHeight} of rules) {
      selectorMap[selectorName] = (
        minWidth <= width &&
        width <= maxWidth &&
        minHeight <= height &&
        height <= maxHeight
      );
    }

    return selectorMap;
  };
}
