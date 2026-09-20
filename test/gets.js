var should = require('should');

var getsPath = require.resolve('../lib/gets');
var fs = require('fs');

describe('gets', function() {
  afterEach(function() {
    delete require.cache[getsPath];
  });

  function loadGetsWith(stubs) {
    delete require.cache[getsPath];
    var getsModule = require('../lib/gets');

    var localFs = Object.assign({}, fs, stubs);
    return getsModule.withFs(localFs);
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
    should.strictEqual(gets.isEOF(), true);
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
    should.strictEqual(gets.isEOF(), true);
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
    should.strictEqual(gets.isEOF(), false);
  });

  it('should not treat an empty line as EOF', function() {
    var gets = loadGetsWith({
      readSync: function(fd, buffer) {
        buffer.write('\n');
        return 1;
      }
    });

    var result = gets();
    should.strictEqual(result, '');
    should.strictEqual(gets.isEOF(), false);
  });

  it('should preserve input that does not end with a newline', function() {
    var gets = loadGetsWith({
      readSync: function(fd, buffer) {
        buffer.write('hello');
        return 5;
      }
    });

    var result = gets();
    should.strictEqual(result, 'hello');
    should.strictEqual(gets.isEOF(), false);
  });

  it('should trim a trailing CRLF sequence', function() {
    var gets = loadGetsWith({
      readSync: function(fd, buffer) {
        buffer.write('hello\r\n');
        return 7;
      }
    });

    var result = gets();
    should.strictEqual(result, 'hello');
    should.strictEqual(gets.isEOF(), false);
  });

  it('should reset EOF state after a successful read', function() {
    var reads = 0;
    var gets = loadGetsWith({
      readSync: function(fd, buffer) {
        reads++;
        if (reads === 1) return 0;

        buffer.write('hello\n');
        return 6;
      }
    });

    should.strictEqual(gets(), '');
    should.strictEqual(gets.isEOF(), true);
    should.strictEqual(gets(), 'hello');
    should.strictEqual(gets.isEOF(), false);
  });

  it('should not call openSync (prevents fd leak #46)', function() {
    var openSyncCalled = false;
    var gets = loadGetsWith({
      openSync: function() {
        openSyncCalled = true;
        throw new Error('openSync should not be called');
      },
      readSync: function() {
        return 0;
      }
    });

    var result = gets();
    should.strictEqual(result, '');
    should.strictEqual(openSyncCalled, false, 'openSync is called — fd leak is present');
  });
});
