var assert = require('assert');
var gets = require('../lib/gets');

describe('gets function', function() {
  it('should export a function', function() {
    assert.equal(typeof gets, 'function');
  });

  // Note: gets() requires stdin input which is hard to test in mocha
  // These tests are minimal to acknowledge the module structure
  // Full coverage would require process.stdin manipulation or exec testing
});
