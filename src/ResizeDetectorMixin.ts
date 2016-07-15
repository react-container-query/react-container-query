import elementResizeDetectorMaker = require('element-resize-detector');
import browserDetector = require('element-resize-detector/src/browser-detector');
import {ElementResizeDetector} from 'element-resize-detector/type';
import invariant = require('invariant');

export default {
  defineContainer(element: HTMLElement) {
    if (element) {
      // Component just mount

      if (!this.$erd) {
        this.$erd = elementResizeDetectorMaker(
          // Scroll strategy is not supported on IE9
          browserDetector.isIE(9) ? null : {strategy: 'scroll'}
        );
      }

      if (this.$container) {
        this.$erd.removeAllListeners(this.$container);
      }

      this.$container = element;

      this.$erd.listenTo(this.$container, (element: HTMLElement) => {
        if (this.componentDidResize) {
          this.componentDidResize(element);
        }
      });

    } else {
      // Component just unmount

      if (this.$erd) {
        this.$erd.uninstall(this.$container);
      }

      this.$container = null;
      this.$erd = null;
    }
  },
};
