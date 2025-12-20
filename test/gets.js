var fs = require('fs');
var should = require('should');

var getsPath = require.resolve('../lib/gets');
var originalOpenSync = fs.openSync;
var originalReadSync = fs.readSync;

describe('gets', function() {
  afterEach(function() {
    delete require.cache[getsPath];
    fs.openSync = originalOpenSync;
    fs.readSync = originalReadSync;
  });

  function loadGetsWith(stubs) {
    Object.assign(fs, stubs);
    delete require.cache[getsPath];
    return require('../lib/gets');
  }

  it('should return empty string when no bytes are read', function() {
    var gets = loadGetsWith({
      openSync: function() {
        return 0;
      },
      readSync: function() {
        return 0;
      }
    });

    var result = gets();
    should.strictEqual(result, '');
  });

  it('should return empty string when EOF is reached', function() {
    var gets = loadGetsWith({
      openSync: function() {
        return 0;
      },
      readSync: function() {
        var err = new Error('EOF');
        err.code = 'EOF';
        throw err;
      }
    });

    var result = gets();
    should.strictEqual(result, '');
  });

  it('should read and trim newline-terminated input', function() {
    var gets = loadGetsWith({
      openSync: function() {
        return 0;
      },
      readSync: function(fd, buffer) {
        buffer.write('hello\n');
        return 6;
      }
    });

    var result = gets();
    should.strictEqual(result, 'hello');
  });
});
