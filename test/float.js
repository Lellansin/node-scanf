var sscanf = require('../').sscanf;
var should = require('should');

describe('scanf', function() {
  describe('#float', function() {
    it('[%f] \t\tshould get a float number 3.14', function(done) {
      var num = sscanf('3.14', '%f');
      should.strictEqual(num, 3.14);
      done();
    });

    it('[%f] \t\tshould get a float number -3.14', function(done) {
      var num = sscanf('-3.14', '%f');
      should.strictEqual(num, -3.14);
      done();
    });

    it('[%f] \t\tshould get a float number 3', function(done) {
      var num = sscanf('3', '%f');
      should.strictEqual(num, 3);
      done();
    });

    it('[a=%f] \t\tshould get a float number 3.14', function(done) {
      var num = sscanf('a=3.14 456', 'a=%f');
      should.strictEqual(num, 3.14);
      done();
    });

    it('[a=%f] \t\tshould get a float number -3.14', function(done) {
      var num = sscanf('a=-3.14 456', 'a=%f');
      should.strictEqual(num, -3.14);
      done();
    });

    it('[%f%f] \t\tshould get an array with two float [2.5, 3.6]', function(done) {
      var num = sscanf('2.5,3.6', '%f%f');
      should.deepEqual(num, [2.5, 3.6]);
      done();
    });

    it('[%f,%f] \tshould get an array with two float [2.5, 3.6]', function(done) {
      var num = sscanf('2.5,3.6', '%f,%f');
      should.deepEqual(num, [2.5, 3.6]);
      done();
    });

    it('[%f,%f] \tshould get an array with two float [2.5, -3.6]', function(done) {
      var num = sscanf('2.5,-3.6', '%f,%f');
      should.deepEqual(num, [2.5, -3.6]);
      done();
    });

    it('[a=%f, b=%f] \tshould get an array with two float [2.5, 3.6]', function(done) {
      var num = sscanf('a=2.5, b=3.6', 'a=%f, b=%f');
      should.deepEqual(num, [2.5, 3.6]);
      done();
    });

    it('[a=%f, b=%f] \tshould get an array with two float [2.5, -3.6]', function(done) {
      var num = sscanf('a=2.5, b=-3.6', 'a=%f, b=%f');
      should.deepEqual(num, [2.5, -3.6]);
      done();
    });

    it('[%d%d%d a=%f, b=%f] \tshould get an array with two float [2.5, 3.6]', function(done) {
      var num = sscanf('1 2 3 a=2.5, b=3.6 8', '%d%d%d a=%f, b=%f %d');
      should.deepEqual(num, [1, 2, 3, 2.5, 3.6, 8]);
      done();
    });

    it('[%d%d%d a=%f, b=%f] \tshould get an array with two float [2.5, -3.6]', function(done) {
      var num = sscanf('1 2 3 a=2.5, b=-3.6 8', '%d%d%d a=%f, b=%f %d');
      should.deepEqual(num, [1, 2, 3, 2.5, -3.6, 8]);
      done();
    });
  });

  describe('#hex float', function() {
    it('[%a] \t\tshould get a float number 0x1', function(done) {
      var num = sscanf('0x1', '%a');
      should.strictEqual(num, 1.0);
      done();
    });

    it('[%a] \t\tshould get a float number 0xa', function(done) {
      var num = sscanf('0xa', '%a');
      should.strictEqual(num, 10);
      done();
    });

    it('[%a] \t\tshould get a float number 0x.a', function(done) {
      var num = sscanf('0x.a', '%a');
      should.strictEqual(num, 0.625);
      done();
    });

    it('[%a] \t\tshould get a float number 0xa.a', function(done) {
      var num = sscanf('0xa.ap0', '%a');
      should.strictEqual(num, 10.625);
      done();
    });

    it('[%a] \t\tshould get a float number 0xa.ap0', function(done) {
      var num = sscanf('0xa.ap0', '%a');
      should.strictEqual(num, 10.625);
      done();
    });

    it('[%a] \t\tshould get a float number 0xa.ap2', function(done) {
      var num = sscanf('0xa.ap2', '%a');
      should.strictEqual(num, 42.5);
      done();
    });
  });
});
