import ResizeObserverLite, {ResizeObserverSize} from 'resize-observer-lite';
import matchQueries from 'container-query-toolkit/lib/matchQueries';
import {Params, Query} from './interfaces';
import isShallowEqual from './isShallowEqual';

export default class ContainerQueryCore {
  private rol: ResizeObserverLite;
  private result: Params = {};

  constructor(private query: Query, private callback: (params: Params) => void) {
    this.rol = new ResizeObserverLite((size) => {
      this._processSize(size);
    });
  }

  observe(element: Element) {
    // Check its an Element node. It could be null, or a Text node if the props.children function returns a string
    if (element instanceof Element) {
      const styles = window.getComputedStyle(element);
      this._processSize({
        width: this._getNumber(styles.width),
        height: this._getNumber(styles.height),
      });

      this.rol.observe(element);
    }
  }

  disconnect() {
    this.rol.disconnect();
  }

  private _processSize(size: ResizeObserverSize) {
    const result = matchQueries(this.query)(size);
    if (!isShallowEqual(this.result, result)) {
      this.callback(result);
      this.result = result;
    }
  }

  private _getNumber(str: string | null) {
    const m = str ? /^([0-9\.]+)px$/.exec(str) : null;
    return m ? parseFloat(m[1]) : 0;
  }
}
