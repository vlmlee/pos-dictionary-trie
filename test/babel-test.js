'use strict';

var _babelDictionaryTrie = require('../src/babel-DictionaryTrie');

var _babelDictionaryTrie2 = _interopRequireDefault(_babelDictionaryTrie);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _chai = require('chai');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var readFromFile = _path2.default.join(__dirname, './test-dictionary.txt'),
    writeToFile = _path2.default.join(__dirname, './test-pos-dictionary.json');

describe('Dictionary Trie', function () {
	it('should build trie from constructor', function () {
		var Dictionary = new _babelDictionaryTrie2.default({ a: { b: { s: ['abs', 'NN'] } } });
		(0, _chai.expect)(Dictionary.getTrie()).to.eql({ a: { b: { s: ['abs', 'NN'] } } });
	});

	it('should build trie from file', function () {
		var Dictionary = new _babelDictionaryTrie2.default({});
		Dictionary.buildTrieFromFile(readFromFile).then(function (result) {
			(0, _chai.expect)(result).to.eql('{"k":{"u":{"d":{"o":{"s":["kudos","NNS"]}},"r":{"t":{"a":["kurta","NN"]}}},"v":{"e":{"t":{"c":{"h":["kvetch","NN"]}}}}},"K":{"u":{"r":{"d":["Kurd","NNP"]},"w":{"a":{"i":{"t":{"i":["Kuwaiti","JJ"]}}}}}}}');
		});
	});

	it('should write trie to file', function (done) {
		var Dictionary = new _babelDictionaryTrie2.default({});

		Promise.resolve(Dictionary.buildTrieFromFile(readFromFile)).then(function () {
			Dictionary.writeTrieToFile(writeToFile);
		});

		_fs2.default.readFile(writeToFile, 'utf8', function (err, data) {
			(0, _chai.expect)(JSON.stringify(Dictionary.getTrie())).to.eql(data);
			done();
		});
	});

	it('should find pos of a search term', function () {
		var Dictionary = new _babelDictionaryTrie2.default({ a: { b: { s: ['abs', 'NN'] } } });
		Dictionary.searchTrie(Dictionary.trie, 'abs').then(function (result) {
			(0, _chai.expect)(result).to.eql(["NN"]);
		});
	});

	it('should find pos of multiple search terms', function () {
		var Dictionary = new _babelDictionaryTrie2.default({ "k": { "u": { "d": { "o": { "s": ["kudos", "NNS"] } }, "r": { "t": { "a": ["kurta", "NN"] } } }, "v": { "e": { "t": { "c": { "h": ["kvetch", "NN"] } } } } }, "K": { "u": { "r": { "d": ["Kurd", "NNP"] }, "w": { "a": { "i": { "t": { "i": ["Kuwaiti", "JJ"] } } } } } } });

		Promise.all([Dictionary.searchTrie(Dictionary.trie, 'Kurd'), Dictionary.searchTrie(Dictionary.trie, 'kvetch'), Dictionary.searchTrie(Dictionary.trie, 'kurta')]).then(function (result) {
			(0, _chai.expect)(result).to.eql([["NNP"], ["NN"], ["NN"]]);
		});
	});

	it('should return an empty array if word is not found', function () {
		var Dictionary = new _babelDictionaryTrie2.default({});
		Promise.resolve(Dictionary.buildTrieFromFile(readFromFile)).then(function () {
			Dictionary.searchTrie(Dictionary.trie, 'kq').then(function (result) {
				(0, _chai.expect)(result).to.eql([]);
			});
		});
	});
});
