import { requestAnimationFrame, cancelAnimationFrame } from './raf';
import { parseQuery, isSelectorMapEqual } from './containerQuery';
import { toPairs, shallowCopyObj } from './DataStructure';

/**
 * Create a mixin that can be
 *
 * @param {Object} query - Container query definitions
 * @param {Object} [opts] - Options
 * @param {boolean} [opts.setAttribute] - When true, mixin will set or unset
 *                                        attributes on container element
 *                                        according to current active container
 *                                        query
 *
 * @return {Object} A mixin object that can be applied to a component
 */
export default function createContainerQueryMixin(query, {setAttribute = false} = {}) {

  const getClasses = parseQuery(query);

  return {
    defineContainer(component) {
      this._containerElement = component;
    },

    componentDidMount() {
      this._containerQuerySelectorMap = null;
      this._size = {width: null, height: null};
      this._rafId = null;

      const checkDimension = () => {
        const {clientWidth: width, clientHeight: height} = this._containerElement;

        let changed = false;

        if (this._size.width !== width) {
          changed = true;
        }

        if (this._size.height !== height) {
          changed = true;
        }

        this._size.width = width;
        this._size.height = height;

        if (changed) {
          this._updateAttributes();
        }

        this._rafId = requestAnimationFrame(checkDimension);
      };

      checkDimension();
    },

    componentWillUnmount() {
      cancelAnimationFrame(this._rafId);
      this._rafId = null;
      this._containerElement = null;

      if (this.containerQueryWillUpdate) {
        this.containerQueryWillUpdate(shallowCopyObj(this._containerQuerySelectorMap));
      }

      this._containerQuerySelectorMap = null;

      if (this.containerQueryDidUpdate) {
        this.containerQueryDidUpdate(shallowCopyObj(this._containerQuerySelectorMap));
      }
    },

    _updateAttributes() {
      const selectorMap = getClasses(this._size);

      if (isSelectorMapEqual(this._containerQuerySelectorMap, selectorMap)) {
        return;
      }

      if (this.containerQueryWillUpdate) {
        this.containerQueryWillUpdate(shallowCopyObj(this._containerQuerySelectorMap));
      }

      this._containerQuerySelectorMap = selectorMap;

      if (setAttribute) {
        for (const [selectorName, isOn] of toPairs(this._containerQuerySelectorMap)) {
          if (isOn) {
            this._containerElement.setAttribute(selectorName, '');
          } else {
            this._containerElement.removeAttribute(selectorName);
          }
        }
      }

      if (this.containerQueryDidUpdate) {
        this.containerQueryDidUpdate(shallowCopyObj(this._containerQuerySelectorMap));
      }
    }
  };
}
