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
  width?: number;
  height?: number;
}

export function parsePixels(value: string) {
  if (/px$/.test(value)) {
    const [, digit] = /(\d+(\.\d+)?)px$/.exec(value);
    return Number(digit);
  }
  if (process.env.NODE_ENV !== 'production') {
    console.log(`current only pixel value height and width are supported, "${value}" is not a pixel value`);
  }
  return null;
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

    if (width == null || height == null) {
      return {};
    }

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
