var scanf = require('../');
var sscanf = scanf.sscanf;
var should = require('should');

describe('scanf', function() {
  describe('#error handling', function() {
    afterEach(function() {
      scanf.throw = true;
    });

    it('should throw on unknown format specifier', function() {
      (function() {
        sscanf('123', '%q');
      }).should.throw('Unknown type "%q"');
    });

    it('should return NaN for invalid hexadecimal when throw flag enabled', function() {
      var result = sscanf('0xfg', '%d');
      Number.isNaN(result).should.be.true();
    });

    it('should return null for invalid hexadecimal when throw flag disabled', function() {
      scanf.throw = false;
      var result = sscanf('0xfg', '%d');
      should.strictEqual(result, null);
    });

    it('should return null for invalid octal when throw flag disabled', function() {
      scanf.throw = false;
      var result = sscanf('0o89', '%o');
      should.strictEqual(result, null);
    });
  });
});
