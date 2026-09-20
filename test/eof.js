var childProcess = require('child_process');
var path = require('path');
var should = require('should');

describe('scanf', function() {
  describe('#isEOF', function() {
    var modulePath = path.resolve(__dirname, '..');

    function runWithInput(input, statements) {
      var script =
        'var scanf = require(' + JSON.stringify(modulePath) + ');' + statements;
      var result = childProcess.spawnSync(process.execPath, ['-e', script], {
        input: input
      });

      if (result.status !== 0) {
        throw new Error(result.stderr.toString());
      }

      return JSON.parse(result.stdout.toString());
    }

    it('should be false before stdin is read', function() {
      var result = runWithInput(
        '',
        'process.stdout.write(JSON.stringify(scanf.isEOF()));'
      );

      should.strictEqual(result, false);
    });

    it('should become true after reading past complete input', function() {
      var result = runWithInput(
        '1 2 3\n',
        'var values = scanf("%d %d %d");' +
          'var afterValues = scanf.isEOF();' +
          'var eofValues = scanf("%d %d %d");' +
          'process.stdout.write(JSON.stringify({' +
          'values: values,' +
          'afterValues: afterValues,' +
          'eofValues: eofValues,' +
          'afterEOF: scanf.isEOF()' +
          '}));'
      );

      should.deepEqual(result, {
        values: [1, 2, 3],
        afterValues: false,
        eofValues: [null, null, null],
        afterEOF: true
      });
    });

    it('should preserve the final value when input has no trailing newline', function() {
      var result = runWithInput(
        '1 2 3',
        'var values = scanf("%d %d %d");' +
          'process.stdout.write(JSON.stringify({' +
          'values: values,' +
          'eof: scanf.isEOF()' +
          '}));'
      );

      should.deepEqual(result, {
        values: [1, 2, 3],
        eof: false
      });
    });

    it('should distinguish a format mismatch from EOF', function() {
      var result = runWithInput(
        'not-a-record\n',
        'var value = scanf("value=%d");' +
          'process.stdout.write(JSON.stringify({' +
          'value: value,' +
          'eof: scanf.isEOF()' +
          '}));'
      );

      should.deepEqual(result, {
        value: null,
        eof: false
      });
    });

    it('should report EOF reached while reading an incomplete record', function() {
      var result = runWithInput(
        '1 2\n',
        'var values = scanf("%d %d %d");' +
          'process.stdout.write(JSON.stringify({' +
          'values: values,' +
          'eof: scanf.isEOF()' +
          '}));'
      );

      should.deepEqual(result, {
        values: [1, 2, null],
        eof: true
      });
    });

    it('should remain true across repeated reads after EOF', function() {
      var result = runWithInput(
        '',
        'scanf("%d");' +
          'var first = scanf.isEOF();' +
          'scanf("%d");' +
          'process.stdout.write(JSON.stringify({' +
          'first: first,' +
          'second: scanf.isEOF()' +
          '}));'
      );

      should.deepEqual(result, {
        first: true,
        second: true
      });
    });

    it('should not report stdin EOF after sscanf', function() {
      var result = runWithInput(
        '',
        'scanf("%d");' +
          'var before = scanf.isEOF();' +
          'var value = scanf.sscanf("42", "%d");' +
          'process.stdout.write(JSON.stringify({' +
          'before: before,' +
          'value: value,' +
          'after: scanf.isEOF()' +
          '}));'
      );

      should.deepEqual(result, {
        before: true,
        value: 42,
        after: false
      });
    });
  });
});
