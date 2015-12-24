import { requestAnimationFrame, cancelAnimationFrame } from '../src/raf';

describe('raf', function () {

  describe('requestAnimationFrame', function () {

    it('invokes callback at a later time', function (done) {
      requestAnimationFrame(() => {
        done()
      });
    }, 100);

  });

  describe('cancelAnimationFrame', function () {

    it('cancels feature callback', function (done) {
      const id = requestAnimationFrame(() => {
        done.fail('should not reach here');
      });

      cancelAnimationFrame(id);

      setTimeout(() => {
        done();
      }, 200);
    });

  });

});
