var sscanf = require('../').sscanf;
var should = require('should');

describe('scanf', function() {
  describe('#character', function() {
    it("[%c] \t\tshould get character: 'f'", function(done) {
      var char = sscanf('f', '%c');
      should.strictEqual(char, 'f');
      done();
    });

    it("[%c %c %c] \t\tshould get multiple characters: ['a', 'b', 'c']", function(done) {
      var chars = sscanf('a b c', '%c %c %c');
      should.deepEqual(chars, ['a', 'b', 'c']);
      done();
    });

    it("[%c] \t\tshould get numeral as character: '7'", function(done) {
      var char = sscanf('7', '%c');
      should.strictEqual(char, '7');
      done();
    });

    it("[%c] \t\tshould handle non-alphanumeric: '?'", function(done) {
      var char = sscanf('?', '%c');
      should.strictEqual(char, '?');
      done();
    });

    it("[%c] \t\tshould get first character of string: 'r'", function(done) {
      var char = sscanf('rtybanana', '%c');
      should.strictEqual(char, 'r');
      done();
    });

    it("[%c%c%c] \t\tshould get three characters of string: 'test'", function(done) {
      var chars = sscanf('test', '%c%c%c');
      should.deepEqual(chars, ['t', 'e', 's']);
      done();
    });
  });
});
