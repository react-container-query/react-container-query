declare module 'element-resize-detector/type' {
  interface ElementResizeDetectorMakerOptions {
    strategy: string;
  }

  interface ElementResizeDetectorMaker {
    (options: ElementResizeDetectorMakerOptions): ElementResizeDetector;
  }

  interface ElementResizeDetector {
    listenTo(element: HTMLElement, listener: (element: HTMLElement) => void): void;
    // removeListener(element, listener)
    // removeAllListeners(element)
    uninstall(element: HTMLElement): void;
  }
}

declare module 'element-resize-detector' {
  import {ElementResizeDetectorMaker} from 'element-resize-detector/type';

  const elementResizeDetectorMaker: ElementResizeDetectorMaker;

  export = elementResizeDetectorMaker;
}
