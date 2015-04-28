var sscanf = require('../').sscanf;
var should = require('should');

describe('scanf', function() {
  describe('#String', function() {

    it('[%s] \t\tshould get a string 123', function(done) {
      var str = sscanf('123', '%s');
      should.strictEqual(str, '123');
      done();
    });

    it('[%s] \t\tshould get a string 3.14', function(done) {
      var str = sscanf('3.14 is pi', '%s');
      should.strictEqual(str, '3.14');
      done();
    });

    it('[%s] \t\tshould get a Barack', function(done) {
      var str = sscanf('Barack Obama', '%s');
      should.strictEqual(str, 'Barack');
      done();
    });

    it('[%s] \t\tshould get a string Barack Obama', function(done) {
      var str = sscanf('Barack\\ Obama', '%s');
      should.strictEqual(str, 'Barack Obama');
      done();
    });

    // 
    // todo
    // 
    it('[%s] \t\tshould get a string Barack Hussein Obama', function(done) {
      var str = sscanf('Barack\\ Hussein\\ Obama', '%s');
      should.strictEqual(str, 'Barack Hussein Obama');
      done();
    });

    it('[%s] \t\tshould get a string Barack F Obama', function(done) {
      var str = sscanf('Barack\\ F\\ Obama', '%s');
      should.strictEqual(str, 'Barack Obama');
      done();
    });

    it('[%s] \t\tshould get a string 12abc', function(done) {
      var str = sscanf(' 12abc', '%s');
      should.strictEqual(str, '12abc');
      done();
    });

    it('[hello %s] \tshould get a string world', function(done) {
      var str = sscanf('hello world', 'hello %s');
      should.strictEqual(str, 'world');
      done();
    });

    it('[%s%s] \t\tshould get an array with two strings [Alan, \'6\']', function(done) {
      var str = sscanf('Alan 6', '%s%s');
      should.deepEqual(str, ['Alan', '6']);
      done();
    });

    // 
    // todo
    // 
    it('[%s,%s] \tshould get an array with two strings [\'Alan\', \'6\']', function(done) {
      var str = sscanf('Alan,6', '%s,%s');
      should.deepEqual(str, ['Alan', '6']);
      done();
    });

    it('[a=%s, b=%s] \tshould get an array with two strings [\'Alan\', \'6\']', function(done) {
      var str = sscanf('a=Alan, b=6', 'a=%s, b=%s');
      should.deepEqual(str, ['Alan', '6']);
      done();
    });
  });
});