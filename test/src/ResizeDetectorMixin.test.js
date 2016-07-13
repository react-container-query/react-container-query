import createContainerQueryMixin from '../../lib/createContainerQueryMixin';

describe('ResizeDetectorMixin', function () {

  function getMixin() {
    return createContainerQueryMixin({
      mobile: {maxWidth: 399},
      desktop: {minWidth: 400}
    });
  }

  describe('defineContainer', function () {

    it('assigns $container to ctx', function () {
      const subjectMethod = getMixin().defineContainer;
      const ctx = {};
      subjectMethod.call(ctx, 'element');
      expect(ctx.$container).toEqual('element');
    });

  });

  describe('componentDidMount', function () {

    let subjectMethod;
    let ctx;
    let element;

    beforeEach(function () {
      subjectMethod = getMixin().componentDidMount;
      element = document.createElement('div');
      element.style.width = '200px';
      element.style.height = '200px';
      document.body.appendChild(element);
      ctx = {
        $container: element,
        componentDidResize: jasmine.createSpy('componentDidResize')
      };
    });

    afterEach(function () {
      document.body.removeChild(element);
    });

    it('checks element size', function (done) {
      subjectMethod.call(ctx);

      expect(ctx.$erd).not.toBeNull();

      setTimeout(() => {
        expect(ctx.componentDidResize.calls.count()).toEqual(1);

        ctx.$erd.uninstall(ctx.$container);
        done();
      }, 10);
    });

  });

  describe('componentWillUnmount', function () {

    it('uninstall resize detector', function (done) {
      const subjectMethod = getMixin().componentWillUnmount;
      const ctx = {
        $container: {},
        $erd: {
          uninstall: jasmine.createSpy('uninstall')
        },
      };

      subjectMethod.call(ctx);

      expect(ctx.$erd.uninstall.calls.count()).toEqual(1);

      done();
    });

  });

});
