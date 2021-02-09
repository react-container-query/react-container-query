import ResizeObserverLite from 'resize-observer-lite';
import matchQueries from 'container-query-toolkit/lib/matchQueries';
import { Params, Query } from './interfaces';
import isShallowEqual from './isShallowEqual';

export default class ContainerQueryCore {
  private rol: ResizeObserverLite;
  private result: Params = {};
  private animationFrameRequestId: number | null = null;

  constructor(query: Query, callback: (params: Params) => void) {
    this.rol = new ResizeObserverLite((size) => {
      this.animationFrameRequestId = window.requestAnimationFrame(() => {
        const result = matchQueries(query)(size);
        if (!isShallowEqual(this.result, result)) {
          callback(result);
          this.result = result;
        }
      });
    });
  }

  observe(element: Element) {
    this.rol.observe(element);
  }

  disconnect() {
    if (this.animationFrameRequestId) {
      window.cancelAnimationFrame(this.animationFrameRequestId);
    }
    this.rol.disconnect();
  }
}
