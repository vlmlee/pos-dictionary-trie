'use strict';

var _babelDictionaryTrie = require('../src/babel-DictionaryTrie');

var _babelDictionaryTrie2 = _interopRequireDefault(_babelDictionaryTrie);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var assert = require('chai').assert;

var Dictionary = new _babelDictionaryTrie2.default({});

var readFromFile = './test-dictionary.txt',
    writeToFile = './test-pos-dictionary.json';

Promise.resolve(Dictionary.buildTrieFromFile(readFromFile).then(function (results) {
	return console.log("\n" + results + "\n");
}, function (error) {
	return console.log(error);
})).then(function () {
	Dictionary.writeTrieToFile(writeToFile).then(function (results) {
		return console.log(results);
	});
}).then(function () {
	Dictionary.searchTrie(Dictionary.trie, 'kudos').then(function (results) {
		return console.log(results);
	});
}).then(function () {
	Dictionary.searchTrie(Dictionary.trie, 'kurta').then(function (results) {
		return console.log(results);
	});
}).then(function () {
	Dictionary.searchTrie(Dictionary.trie, 'kung').then(function (results) {
		return console.log(results);
	});
}).then(function () {
	Dictionary.searchTrie(Dictionary.trie, 'kq').then(function (results) {
		return console.log(results);
	});
});
