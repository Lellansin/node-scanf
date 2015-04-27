# node-scanf
C like scanf module for node.js.

If there are some formats not support or go broken, you can contact author with email `lellansin@gmail.com`.

## Installation
```
npm install scanf
```

## Format support now

* `%d` - integer
* `%f` - float
* `%s` - string
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

Output

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

Output

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

Output

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

Output

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

Output

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
