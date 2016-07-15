import assign = require('lodash/assign');
import isEqual = require('lodash/isEqual');
import invariant = require('invariant');
import ResizeDetectorMixin from './ResizeDetectorMixin';
import {parseQuery, parsePixels} from './utils';

export interface ContainerQueries {
  [key: string]: number;
}

export interface ContainerQueryDefinition {
  [key: string]: ContainerQueries;
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
