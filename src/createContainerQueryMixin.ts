import ResizeDetectorMixin from './ResizeDetectorMixin';
import assign = require('lodash/assign');
import toPairs = require('lodash/toPairs');
import isEqual = require('lodash/isEqual');
import invariant = require('invariant');

export interface ContainerQueries {
  [key: string]: number;
}

export interface ContainerQueryDefinition {
  [key: string]: ContainerQueries;
}

interface Rule {
  selectorName: string;
  minWidth: number;
  maxWidth: number;
  minHeight: number;
  maxHeight: number;
}

interface Dimension {
  width: number;
  height: number;
}

export default function (query: ContainerQueryDefinition) {
  const getClasses = parseQuery(query);

  const mixin = {
    componentDidResize(element: HTMLElement) {
      const {width: widthPx, height: heightPx} = window.getComputedStyle(element);
      const width = parsePixels(widthPx);
      const height = parsePixels(heightPx);
      const selectorMap = getClasses({width, height});

      if (!isEqual(this.$selectorMap, selectorMap)) {
        this.$selectorMap = selectorMap;
        this.setState({containerQuery: selectorMap});
      }
    },
  };

  return assign(mixin, ResizeDetectorMixin);
}

function parsePixels(value: string) {
  invariant(/px$/.test(value), 'value must be a pixel');
  const [, digit] = /(\d+)px$/.exec(value);
  return Number(digit);
}

function parseQuery(query: ContainerQueryDefinition) {
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
