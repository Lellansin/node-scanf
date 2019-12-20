import { THROW } from './scanf';

var ASCII = {
  a: 'a'.charCodeAt(0),
  f: 'f'.charCodeAt(0),
  A: 'A'.charCodeAt(0),
  F: 'F'.charCodeAt(0),
  0: '0'.charCodeAt(0),
  7: '7'.charCodeAt(0),
  9: '9'.charCodeAt(0)
};

export function hex2int(str: string) {
  str = str.replace(/^[0Oo][Xx]/, '');
  var ret = 0,
    digit = 0;

  for (var i = str.length - 1; i >= 0; i--) {
    var num = intAtHex(str[i], digit++);
    if (num !== null) {
      ret += num;
    } else {
      if (THROW) {
        throw new Error('Invalid hex ' + str);
      }
      return null;
    }
  }

  return ret;
}

export function intAtHex(c: string, digit: number) {
  var ret = null;
  var ascii = c.charCodeAt(0);

  if (ASCII.a <= ascii && ascii <= ASCII.f) {
    ret = ascii - ASCII.a + 10;
  } else if (ASCII.A <= ascii && ascii <= ASCII.F) {
    ret = ascii - ASCII.A + 10;
  } else if (ASCII[0] <= ascii && ascii <= ASCII[9]) {
    ret = ascii - ASCII[0];
  } else {
    if (THROW) {
      throw new Error('Invalid ascii [' + c + ']');
    }
    return null;
  }

  while (digit--) {
    ret *= 16;
  }
  return ret;
}

export function octal2int(str: string) {
  str = str.replace(/^0[Oo]?/, '');
  var ret = 0,
    digit = 0;

  for (var i = str.length - 1; i >= 0; i--) {
    var num = intAtOctal(str[i], digit++);
    if (num !== null) {
      ret += num;
    } else {
      if (THROW) {
        throw new Error('Invalid octal ' + str);
      }
      return null;
    }
  }

  return ret;
}

var intAtOctal = function(c: string, digit: number) {
  var num = null;
  var ascii = c.charCodeAt(0);

  if (ascii >= ASCII[0] && ascii <= ASCII[7]) {
    num = ascii - ASCII[0];
  } else {
    if (THROW) {
      throw new Error('Invalid char to Octal [' + c + ']');
    }
    return null;
  }

  while (digit--) {
    num *= 8;
  }
  return num;
};

export function regslashes(pre: string) {
  return pre
    .replace(/\[/g, '\\[')
    .replace(/\]/g, '\\]')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
    .replace(/\|/g, '\\|');
}

export function stripslashes(str: string) {
  return str.replace(/\\([\sA-Za-z\\]|[0-7]{1,3})/g, function(str, c) {
    switch (c) {
      case '\\':
        return '\\';
      case '0':
        return '\u0000';
      default:
        if (/^\w$/.test(c)) {
          return getSpecialChar(c);
        } else if (/^\s$/.test(c)) {
          return c;
        } else if (/([0-7]{1,3})/.test(c)) {
          return getASCIIChar(c);
        }
        return str;
    }
  });
}

var getASCIIChar = function(str: string): string | null {
  var num = octal2int(str);
  if (!num) {
    return null;
  }
  return String.fromCharCode(num);
};

var getSpecialChar = function(letter: string) {
  switch (letter.toLowerCase()) {
    case 'b':
      return '\b';
    case 'f':
      return '\f';
    case 'n':
      return '\n';
    case 'r':
      return '\r';
    case 't':
      return '\t';
    case 'v':
      return '\v';
    default:
      return letter;
  }
};
