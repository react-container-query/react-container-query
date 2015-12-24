import { requestAnimationFrame, cancelAnimationFrame } from './raf';
import { parseQuery, isSelectorMapEqual, toPairs } from './containerQuery';

export default function createContainerQueryMixin(query) {

  const getClasses = parseQuery(query);

  return {
    defineContainer(component) {
      this._containerElement = component;
    },

    componentDidMount() {
      this._containerQuerySelectorMap = {};
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
          this._updateClasses();
        }

        this._rafId = requestAnimationFrame(checkDimension);
      };

      checkDimension();
    },

    componentWillUnmount() {
      cancelAnimationFrame(this._rafId);
      this._rafId = null;
      this._containerElement = null;
    },

    _updateClasses() {
      const selectorMap = getClasses(this._size);

      if (isSelectorMapEqual(this._containerQuerySelectorMap, selectorMap)) {
        return;
      }

      this._containerQuerySelectorMap = selectorMap;

      for (const [selectorName, isOn] of toPairs(this._containerQuerySelectorMap)) {
        if (isOn) {
          this._containerElement.setAttribute(selectorName, '');
        } else {
          this._containerElement.removeAttribute(selectorName);
        }
      }
    }
  };
}
