'use strict';

var _babelDictionaryTrie = require('../src/babel-DictionaryTrie');

var _babelDictionaryTrie2 = _interopRequireDefault(_babelDictionaryTrie);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Dictionary = new _babelDictionaryTrie2.default({});

var readFromFile = './test-dictionary.txt',
    writeToFile = './test-pos-dictionary.json';

// Dictionary.buildTrieFromFile(readFromFile).then( 
// 	result => console.log(result), 
// 	error => console.log(error)
// );

// Dictionary.writeTrieToFile(writeToFile).then(
// 	result => console.log(result)
// );

Promise.resolve(Dictionary.buildTrieFromFile(readFromFile).then(function (results) {
	return console.log("\n" + results + "\n");
}, function (error) {
	return console.log(error);
})).then(function (results) {
	Dictionary.writeTrieToFile(writeToFile).then(function (results) {
		return console.log(results);
	});
});
