var ASCII = {
  a: 'a'.charCodeAt(),
  f: 'f'.charCodeAt(),
  A: 'A'.charCodeAt(),
  F: 'F'.charCodeAt(),
  0: '0'.charCodeAt(),
  8: '8'.charCodeAt(),
  9: '9'.charCodeAt(),
};

exports.hex2int = function(str) {
  var ret = 0,
    digit = 0;
  str = str.replace(/^[0O][Xx]/, '');

  for (var i = str.length - 1; i >= 0; i--) {
    var num = intAtHex(str[i], digit++);
    if (num !== null) {
      ret += num;
    } else {
      return null;
    }
  }

  return ret;
};

var intAtHex = function(c, digit) {
  var ret = null;
  var ascii = c.charCodeAt();

  if (ASCII.a <= ascii && ascii <= ASCII.f) {
    ret = ascii - ASCII.a + 10;
  } else if (ASCII.A <= ascii && ascii <= ASCII.F) {
    ret = ascii - ASCII.A + 10;
  } else if (ASCII[0] <= ascii && ascii <= ASCII[9]) {
    ret = ascii - ASCII[0];
  } else {
    return null;
  }

  while (digit--) {
    ret *= 16;
  }
  return ret;
};

exports.octal2int = function(str) {
  str = str.replace(/^0/, '');
  var ret = 0,
    digit = 0;

  for (var i = str.length - 1; i >= 0; i--) {
    var num = intAtOctal(str[i], digit++);
    if (num !== null) {
      ret += num;
    } else {
      return null;
    }
  }

  return ret;
};

var intAtOctal = function(c, digit) {
  var num = null;
  var ascii = c.charCodeAt();

  if (ascii >= ASCII[0] && ascii <= ASCII[8]) {
    num = ascii - ASCII[0];
  } else {
    return null
  }

  while (digit--) {
    num *= 8;
  }
  return num;
};
