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
      should.deepEqual(num, [ 1, 2, 3, 2.5, 3.6, 8 ]);
      done();
    });

    it('[%d%d%d a=%f, b=%f] \tshould get an array with two float [2.5, -3.6]', function(done) {
      var num = sscanf('1 2 3 a=2.5, b=-3.6 8', '%d%d%d a=%f, b=%f %d');
      should.deepEqual(num, [ 1, 2, 3, 2.5, -3.6, 8 ]);
      done();
    });
  });
});
