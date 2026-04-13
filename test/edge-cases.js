var assert = require('assert');
var scanf = require('../index');
var sscanf = require('../index').sscanf;

describe('Edge Cases and Error Handling', function() {
  describe('Unknown type handling', function() {
    it('should throw error for unknown type %g', function() {
      assert.throws(function() {
        sscanf('123', '%g');
      }, /Unknown type/);
    });

    it('should throw error for unknown type %e', function() {
      assert.throws(function() {
        sscanf('3.14', '%e');
      }, /Unknown type/);
    });

    it('should throw error for unknown type %z', function() {
      assert.throws(function() {
        sscanf('test', '%z');
      }, /Unknown type/);
    });
  });

  describe('Invalid format handling', function() {
    it('should throw error for invalid format with no valid selectors', function() {
      assert.throws(function() {
        sscanf('test', 'invalid');
      }, /Unable to parse scanf selector/);
    });

    it('should handle format with mixed valid and invalid parts', function() {
      var result = sscanf('123', 'value:%d extra');
      assert.equal(result, 123);
    });
  });

  describe('Empty and null inputs', function() {
    it('should return null for empty string with %d', function() {
      var result = sscanf('', '%d');
      assert.equal(result, null);
    });

    it('should return null for empty string with %s', function() {
      var result = sscanf('', '%s');
      assert.equal(result, null);
    });

    it('should return null for empty string with %f', function() {
      var result = sscanf('', '%f');
      assert.equal(result, null);
    });

    it('should return null for empty string with %x', function() {
      var result = sscanf('', '%x');
      assert.equal(result, null);
    });

    it('should return null for empty string with %o', function() {
      var result = sscanf('', '%o');
      assert.equal(result, null);
    });

    it('should return null for empty string with %a', function() {
      var result = sscanf('', '%a');
      assert.equal(result, null);
    });
  });

  describe('Whitespace handling', function() {
    it('should handle multiple spaces between values', function() {
      var result = sscanf('123   456', '%d %d');
      assert.deepEqual(result, [123, 456]);
    });

    it('should handle tabs between values', function() {
      var result = sscanf('123\t456', '%d %d');
      assert.deepEqual(result, [123, 456]);
    });

    it('should handle newlines between values', function() {
      var result = sscanf('123\n456', '%d %d');
      assert.deepEqual(result, [123, 456]);
    });

    it('should handle mixed whitespace', function() {
      var result = sscanf('123 \t\n456', '%d %d');
      assert.deepEqual(result, [123, 456]);
    });
  });

  describe('Zero and negative values', function() {
    it('should handle zero', function() {
      var result = sscanf('0', '%d');
      assert.equal(result, 0);
    });

    it('should handle negative zero', function() {
      var result = sscanf('-0', '%d');
      assert.equal(result, 0);
    });

    it('should handle negative float', function() {
      var result = sscanf('-3.14', '%f');
      assert.equal(result, -3.14);
    });

    it('should handle very large positive number', function() {
      var result = sscanf('999999999', '%d');
      assert.equal(result, 999999999);
    });

    it('should handle very large negative number', function() {
      var result = sscanf('-999999999', '%d');
      assert.equal(result, -999999999);
    });
  });

  describe('Mixed format types', function() {
    it('should handle mix of integer and string', function() {
      var result = sscanf('123 abc', '%d %s');
      assert.deepEqual(result, [123, 'abc']);
    });

    it('should handle mix of float and integer', function() {
      var result = sscanf('3.14 42', '%f %d');
      assert.deepEqual(result, [3.14, 42]);
    });

    it('should handle mix of hex and octal', function() {
      var result = sscanf('ff 77', '%x %o');
      assert.deepEqual(result, [255, 63]);
    });
  });

  describe('Special characters in strings', function() {
    it('should handle underscores', function() {
      var result = sscanf('hello_world', '%s');
      assert.equal(result, 'hello_world');
    });

    it('should handle hyphens', function() {
      var result = sscanf('hello-world', '%s');
      assert.equal(result, 'hello-world');
    });

    it('should handle dots', function() {
      var result = sscanf('hello.world', '%s');
      assert.equal(result, 'hello.world');
    });

    it('should handle plus signs', function() {
      var result = sscanf('+123', '%s');
      assert.equal(result, '+123');
    });
  });

  describe('String edge cases', function() {
    it('should handle single character string', function() {
      var result = sscanf('a', '%s');
      assert.equal(result, 'a');
    });

    it('should handle empty prefix', function() {
      var result = sscanf('123', '%d');
      assert.equal(result, 123);
    });

    it('should handle empty suffix', function() {
      var result = sscanf('123', '%d');
      assert.equal(result, 123);
    });
  });

  describe('Hexadecimal edge cases', function() {
    it('should handle uppercase hex', function() {
      var result = sscanf('FF', '%x');
      assert.equal(result, 255);
    });

    it('should handle mixed case hex', function() {
      var result = sscanf('FfAa', '%x');
      assert.equal(result, 65450);
    });

    it('should handle hex with prefix', function() {
      var result = sscanf('0xFF', '%d');
      assert.equal(result, 255);
    });
  });

  describe('Octal edge cases', function() {
    it('should handle octal with 0 prefix', function() {
      var result = sscanf('077', '%d');
      assert.equal(result, 63);
    });

    it('should handle octal with 0o prefix', function() {
      var result = sscanf('0o77', '%d');
      assert.equal(result, 63);
    });

    it('should handle octal with 0O prefix', function() {
      var result = sscanf('0O77', '%d');
      assert.equal(result, 63);
    });
  });

  describe('Float edge cases', function() {
    it('should handle float without decimal part', function() {
      var result = sscanf('123.', '%f');
      assert.equal(result, 123);
    });

    it('should handle float starting with decimal', function() {
      var result = sscanf('.5', '%f');
      assert.equal(result, 0.5);
    });

    it('should handle scientific notation string', function() {
      var result = sscanf('1e5', '%s');
      assert.equal(result, '1e5');
    });
  });

  describe('Character edge cases', function() {
    it('should handle space as character', function() {
      var result = sscanf(' ', '%c');
      assert.equal(result, ' ');
    });

    it('should handle newline as character', function() {
      var result = sscanf('\n', '%c');
      assert.equal(result, '\n');
    });

    it('should handle tab as character', function() {
      var result = sscanf('\t', '%c');
      assert.equal(result, '\t');
    });
  });
});
