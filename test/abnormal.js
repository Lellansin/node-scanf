var sscanf = require('../').sscanf;
var should = require('should');

describe('scanf', function() {
  describe('#invalidator', function() {
    it('should get null while sscanf undeinfed string', function() {
      const res = sscanf(undefined);
      should.strictEqual(res, null);
    });

    it('should get null while sscanf empty string', function() {
      const res = sscanf('');
      should.strictEqual(res, null);
    });
  });
});
