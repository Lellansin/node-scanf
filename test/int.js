var sscanf = require('../').sscanf;
var should = require('should');

describe('scanf', function() {
  describe('#integer', function() {

    it('[%d] \t\tshould get a integer number 123', function(done) {
      var num = sscanf('123', '%d');
      should.strictEqual(num, 123);
      done();
    });

    it('[%d] \t\tshould get a integer number -123', function(done) {
      var num = sscanf('-123', '%d');
      should.strictEqual(num, -123);
      done();
    });

    it('[%d] \t\tshould get a integer number 3', function(done) {
      var num = sscanf('3.14', '%d');
      should.strictEqual(num, 3);
      done();
    });

    it('[%d] \t\tshould get a integer number -3', function(done) {
      var num = sscanf('-3.14', '%d');
      should.strictEqual(num, -3);
      done();
    });

    it('[%ld] \t\tshould get a integer number 3', function(done) {
      var num = sscanf('3.14', '%ld');
      should.strictEqual(num, 3);
      done();
    });

    it('[%ld] \t\tshould get a integer number -3', function(done) {
      var num = sscanf('-3.14', '%ld');
      should.strictEqual(num, -3);
      done();
    });

    it('[%lu] \t\tshould get a integer number 3', function(done) {
      var num = sscanf('3.14', '%lu');
      should.strictEqual(num, 3);
      done();
    });

    it('[%lu] \t\tshould get a integer number -3', function(done) {
      var num = sscanf('-3.14', '%lu');
      should.strictEqual(num, -3);
      done();
    });

    it('[%llu] \t\tshould get a integer number 3', function(done) {
      var num = sscanf('3.14', '%llu');
      should.strictEqual(num, 3);
      done();
    });

    it('[%llu] \t\tshould get a integer number -3', function(done) {
      var num = sscanf('-3.14', '%llu');
      should.strictEqual(num, -3);
      done();
    });

    it('[%u] \t\tshould get a integer number 3', function(done) {
      var num = sscanf('3.14', '%u');
      should.strictEqual(num, 3);
      done();
    });

    it('[%u] \t\tshould get a integer number -3', function(done) {
      var num = sscanf('-3.14', '%u');
      should.strictEqual(num, -3);
      done();
    });

    it('[%d%d] \t\tshould get [NaN, 3]', function(done) {
      var num = sscanf('a 3.14', '%d%d');
      should.deepEqual(num, [NaN, 3]);
      done();
    });

    it('[%d%d] \t\tshould get [NaN, -3]', function(done) {
      var num = sscanf('a -3.14', '%d%d');
      should.deepEqual(num, [NaN, -3]);
      done();
    });

    it('[%d%u%d] \t\tshould get [NaN, 3, 14]', function(done) {
      var num = sscanf('a 3.14', '%d%u%d');
      should.deepEqual(num, [NaN, 3, 14]);
      done();
    });

    it('[%d%u%d] \t\tshould get [NaN, -3, 1]', function(done) {
      var num = sscanf('a -3.14', '%d%u%d');
      should.deepEqual(num, [NaN, -3, 14]);
      done();
    });

    it('[%d] \t\tinvalid input not a number', function(done) {
      var num = sscanf('a', '%d');
      num.should.be.eql(NaN);
      done();
    });

    it('[%d] \t\tshould get a number 12', function(done) {
      var num = sscanf('12abc', '%d');
      should.strictEqual(num, 12);
      done();
    });

    it('[a=%d] \t\tshould get a integer number 123', function(done) {
      var num = sscanf('a=123 456', 'a=%d');
      should.strictEqual(num, 123);
      done();
    });

    it('[a=%d] \t\tshould get a integer number -123', function(done) {
      var num = sscanf('a=-123 456', 'a=%d');
      should.strictEqual(num, -123);
      done();
    });

    it('[hex=%d] \tshould get a integer number from hex', function(done) {
      var num = sscanf('hex=0x10', 'hex=%d');
      should.strictEqual(num, 16);
      done();
    });

    it('[octal=%d] \tshould get a integer number from octal', function(done) {
      var num = sscanf('octal=010', 'octal=%d');
      should.strictEqual(num, 8);
      done();
    });

    it('[%d%d] \t\tshould get an array with two integers [5, 6]', function(done) {
      var num = sscanf('5,6', '%d%d');
      should.deepEqual(num, [5, 6]);
      done();
    });

    it('[%d%d] \t\tshould get an array with two integers [5, -6]', function(done) {
      var num = sscanf('5,-6', '%d%d');
      should.deepEqual(num, [5, -6]);
      done();
    });

    it('[%d%d] \t\tshould get an array with two integers [5, null]', function(done) {
      var num = sscanf('5', '%d%d');
      should.deepEqual(num, [5, null]);
      done();
    });

    it('[%d,%d] \tshould get an array with two integers [5, 6]', function(done) {
      var num = sscanf('5,6', '%d,%d');
      should.deepEqual(num, [5, 6]);
      done();
    });

    it('[%d,%d] \tshould get an array with two integers [5, null]', function(done) {
      var num = sscanf('5,', '%d,%d');
      should.deepEqual(num, [5, null]);
      done();
    });

    it('[%d,%d] \tshould get an array with two integers [-5, null]', function(done) {
      var num = sscanf('-5,', '%d,%d');
      should.deepEqual(num, [-5, null]);
      done();
    });

    it('[a=%d, b=%d] \tshould get an array with two integer [5, 6]', function(done) {
      var num = sscanf('a=5, b=6', 'a=%d, b=%d');
      should.deepEqual(num, [5, 6]);
      done();
    });

    it('[a=%d, b=%d] \tshould get an array with two integer [5, null]', function(done) {
      var num = sscanf('a=5', 'a=%d, b=%d');
      should.deepEqual(num, [5, null]);
      done();
    });

    it('[a=%d, b=%d] \tshould get an array with two integer [-5, null]', function(done) {
      var num = sscanf('a=-5', 'a=%d, b=%d');
      should.deepEqual(num, [-5, null]);
      done();
    });
  });
});
