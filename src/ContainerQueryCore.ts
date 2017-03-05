import isEqual = require('lodash/isEqual');
import ResizeObserverLite from 'resize-observer-lite';
import matchQueries from 'container-query-toolkit/lib/matchQueries';
import {Params, Query} from './interfaces';

export default class ContainerQueryCore {
  private rol: ResizeObserverLite;
  private result: Params = {};

  constructor(query: Query, callback: (params: Params) => void) {
    this.rol = new ResizeObserverLite((size) => {
      const result = matchQueries(query)(size);
      if (!isEqual(this.result, result)) {
        callback(result);
        this.result = result;
      }
    });
  }

  observe(element: Element) {
    this.rol.observe(element);
  }

  disconnect() {
    this.rol.disconnect();
  }
}
