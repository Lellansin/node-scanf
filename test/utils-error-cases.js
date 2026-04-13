var assert = require('assert');
var utils = require('../lib/utils');

describe('utils error handling', function() {
  describe('hex2int error cases', function() {
    it('should handle uppercase prefix', function() {
      assert.equal(utils.hex2int('0XFF'), 255);
    });

    it('should handle mixed case prefix', function() {
      assert.equal(utils.hex2int('0Xff'), 255);
    });

    it('should handle lowercase prefix', function() {
      assert.equal(utils.hex2int('0xff'), 255);
    });

    it('should handle O instead of 0 prefix', function() {
      assert.equal(utils.hex2int('Oxff'), 255);
    });

    it('should throw for o prefix (invalid)', function() {
      assert.throws(function() {
        utils.hex2int('off');
      }, /Invalid ascii/);
    });

    it('should throw on invalid character G', function() {
      assert.throws(function() {
        utils.hex2int('G');
      }, /Invalid ascii \[G\]/);
    });

    it('should throw on invalid character Z', function() {
      assert.throws(function() {
        utils.hex2int('Z');
      }, /Invalid ascii \[Z\]/);
    });

    it('should throw on invalid character with valid prefix', function() {
      assert.throws(function() {
        utils.hex2int('0xG');
      }, /Invalid ascii/);
    });

    it('should handle multiple invalid characters', function() {
      assert.throws(function() {
        utils.hex2int('GHI');
      }, /Invalid ascii/);
    });
  });

  describe('octal2int error cases', function() {
    it('should handle uppercase O prefix', function() {
      assert.equal(utils.octal2int('0O77'), 63);
    });

    it('should handle lowercase o prefix', function() {
      assert.equal(utils.octal2int('0o77'), 63);
    });

    it('should handle no prefix', function() {
      assert.equal(utils.octal2int('77'), 63);
    });

    it('should throw on invalid character 8', function() {
      assert.throws(function() {
        utils.octal2int('8');
      }, /Invalid char to Octal \[8\]/);
    });

    it('should throw on invalid character 9', function() {
      assert.throws(function() {
        utils.octal2int('9');
      }, /Invalid char to Octal \[9\]/);
    });

    it('should throw on invalid character A', function() {
      assert.throws(function() {
        utils.octal2int('A');
      }, /Invalid char to Octal \[A\]/);
    });

    it('should throw on invalid character in middle of string', function() {
      assert.throws(function() {
        utils.octal2int('123845');
      }, /Invalid char to Octal/);
    });
  });

  describe('regslashes function', function() {
    it('should escape square brackets', function() {
      assert.equal(utils.regslashes('[test]'), '\\[test\\]');
    });

    it('should escape parentheses', function() {
      assert.equal(utils.regslashes('(test)'), '\\(test\\)');
    });

    it('should escape pipes', function() {
      assert.equal(utils.regslashes('test|value'), 'test\\|value');
    });

    it('should escape multiple special characters', function() {
      assert.equal(utils.regslashes('[(test|value)]'), '\\[\\(test\\|value\\)\\]');
    });

    it('should handle empty string', function() {
      assert.equal(utils.regslashes(''), '');
    });

    it('should handle string without special characters', function() {
      assert.equal(utils.regslashes('hello'), 'hello');
    });
  });

  describe('stripslashes special cases', function() {
    it('should handle backslash followed by letter', function() {
      assert.equal(utils.stripslashes('\\n'), '\n');
      assert.equal(utils.stripslashes('\\t'), '\t');
      assert.equal(utils.stripslashes('\\r'), '\r');
      assert.equal(utils.stripslashes('\\b'), '\b');
      assert.equal(utils.stripslashes('\\f'), '\f');
      assert.equal(utils.stripslashes('\\v'), '\v');
    });

    it('should handle backslash followed by uppercase letter (same as lowercase)', function() {
      // \\N, \\T etc. are treated like \\n, \\t
      assert.equal(utils.stripslashes('\\N'), '\n');
      assert.equal(utils.stripslashes('\\T'), '\t');
    });

    it('should handle octal escape sequences', function() {
      assert.equal(utils.stripslashes('\\101'), 'A');
      assert.equal(utils.stripslashes('\\065'), '5');
    });

    it('should handle null escape', function() {
      assert.equal(utils.stripslashes('\\0'), '\u0000');
    });

    it('should handle space escape', function() {
      assert.equal(utils.stripslashes('\\ '), ' ');
    });

    it('should handle tab escape', function() {
      assert.equal(utils.stripslashes('\\\t'), '\t');
    });

    it('should handle multiple escapes', function() {
      assert.equal(utils.stripslashes('\\n\\t\\r'), '\n\t\r');
    });

    it('should handle escape in middle of string', function() {
      assert.equal(utils.stripslashes('hello\\nworld'), 'hello\nworld');
    });
  });
});
