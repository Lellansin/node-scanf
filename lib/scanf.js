var utils = require('./utils');
var gets = require('./gets');

var input = '';
var stdin_flag = true;

var scanf = module.exports = function(format) {
  var re = new RegExp('[^%]*%[A-Za-z][^%]*', 'g');
  var selector = format.match(re);

  var result, len = selector.length;
  var json_flag = false,
    count = 0,
    stdin_flag = true,
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

scanf.sscanf = function(str, format) {
  var re = new RegExp('[^%]*%[A-Za-z][^%]*', 'g');
  var selector = format.match(re);

  var result, len = selector.length;
  var json_flag = false,
    count = 0,
    keys = Array.prototype.slice.call(arguments, 2);

  input = str;
  stdin_flag = false;

  if (!input.length) {
    return null;
  }

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

var getInput = function(pre, next, match) {
  var result;
  if (!input.length) {
    if (stdin_flag) {
      input = gets();
    } else {
      return null;
    }
  }

  var replace = pre + '('+match+')' + next;

  var m = input.match(new RegExp(replace));
  input = input.replace(new RegExp(replace), '');

  if (!m) {
    return null;
  }
  result = m[1];
  input = input.replace(result, '');

  return result;
};

var getInteger = function(pre, next) {
  var text = getInput(pre, next, '[A-Za-z0-9]+');
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

var getFloat = function(pre, next) {
  var text = getInput(pre, next, '[0-9]+[\.]?[0-9]*');
  return parseFloat(text);
};

var getHex = function(pre, next) {
  var text = getInput(pre, next, '[A-Za-z0-9]+');
  return utils.hex2int(text);
};

var getOctal = function(pre, next) {
  var text = getInput(pre, next, '[A-Za-z0-9]+');
  return utils.octal2int(text);
};

var getString = function(pre, next) {
  var text = getInput(pre, next, '([\\w]|\\S[^\\][^\\ ])+(\\\\[\\w\\ ][\\w]*)*');
  if (/\\/.test(text))
    text = utils.stripslashes(text);
  return text;
};

var getLine = function(pre, next) {
  var text = getInput(pre, next, '[^\n]*');
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
  var pre = !!res2 ? res2[0] : null;
  var next = format.substr(format.indexOf(type) + type.length);

  switch (type) {
    case '%d':
      ret = getInteger(pre, next);
      break;
    case '%s':
      ret = getString(pre, next);
      break;
    case '%S':
      ret = getLine(pre, next);
      break;
    case '%X':
    case '%x':
      ret = getHex(pre, next);
      break;
    case '%O':
    case '%o':
      ret = getOctal(pre, next);
      break;
    case '%f':
      ret = getFloat(pre, next);
      break;
  }
  return ret;
};