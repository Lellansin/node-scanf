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

    // starts of '0' and not following with 'o' or 'O' or 'x' or 'X' is decimal for %d %ld %u %lu %llu
    it('[%d] \t\tshould get a integer number 8 from 08', function(done) {
      var num = sscanf('08', '%d');
      should.strictEqual(num, 8);
      done();
    });

    // starts of '0' and not following with 'o' or 'O' or 'x' or 'X' is decimal for %d %ld %u %lu %llu
    it('[%d] \t\tshould get a integer number 9 from 09', function(done) {
      var num = sscanf('09', '%d');
      should.strictEqual(num, 9);
      done();
    });

    // starts of '0' and not following with 'o' or 'O' or 'x' or 'X' is decimal for %d %ld %u %lu %llu
    it('[%d] \t\tshould get a integer number 12 from 012', function(done) {
      var num = sscanf('012', '%d');
      should.strictEqual(num, 12);
      done();
    });

    // starts of '0o' or '0O' is octal for %d %ld %u %lu %llu
    it('[octal=%d] \t\tshould get a integer number 11 from 0o13', function(done) {
      var num = sscanf('0o13', '%d');
      should.strictEqual(num, 11);
      done();
    });

    // starts of '0o' or '0O' is octal for %d %ld %u %lu %llu
    it('[octal=%d] \t\tshould get a integer number 12 from 0O14', function(done) {
      var num = sscanf('0O14', '%d');
      should.strictEqual(num, 12);
      done();
    });

    // starts of '0x' or '0X' is hex for %d %ld %u %lu %llu
    it('[hex=%d] \t\tshould get a integer number 21 from 0x15', function(done) {
      var num = sscanf('0x15', '%d');
      should.strictEqual(num, 21);
      done();
    });

    // starts of '0x' or '0X' is hex for %d %ld %u %lu %llu
    it('[hex=%d] \t\tshould get a integer number 26 from 0X1A', function(done) {
      var num = sscanf('0X1A', '%d');
      should.strictEqual(num, 26);
      done();
    });

  });
});
