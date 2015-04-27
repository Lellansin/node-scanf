var utils = require('./utils');
var gets = require('./gets');

var input = '';

module.exports = function(format) {
  var re = new RegExp('[^%]*%[A-Za-z]', 'g');
  var selector = format.match(re);

  var result, len = selector.length;
  var json_flag = false, count = 0,
    keys = Array.prototype.slice.call(arguments, 1);

  if (len > 1) {
    if (keys.length > 0) {
      result = {};
      json_flag = true;
    } else {
      result = [];
    }
    selector.forEach(function(val) {
      if (json_flag) {
        result[keys.shift() || count++] = dealType(val);
      } else {
        result.push(dealType(val));
      }
    });
  } else if (len == 1) {
    result = dealType(selector[0]);
  }

  return result;
};

var getInput = function(format, match) {
  var result;
  if (!input.length) {
    input = gets();
  }

  input = input.replace(new RegExp(format), '');
  var m = input.match(match);
  if (!m) {
    return null;
  }
  result = m[0];
  input = input.replace(result, '');

  return result;
};

var getInteger = function(format) {
  var text = getInput(format, new RegExp('[A-Fa-f0-9Xx]+'));
  if (!text) {
    return null;
  } else if (text[0] == '0') {
    if (text[1] == 'x' || text[1] == 'X') {
      return utils.hex2int(text);
    } else {
      return utils.octal2int(text);
    }
  } else {
    return parseInt(text);
  }
};

var getFloat = function(format) {
  var text = getInput(format, new RegExp('[0-9]+[\.]?[0-9]*'));
  return parseFloat(text);
};

var getHex = function(format) {
  var text = getInput(format, new RegExp('[A-Fa-f0-9Xx]+'));
  return utils.hex2int(text);
};

var getOctal = function(format) {
  var text = getInput(format, new RegExp('[A-Fa-f0-9Xx]+'));
  return utils.octal2int(text);
};

var getString = function(format) {
  var text = getInput(format, new RegExp('[^\ ]*(\\\\\ )?[^\ ]+'));
  if (/\\/.test(text))
    text = utils.stripslashes(text);
  return text;
};

var dealType = function(format) {
  var ret;
  var res = format.match(/%[A-Za-z]/);
  var res2 = format.match(/[^%]*/);
  if (!res) {
    return null;
  }
  var type = res[0];
  var match = !!res2 ? res2[0] : null;

  switch (type) {
    case '%d':
      ret = getInteger(match);
      break;
    case '%s':
      ret = getString(match);
      break;
    case '%X':
    case '%x':
      ret = getHex(match);
      break;
    case '%O':
    case '%o':
      ret = getOctal(match);
      break;
    case '%f':
      ret = getFloat(match);
      break;
  }
  return ret;
};
