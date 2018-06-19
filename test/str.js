var sscanf = require('../').sscanf;
var should = require('should');

describe('scanf', function() {
  describe('#String', function() {

    it('[%s] \t\tshould get a string 123', function(done) {
      var str = sscanf('123', '%s');
      should.strictEqual(str, '123');
      done();
    });

    // Not supported now
    // it('[%s] \t\tshould get a string ф', function(done) {
    //   var str = sscanf('ф', '%s');
    //   should.strictEqual(str, 'ф');
    //   done();
    // });

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

    it('[%s] \t\tshould get a string Barack Hussein Obama', function(done) {
      var str = sscanf('Barack\\ Hussein\\ Obama', '%s');
      should.strictEqual(str, 'Barack Hussein Obama');
      done();
    });

    it('[%S] \t\tshould get a line', function(done) {
      var str = sscanf('hello this is a line~\nThis is the secned line', '%S');
      should.strictEqual(str, 'hello this is a line~');
      done();
    });

    it('[%s] \t\tshould get a string Barack Hussein Obama', function(done) {
      var str = sscanf('Barack\\ Hussein\\ Obama is president of US', '%s');
      should.strictEqual(str, 'Barack Hussein Obama');
      done();
    });

    it('[%s] \t\tshould get a string 12abc', function(done) {
      var str = sscanf(' 12abc', '%s');
      should.strictEqual(str, '12abc');
      done();
    });

    it('[hello %s!] \tshould get a string world', function(done) {
      var str = sscanf('hello world!', 'hello %s!');
      should.strictEqual(str, 'world');
      done();
    });

    it('[hello %s, %s!] should get an array like ["world", "test"]', function(done) {
      var str = sscanf('hello world, test!', 'hello %s, %s!');
      should.deepEqual(str, ['world', 'test']);
      done();
    });

    it('[%s%s] \t\tshould get an array like ["Alan", "6"]', function(done) {
      var str = sscanf('Alan 6', '%s%s');
      should.deepEqual(str, ['Alan', '6']);
      done();
    });

    it('[%s, %s] \tshould get an array like ["Alan", "6"]', function(done) {
      var str = sscanf('Alan, 6', '%s,%s');
      should.deepEqual(str, ['Alan', '6']);
      done();
    });

    it('[%s %f %f] \tshould get an array like ["Alan", 1.1, 2]', function(done) {
      var str = sscanf('Alan 1.1 2', '%s %f %f');
      should.deepEqual(str, ['Alan', 1.1, 2]);
      done();
    });

    it('[%s %f %f] \tshould get an array like ["兴安盟", 122.05, 46.08]', function(done) {
      var str = sscanf('兴安盟 122.05 46.08', '%s %f %f')
      should.deepEqual(str, ['兴安盟', 122.05, 46.08]);
      done();
    });

    it('[a=%s, b=%s] \tshould get an array like ["Alan", "6"]', function(done) {
      var str = sscanf('a=Alan, b=6', 'a=%s, b=%s');
      should.deepEqual(str, ['Alan', '6']);
      done();
    });

    it('[%s %S] \tshould get an array like ["String", null]', function(done) {
      var str = sscanf('/System/Library/CoreServices/powerd.bundle', '%s %S');
      should.deepEqual(str, ['/System/Library/CoreServices/powerd.bundle', null]);
      done();
    });
  });
});
