import { toPairs, shallowCopyObj } from '../../src/DataStructure';

describe('DataStructure', function () {

  describe('toPairs', function () {

    it('converts object to key value pairs', function () {
      const result = toPairs({a: 1, b: 2});
      expect(result).toEqual([['a', 1], ['b', 2]]);
    });

  });

  describe('shallowCopyObj', function () {

    it('copies provided objects', function () {
      const input = {a: 1, b: 2};
      const result = shallowCopyObj(input);
      expect(result).toEqual({a: 1, b: 2});
      expect(result).not.toBe(input);
    });

    it('returns `null` for `null` input', function () {
      const result = shallowCopyObj(null);
      expect(result).toBeNull();
    });

  });

});
