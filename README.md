# node-scanf
c like scanf module for node.js

## Installation
```
npm install scanf
```

## Example

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
> Alan
Pleas input your age
> 24
your name [Alan] type: [string]
your age [24] type: [number]
```


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
