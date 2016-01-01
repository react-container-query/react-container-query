import { toPairs, isSelectorMapEqual, parseQuery } from '../../src/containerQuery';

describe('containerQuery', function () {

  describe('toPairs', function () {

    it('converts object to key value pairs', function () {
      const result = toPairs({a: 1, b: 2});
      expect(result).toEqual([['a', 1], ['b', 2]]);
    });

  });

  describe('isSelectorMapEqual', function () {

    it('returns true for same selectorMap', function () {
      const result = isSelectorMapEqual({a: true, b: true}, {a: true, b: true});
      expect(result).toEqual(true);
    });

    it('returns false if selectorMaps have different keys', function () {
      const result = isSelectorMapEqual({a: true, b: true}, {a: true, c: true});
      expect(result).toEqual(false);
    });

    it('returns false if selectorMaps have different values', function () {
      const result = isSelectorMapEqual({a: true, b: false}, {a: true, b: true});
      expect(result).toEqual(false);
    });

  });

  describe('parseQuery', function () {

    describe('width only', function () {

      it('returns correct selectorMap based on maxWidth', function () {
        const query = {
          a: {maxWidth: 400},
          b: {maxWidth: 600}
        };

        const result1 = parseQuery(query)({width: 300, height: 0});
        expect(result1).toEqual({a: true, b: true});

        const result2 = parseQuery(query)({width: 500, height: 0});
        expect(result2).toEqual({a: false, b: true});

        const result3 = parseQuery(query)({width: 700, height: 0});
        expect(result3).toEqual({a: false, b: false});
      });

      it('returns correct selectorMap based on minWidth', function () {
        const query = {
          a: {minWidth: 400},
          b: {minWidth: 600}
        };

        const result1 = parseQuery(query)({width: 300, height: 0});
        expect(result1).toEqual({a: false, b: false});

        const result2 = parseQuery(query)({width: 500, height: 0});
        expect(result2).toEqual({a: true, b: false});

        const result3 = parseQuery(query)({width: 700, height: 0});
        expect(result3).toEqual({a: true, b: true});
      });

      it('returns correct selectorMap based on minWidth and maxWidth combined', function () {
        const query = {
          a: {minWidth: 400, maxWidth: 599},
          b: {minWidth: 600, maxWidth: 700}
        };

        const result1 = parseQuery(query)({width: 300, height: 0});
        expect(result1).toEqual({a: false, b: false});

        const result2 = parseQuery(query)({width: 500, height: 0});
        expect(result2).toEqual({a: true, b: false});

        const result3 = parseQuery(query)({width: 700, height: 0});
        expect(result3).toEqual({a: false, b: true});

        const result4 = parseQuery(query)({width: 800, height: 0});
        expect(result4).toEqual({a: false, b: false});
      });

    });

    describe('height only', function () {

      it('returns correct selectorMap based on maxHeight', function () {
        const query = {
          a: {maxHeight: 400},
          b: {maxHeight: 600}
        };

        const result1 = parseQuery(query)({width: 0, height: 300});
        expect(result1).toEqual({a: true, b: true});

        const result2 = parseQuery(query)({width: 0, height: 500});
        expect(result2).toEqual({a: false, b: true});

        const result3 = parseQuery(query)({width: 0, height: 700});
        expect(result3).toEqual({a: false, b: false});
      });

      it('returns correct selectorMap based on minHeight', function () {
        const query = {
          a: {minHeight: 400},
          b: {minHeight: 600}
        };

        const result1 = parseQuery(query)({width: 0, height: 300});
        expect(result1).toEqual({a: false, b: false});

        const result2 = parseQuery(query)({width: 0, height: 500});
        expect(result2).toEqual({a: true, b: false});

        const result3 = parseQuery(query)({width: 0, height: 700});
        expect(result3).toEqual({a: true, b: true});
      });

      it('returns correct selectorMap based on minHeight and maxHeight combined', function () {
        const query = {
          a: {minHeight: 400, maxHeight: 599},
          b: {minHeight: 600, maxHeight: 700}
        };

        const result1 = parseQuery(query)({width: 0, height: 300});
        expect(result1).toEqual({a: false, b: false});

        const result2 = parseQuery(query)({width: 0, height: 500});
        expect(result2).toEqual({a: true, b: false});

        const result3 = parseQuery(query)({width: 0, height: 700});
        expect(result3).toEqual({a: false, b: true});

        const result4 = parseQuery(query)({width: 0, height: 800});
        expect(result4).toEqual({a: false, b: false});
      });

    });

    describe('width and height', function () {

      it('returns correct selectorMap', function () {
        const query = {
          a: {minWidth: 400, maxWidth: 500, minHeight: 400, maxHeight: 500},
          b: {minWidth: 500, maxWidth: 600, minHeight: 400, maxHeight: 500},
          c: {minWidth: 400, maxWidth: 500, minHeight: 500, maxHeight: 600},
          d: {minWidth: 500, maxWidth: 600, minHeight: 500, maxHeight: 600},
        };

        const result1 = parseQuery(query)({width: 300, height: 300});
        expect(result1).toEqual({a: false, b: false, c: false, d: false});

        const result2 = parseQuery(query)({width: 450, height: 450});
        expect(result2).toEqual({a: true, b: false, c: false, d: false});

        const result3 = parseQuery(query)({width: 450, height: 550});
        expect(result3).toEqual({a: false, b: false, c: true, d: false});

        const result4 = parseQuery(query)({width: 550, height: 450});
        expect(result4).toEqual({a: false, b: true, c: false, d: false});

        const result5 = parseQuery(query)({width: 550, height: 550});
        expect(result5).toEqual({a: false, b: false, c: false, d: true});

        const result6 = parseQuery(query)({width: 700, height: 700});
        expect(result6).toEqual({a: false, b: false, c: false, d: false});
      });

    });

  });

});
