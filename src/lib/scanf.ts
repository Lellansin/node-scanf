import { stripslashes, regslashes, hex2int, octal2int } from './utils';
import { gets } from './gets';

var input = '';
var stdin_flag = true;

enum ScanfTypes {
  string = 'STR',
  hexFloat = 'HEXFLOAT'
}

export let THROW = false;

export function scanf(format: string) {
  var re = new RegExp('[^%]*%[0-9]*[A-Za-z][^%]*', 'g');
  var selector = format.match(re);

  if (selector === null) {
    throw new Error('Unable to parse scanf selector.');
  }

  var result,
    len = selector.length;
  var json_flag = false,
    count = 0,
    keys = Array.prototype.slice.call(arguments, 1);

  if (!(this as any)?.sscanf) {
    // clear sscanf cache
    if (!stdin_flag) input = '';
    stdin_flag = true;
  }

  if (keys.length > 0) {
    result = {};
    json_flag = true;
  } else if (len > 1) {
    result = [];
  } else {
    return dealType(selector[0]);
  }

  selector.forEach(function(val) {
    if (json_flag) {
      result[keys.shift() || count++] = dealType(val);
    } else {
      result.push(dealType(val));
    }
  });

  return result;
}

export function sscanf(str: string, ...args: [string]) {
  if (typeof str !== 'string' || !str.length) {
    return null;
  }

  // clear scanf cache
  if (stdin_flag) input = '';

  input = str;
  stdin_flag = false;

  return scanf.apply({ sscanf: true }, args);
}

var getInput = function(
  pre: string,
  next: string,
  match: string,
  type?: ScanfTypes
): string | null | Array<string> {
  var result;
  if (!input.length || input === '\r') {
    if (stdin_flag) {
      input = gets();
    } else {
      return null;
    }
  }

  // match format
  var replace = '(' + match + ')';
  var tmp = input;

  // while scan string, replace before and after
  if (type === ScanfTypes.string && next.trim().length > 0) {
    var before_macth = regslashes(pre);
    var after_match = regslashes(next) + '[\\w\\W]*';
    if (before_macth.length) {
      tmp = tmp.replace(new RegExp(before_macth), '');
    }
    tmp = tmp.replace(new RegExp(after_match), '');
  } else {
    replace = regslashes(pre) + replace;
  }

  var m = tmp.match(new RegExp(replace));

  if (!m) {
    // todo strip match
    return null;
  }
  result = m[1];

  // strip match content
  input = input
    .substr(input.indexOf(result))
    .replace(result, '')
    .replace(next, '');

  if (type === ScanfTypes.hexFloat) {
    return m;
  }
  return result;
};

var getInteger = function(pre: string, next: string) {
  var text = getInput(pre, next, '[-]?[A-Za-z0-9]+');
  if (!text || typeof text !== 'string') {
    return null;
  }
  if (text.length > 2) {
    if (text[0] === '0') {
      if (text[1].toLowerCase() === 'x') {
        return hex2int(text);
      }
      // parse Integer (%d %ld %u %lu %llu) should be precise for octal
      if (text[1].toLowerCase() === 'o') {
        return octal2int(text);
      }
    }
  }
  return parseInt(text);
};

var getFloat = function(pre: string, next: string) {
  var text = getInput(pre, next, '[-]?[0-9]+[.]?[0-9]*');
  if (!text || typeof text !== 'string') {
    return null;
  }
  return parseFloat(text);
};

var getHexFloat = function(pre: string, next: string) {
  var hfParams = getInput(
    pre,
    next,
    '^([+-]?)0x([0-9a-f]*)(.[0-9a-f]*)?(p[+-]?[0-9a-f]+)?',
    ScanfTypes.hexFloat
  );
  if (!hfParams || !Array.isArray(hfParams)) {
    return null;
  }
  var sign = hfParams[2];
  var sint = hfParams[3];
  var spoint = hfParams[4];
  var sexp = hfParams[5] || 'p0';
  // We glue the integer and point parts together when parsing
  var integer = parseInt(
    sign + sint + (spoint !== undefined ? spoint.slice(1) : ''),
    16
  );
  // The actual exponent is the specified exponent minus the de..heximal points we shifted away
  var exponent =
    parseInt(sexp.slice(1), 16) -
    4 * (spoint !== undefined ? spoint.length - 1 : 0);
  return integer * Math.pow(2, exponent);
};

var getHex = function(pre: string, next: string) {
  var text = getInput(pre, next, '[A-Za-z0-9]+');
  if (!text || typeof text !== 'string') {
    return null;
  }
  return hex2int(text);
};

var getOctal = function(pre: string, next: string) {
  var text = getInput(pre, next, '[A-Za-z0-9]+');
  if (!text || typeof text !== 'string') {
    return null;
  }
  return octal2int(text);
};

var getString = function(pre: string, next: string) {
  var text = getInput(
    pre,
    next,
    // Match repeat string
    '(' +
    '[\\w\\]=-]' +
    '|' +
    '\\S+[^\\ ]' + // Match string witch \SPC like 'Alan\ Bob'
      ')' +
      // Match after
      '+(\\\\[\\w\\ ][\\w\\:]*)*',
    ScanfTypes.string
  );
  if (!text || typeof text !== 'string') {
    return null;
  }
  if (/\\/.test(text)) text = stripslashes(text);
  return text;
};

var getLine = function(pre: string, next: string) {
  var text = getInput(pre, next, '[^\n\r]*');
  if (!text || typeof text !== 'string') {
    return null;
  }
  if (/\\/.test(text)) text = stripslashes(text);
  return text;
};

var dealType = function(format: string) {
  var ret;
  var res = format.match(/%(0[1-9]+)?[A-Za-z]+/);
  var res2 = format.match(/[^%]*/);
  if (!res) {
    // DID NOT throw error here to stay compatible with old version
    console.warn('Invalid scanf selector: [%s]', format);
    return null;
  }

  var type = res[0].replace(res[1], '');
  var pre = !!res2 ? res2[0] : '';
  var next = format.substr(format.indexOf(type) + type.length);

  switch (type) {
    case '%d':
    case '%ld':
    case '%llu':
    case '%lu':
    case '%u':
      ret = getInteger(pre, next);
      break;
    case '%c': // TODO getChar
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
    case '%a':
      ret = getHexFloat(pre, next);
      break;
    case '%f':
      ret = getFloat(pre, next);
      break;

    default:
      throw new Error('Unknown type "' + type + '"');
  }
  return ret;
};
