var scanf = require('../');

var result = scanf('%d');

if (result.length) {
	for (var i = 0; i < result.length; i++) {
		console.log('result[' + i + '] [%s] type: [%s]', result[i], typeof result[i]);
	}
} else {
	console.log('result [%s] type: [%s]', result, typeof result);
}
