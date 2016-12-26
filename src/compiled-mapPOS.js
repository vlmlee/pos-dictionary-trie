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
	input: _fs2.default.createReadStream(_path2.default.join(__dirname, '../lib/conjunctions.txt'))
});

rl.on('line', function (line) {
	var word = new _pos2.default.Lexer().lex(line);
	var taggedWord = new _pos2.default.Tagger().tag(word);
	console.log(taggedWord[0]);
});
