var utils = require('../lib/utils');
var should = require('should');

describe('scanf', function() {
  describe('#utils', function() {
    describe('#stripslashes', function() {
      it('should strip slashes', function(done) {
        var str = 'hello\\ world';
        var r = utils.stripslashes(str);
        should.equal(r, 'hello world');
        should.equal(r, 'hello world');
        done();
      });

      it('should strip slashes', function(done) {
        var str = 'hello\\ world \\101';
        var r = utils.stripslashes(str);
        should.equal(r, 'hello world A');
        done();
      });

      it('should strip slashes', function(done) {
        var str = 'he\\bllo\\ world \\101';
        var r = utils.stripslashes(str);
        should.equal(r, 'he\bllo world A');
        done();
      });

    it('should strip slashes', function(done) {
      var str = 'h\\be\\tl\\\\lo\\ world\\100';
      var r = utils.stripslashes(str);
      should.equal(r, 'h\be\tl\\lo world@');
      done();
    });

    it('should decode carriage return and vertical tab escape sequences', function(done) {
      var str = 'line1\\rline2\\vline3';
      var r = utils.stripslashes(str);
      should.equal(r, 'line1\rline2\vline3');
      done();
    });

    it('should return literal letters for unknown escape sequences', function(done) {
      var str = 'hello\\z';
      var r = utils.stripslashes(str);
      should.equal(r, 'helloz');
      done();
    });
  });
});
});
