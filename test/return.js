var sscanf = require('../').sscanf;
var should = require('should');

describe('scanf', function() {
  describe('#Return type', function() {
    it('[%d] \t\t should return directly', function(done) {
      var number = sscanf('12', '%d');
      should.equal(number, 12);
      done();
    });

    it('[%s%d%d] \t should return an array', function(done) {
      var result = sscanf('Alan 24 180', '%s%d%d');
      result.should.be.instanceof(Array).and.have.lengthOf(3);
      should.deepEqual(result, ['Alan', 24, 180]);
      done();
    });

    it('[%d %f %s %x %o] should return a json', function(done) {
      var result = sscanf('12 3.1415926 hello 1F 10', '%d %f %s %x %o', 'integer', 'float', 'string', 'hex', 'octal');
      should.deepEqual(result, {
        integer: 12,
        float: 3.1415926,
        string: 'hello',
        hex: 31,
        octal: 8
      });
      done();
    });

    it('[%d %s %s %s %s %S] should return a json', function(done) {
      var result = sscanf('   14   ??  Ss     0:07.59 /usr/sbin/securityd -i -j -k -l', '%d %s %s %s %s %S', 'pid', 'tty', 'stat', 'time', 'exec', 'param');
      should.deepEqual(result, {
        pid: 14,
        tty: '??',
        stat: 'Ss',
        time: '0:07.59',
        exec: '/usr/sbin/securityd',
        param: '-i -j -k -l'
      });
      done();
    });

    it('a[%x]', function(done) {
      var str = "a[1A]";
      var result = sscanf(str, 'a[%x]', 'address');
      should.deepEqual(result, {
        address: 26
      });
      done();
    });

    it('a(%s)', function(done) {
      var str = 'a(hello\\ world)';
      var result = sscanf(str, 'a(%s)', 'text');
      should.deepEqual(result, {
        text: 'hello world'
      });
      done();
    });

    it('|%s|%s|%s', function(done) {
      var str = '|test|hello|string';
      var result = sscanf(str, '|%s|%s|%s');
      should.deepEqual(result, ['test', 'hello', 'string']);
      done();
    });

    it('|%s|%s|%s|sla|%s|%d', function(done) {
      var str = '|Server1|CTRL_SLA|Intranet|sla|2015-06-15\\ 16:25:28|100';
      var result = sscanf(str, '|%s|%s|%s|sla|%s|%d');
      should.deepEqual(result, ['Server1', 'CTRL_SLA', 'Intranet', '2015-06-15 16:25:28', 100]);
      done();
    });
  });
});
