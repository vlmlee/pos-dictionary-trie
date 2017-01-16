'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _pos = require('pos');

var _pos2 = _interopRequireDefault(_pos);

var _readline = require('readline');

var _readline2 = _interopRequireDefault(_readline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rl = _readline2.default.createInterface({
	input: _fs2.default.createReadStream(_path2.default.join(__dirname, '../lib/3of6all.txt'))
});

var trie = {};

var timeStart = new Date().getTime();
console.time('Elapsed time to create trie');

rl.on('line', function (line) {
	var word = new _pos2.default.Lexer().lex(line),
	    taggedWord = new _pos2.default.Tagger().tag(word);

	console.log(line);
	var atoms = word[0].split(""),
	    root = trie;

	atoms.map(function (char, index) {
		if (atoms.length !== 1 && index === atoms.length - 1) {
			root[char] = taggedWord[0];
		} else if (root[char]) {
			root = root[char];
		} else {
			root[char] = {};
			root = root[char];
		}
	});
});

var elapsedTime = new Date().getTime() - timeStart;

rl.on('close', function () {
	_fs2.default.writeFile('./lib/dictionary.json', JSON.stringify(trie), function (err) {
		if (err) {
			return new Error(err.message);
		}
	});
	console.log('Time spent mapping each word: ~' + elapsedTime + 'ms');
	console.timeEnd('Elapsed time to create trie');
});
