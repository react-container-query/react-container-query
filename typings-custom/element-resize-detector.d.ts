declare module 'element-resize-detector/type' {
  interface ElementResizeDetectorMakerOptions {
    strategy: string;
  }

  interface ElementResizeDetectorMaker {
    (options: ElementResizeDetectorMakerOptions | null | undefined): ElementResizeDetector;
  }

  interface ElementResizeDetector {
    listenTo(element: HTMLElement, listener: (element: HTMLElement) => void): void;
    removeListener(element: HTMLElement, listener: (element: HTMLElement) => void): void;
    removeAllListeners(element: HTMLElement): void;
    uninstall(element: HTMLElement): void;
  }
}

declare module 'element-resize-detector' {
  import {ElementResizeDetectorMaker} from 'element-resize-detector/type';

  const elementResizeDetectorMaker: ElementResizeDetectorMaker;

  export = elementResizeDetectorMaker;
}

declare module 'element-resize-detector/src/browser-detector' {
  interface BrowserDetector {
    isIE(version: number): boolean;
  }

  const browserDetector: BrowserDetector;

  export = browserDetector;
}
