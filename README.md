# node-scanf [![NPM Version](https://badge.fury.io/js/scanf.svg)](http://badge.fury.io/js/scanf) [![Build Status](https://travis-ci.org/Lellansin/node-scanf.png?branch=master)](https://travis-ci.org/Lellansin/node-scanf) [![Coveralls Status](https://img.shields.io/coveralls/Lellansin/node-scanf/master.svg)](https://coveralls.io/github/Lellansin/node-scanf)

Do you want simplely shell script input which have formats and sync return?

Do you want a `sscanf` like function to parse format strings?

`scanf` is a C like scanf/sscanf module for node.js which can help you with that.

## Documentation

*  [`Example`](#Example)
  *  [`Quickly start`](#quickly-start)
  *  [`C like format`](#c-like-format)
*  [`Return`](#return)
  *  [`Directly return`](#directly-return)
  *  [`Array return`](#array-return)
  *  [`Json return`](#json-return)
*  [`sscanf`](#sscanf)

## Installation
```
npm install scanf
```

## Format support now

* `%d` - integer
* `%f` - float
* `%s` - string
* `%S` - string of line
* `%x` - hex
* `%o` - octal

## Example

### Quickly start
```javascript
var scanf = require('scanf');

console.log('Pleas input your name');
var name = scanf('%s');

console.log('Pleas input your age');
var age = scanf('%d');

console.log('your name [%s] type: [%s]', name, typeof name);
console.log('your age [%s] type: [%s]', age, typeof age);
```

REPL

```
Pleas input your name
> Barack\ Obama
Pleas input your age
> 24
your name [Barack Obama] type: [string]
your age [24] type: [number]
```


### C like format
```javascript
var scanf = require('scanf');

console.log('when are you born? \(Year-month-day\)');
var date = scanf('%d-%d-%d');

console.log('your birthday [%s]', date);
```

REPL

```
when are you born? (Year-month-day)
> 1990-01-01
your birthday [1990,1,1]
```

## Return

### Directly return

```javascript
var scanf = require('scanf');

var number = scanf('%d');

console.log('number', number);
```

REPL

```
>> 2015    
number 2015
```

### Array return

```javascript
var scanf = require('scanf');

var result = scanf('%s%d%d');

console.log('result', result);
```

REPL

```
>> Alan 24 180        
result [ 'Alan', 24, 180 ]
```

### Json return

```javascript
var scanf = require('scanf');

var result = scanf('%d %f %s %x %o', 'integer', 'float', 'string', 'hex', 'octal');

console.log('result', result);
```

REPL

```
>> 12 3.1415926 hello 1F 10    
result { 
  integer: 12,
  float: 3.1415926,
  string: 'hello',
  hex: 31,
  octal: 8 
}
```

## sscanf

REPL

```javascript
>> var sscanf = require('scanf').sscanf;
undefined
>> sscanf('12 34', '%d');
12
>> sscanf('Alan 20 180', '%s%d%d')
[ 'Alan', 20, 180 ]
>> sscanf('12 3.1415926 hello', '%d %f %s', 'month', 'pi', 'world');
{ month: 12, pi: 3.1415926, world: 'hello' }
>> sscanf('   14   ??  Ss     0:07.59 /usr/sbin/securityd -i', '%d %s %s %s %s %s', 'pid', 'tty', 'stat', 'time', 'exec', 'param');
{ pid: 14,
  tty: '??',
  stat: 'Ss',
  time: '0:07.59',
  exec: '/usr/sbin/securityd',
  param: '-i' }
```

you can see the ./tests files for more detail.

If there are some formats not support or go broken, you can contact author with email `lellansin@gmail.com`.

# Contributors

  - [lellansin](https://github.com/Lellansin)
  - [piranna](https://github.com/piranna)
  - [samchon](https://github.com/samchon)

# License

  MIT
