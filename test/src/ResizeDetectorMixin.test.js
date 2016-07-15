import ResizeDetectorMixin from '../../lib/ResizeDetectorMixin';

describe('ResizeDetectorMixin', function () {

  describe('defineContainer', function () {

    const subjectMethod = ResizeDetectorMixin.defineContainer;

    it('assigns $erd and $container to null when no element', function () {
      const ctx = {};

      subjectMethod.call(ctx);

      expect(ctx.$erd).toBeNull();
      expect(ctx.$container).toBeNull();
    });

    it('invokes uninstall when no element but has $erd', function () {
      const uninstall = jasmine.createSpy('$erd.uninstall');
      const ctx = {
        $erd: {
          uninstall
        }
      };

      subjectMethod.call(ctx);

      expect(uninstall).toHaveBeenCalledTimes(1);
    });

    it('initialize $erd when has element', function () {
      const ctx = {};
      const element = document.createElement('div');
      document.body.appendChild(element);

      subjectMethod.call(ctx, element);

      expect(ctx.$erd).not.toBe(null);

      document.body.removeChild(element);
    });

    it('removes listeners from previous container', function () {
      const $container = document.createElement('div');
      document.body.appendChild($container);
      const ctx = {
        $container,
        $erd: {
          removeAllListeners: jasmine.createSpy('removeAllListeners'),
          listenTo: jasmine.createSpy('listenTo'),
        },
      };
      const element = document.createElement('div');
      document.body.appendChild(element);

      subjectMethod.call(ctx, element);

      expect(ctx.$erd.removeAllListeners).toHaveBeenCalledTimes(1);
      expect(ctx.$erd.removeAllListeners).toHaveBeenCalledWith($container);

      document.body.removeChild($container);
      document.body.removeChild(element);
    });

    it('assigns $container', function () {
      const ctx = {
        $erd: {
          removeAllListeners: jasmine.createSpy('removeAllListeners'),
          listenTo: jasmine.createSpy('listenTo'),
        },
      };
      const element = document.createElement('div');
      document.body.appendChild(element);

      subjectMethod.call(ctx, element);

      expect(ctx.$container).not.toBeNull();

      document.body.removeChild(element);
    });

    it('listens to $container size changes', function () {
      const ctx = {
        $erd: {
          removeAllListeners: jasmine.createSpy('removeAllListeners'),
          listenTo: jasmine.createSpy('listenTo'),
        },
      };
      const element = document.createElement('div');
      document.body.appendChild(element);

      subjectMethod.call(ctx, element);

      expect(ctx.$erd.listenTo).toHaveBeenCalledTimes(1);
      expect(ctx.$erd.listenTo).toHaveBeenCalledWith(element, jasmine.any(Function));

      document.body.removeChild(element);
    });

  });

});
