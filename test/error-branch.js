var assert = require('assert');
var scanf = require('../index');
var sscanf = require('../index').sscanf;

describe('Error branches and throw cases', function() {
  describe('Invalid hex number in getInteger', function() {
    it('should return NaN for invalid hex with 0x prefix and non-hex chars', function() {
      assert(Number.isNaN(sscanf('0xGH', '%d')));
    });

    it('should return NaN for invalid octal with 0o prefix and non-octal chars', function() {
      assert(Number.isNaN(sscanf('0o89', '%d')));
    });
  });

  describe('Invalid selector warning', function() {
    it('should not throw for invalid selector and return null', function() {
      // Capture console.warn
      var originalWarn = console.warn;
      var warnings = [];
      console.warn = function(msg) {
        warnings.push(msg);
      };

      var result = sscanf('test', 'invalid%%d');
      assert.equal(result, null);
      assert(warnings.length > 0);
      assert(warnings[0].includes('Invalid scanf selector'));

      console.warn = originalWarn;
    });

    it('should handle selector with missing type specifier', function() {
      var originalWarn = console.warn;
      var warnings = [];
      console.warn = function(msg) {
        warnings.push(msg);
      };

      var result = sscanf('123', '%');
      assert.equal(result, null);

      console.warn = originalWarn;
    });
  });

  describe('throw flag behavior', function() {
    var originalThrow;

    beforeEach(function() {
      originalThrow = scanf.throw;
    });

    afterEach(function() {
      scanf.throw = originalThrow;
    });

    it('should return NaN for invalid hex when throw is true', function() {
      scanf.throw = true;
      assert(Number.isNaN(sscanf('0xZZ', '%x')));
    });

    it('should return null for invalid hex when throw is false', function() {
      scanf.throw = false;
      assert.equal(sscanf('0xZZ', '%x'), null);
    });

    it('should return NaN for invalid octal when throw is true', function() {
      scanf.throw = true;
      assert(Number.isNaN(sscanf('0o88', '%o')));
    });

    it('should return null for invalid octal when throw is false', function() {
      scanf.throw = false;
      assert.equal(sscanf('0o88', '%o'), null);
    });

    it('should return NaN for invalid hex in integer parsing when throw is true', function() {
      scanf.throw = true;
      assert(Number.isNaN(sscanf('0xGH', '%d')));
    });

    it('should return null for invalid hex in integer parsing when throw is false', function() {
      scanf.throw = false;
      assert.equal(sscanf('0xGH', '%d'), null);
    });

    it('should return NaN for invalid octal in integer parsing when throw is true', function() {
      scanf.throw = true;
      assert(Number.isNaN(sscanf('0o89', '%d')));
    });

    it('should return null for invalid octal in integer parsing when throw is false', function() {
      scanf.throw = false;
      assert.equal(sscanf('0o89', '%d'), null);
    });
  });

  describe('Special character handling in strings', function() {
    it('should handle escaped characters in strings', function() {
      var result = sscanf('hello\\nworld', '%s');
      assert.equal(result, 'hello\nworld');
    });

    it('should handle escaped spaces in strings', function() {
      var result = sscanf('hello\\ world', '%s');
      assert.equal(result, 'hello world');
    });

    it('should handle escaped tabs in strings', function() {
      var result = sscanf('hello\\tworld', '%s');
      assert.equal(result, 'hello\tworld');
    });
  });

  describe('Hex float edge cases', function() {
    it('should handle negative hex float', function() {
      var result = sscanf('-0xa.a', '%a');
      assert.equal(result, -10.625);
    });

    it('should handle hex float with negative exponent', function() {
      var result = sscanf('0xa.ap-2', '%a');
      assert.equal(result, 2.65625);
    });

    it('should handle hex float without fraction', function() {
      var result = sscanf('0xap0', '%a');
      assert.equal(result, 10);
    });
  });

  describe('Array and object return types', function() {
    it('should return array when multiple values with no keys', function() {
      var result = sscanf('123 456 789', '%d %d %d');
      assert(Array.isArray(result));
      assert.deepEqual(result, [123, 456, 789]);
    });

    it('should return array when keys provided but values match', function() {
      var result = sscanf('123 456', 'a=%d b=%d');
      assert(Array.isArray(result));
      assert.deepEqual(result, [123, 456]);
    });

    it('should return array when values > keys', function() {
      var result = sscanf('123 456 789', 'a=%d b=%d');
      assert(Array.isArray(result));
      assert.equal(result[0], 123);
      assert.equal(result[1], 456);
      assert.equal(result[2], 789);
    });

    it('should return direct value for single format', function() {
      var result = sscanf('123', '%d');
      assert.equal(result, 123);
    });
  });

  describe('Line input (%S) edge cases', function() {
    it('should handle empty line', function() {
      var result = sscanf('', '%S');
      assert.equal(result, null);
    });

    it('should handle line with spaces', function() {
      var result = sscanf('hello world', '%S');
      assert.equal(result, 'hello world');
    });

    it('should handle line with tabs', function() {
      var result = sscanf('hello\tworld', '%S');
      assert.equal(result, 'hello\tworld');
    });

    it('should handle line ending with newline', function() {
      var result = sscanf('hello\n', '%S');
      assert.equal(result, 'hello');
    });
  });

  describe('Character (%c) edge cases', function() {
    it('should handle digit as character', function() {
      var result = sscanf('9', '%c');
      assert.equal(result, '9');
    });
  });

  describe('Format with no prefix/suffix', function() {
    it('should parse pure %d', function() {
      var result = sscanf('123', '%d');
      assert.equal(result, 123);
    });

    it('should parse pure %s', function() {
      var result = sscanf('hello', '%s');
      assert.equal(result, 'hello');
    });

    it('should parse pure %x', function() {
      var result = sscanf('ff', '%x');
      assert.equal(result, 255);
    });

    it('should parse pure %o', function() {
      var result = sscanf('77', '%o');
      assert.equal(result, 63);
    });
  });
});
