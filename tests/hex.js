var sscanf = require('../').sscanf;
var should = require('should');

describe('scanf', function() {
  describe('#Hexadecimal', function() {

    it('[%x] \t\tshould get a number 32', function(done) {
      var num = sscanf('20', '%x');
      should.strictEqual(num, 32);
      done();
    });

    it('[%x] \t\tshould get a number 16', function(done) {
      var num = sscanf('10 10', '%x');
      should.strictEqual(num, 16);
      done();
    });

    it('[%x] \t\tshould get a number 16', function(done) {
      var num = sscanf('0xA0', '%x');
      should.strictEqual(num, 160);
      done();
    });

    it('[%x] \t\tinvalid hex number should get a null', function(done) {
      var num = sscanf('0x1G0', '%x');
      should.strictEqual(num, null);
      done();
    });

    it('[a=%x] \t\tshould get a number 161', function(done) {
      var num = sscanf('a=A1 456', 'a=%x');
      should.strictEqual(num, 161);
      done();
    });

    it('[%x%x] \t\tshould get an array with two numbers [16, 32]', function(done) {
      var num = sscanf('10,20', '%x%x');
      should.deepEqual(num, [16, 32]);
      done();
    });

    it('[%x,%x] \tshould get an array with two numbers [16, 32]', function(done) {
      var num = sscanf('0x10,0X20', '%x,%x');
      should.deepEqual(num, [16, 32]);
      done();
    });

    it('[a=%x, b=%x] \tshould get an array with two numbers [16, 32]', function(done) {
      var num = sscanf('a=0x10, b=20', 'a=%x, b=%x');
      should.deepEqual(num, [16, 32]);
      done();
    });
  });
});