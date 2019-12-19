var scanf = require('../');
var sscanf = require('../').sscanf;
var should = require('should');

describe('scanf', function() {
  describe('#invalidator', function() {
    it('should get error while scanf undeinfed string', function() {
      try {
        scanf('', '');
      } catch (err) {
        should.strictEqual(err.message, 'Unable to parse scanf selector.');
        return;
      }
      throw new Error('it could not come here');
    });

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
