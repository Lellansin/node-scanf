var sscanf = require('../').sscanf;
var should = require('should');

describe('scanf', function() {
  describe('#Octal', function() {

    it('[%o] \t\tshould get a number 16', function(done) {
      var num = sscanf('20', '%o');
      should.strictEqual(num, 16);
      done();
    });

    it('[%o] \t\tshould get a number 8', function(done) {
      var num = sscanf('10 10', '%o');
      should.strictEqual(num, 8);
      done();
    });

    it('[%o] \t\tshould get a number 8', function(done) {
      var num = sscanf('010', '%o');
      should.strictEqual(num, 8);
      done();
    });

    it('[%o] \t\tinvalid hex number should get a null', function(done) {
      var num = sscanf('0190', '%o');
      should.strictEqual(num, null);
      done();
    });

    it('[a=%o] \t\tshould get a number 9', function(done) {
      var num = sscanf('a=11 456', 'a=%o');
      should.strictEqual(num, 9);
      done();
    });

    it('[%o%o] \t\tshould get an array with two numbers [8, 16]', function(done) {
      var num = sscanf('10,20', '%o%o');
      should.deepEqual(num, [8, 16]);
      done();
    });

    it('[%o,%o] \tshould get an array with two numbers [8, 16]', function(done) {
      var num = sscanf('010,020', '%o,%o');
      should.deepEqual(num, [8, 16]);
      done();
    });

    it('[a=%o, b=%o] \tshould get an array with two numbers [8, 16]', function(done) {
      var num = sscanf('a=010, b=20', 'a=%o, b=%o');
      should.deepEqual(num, [8, 16]);
      done();
    });
  });
});