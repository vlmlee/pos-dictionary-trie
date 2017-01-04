'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _pos = require('pos');

var _pos2 = _interopRequireDefault(_pos);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var args = process.argv.slice(2);

var words = new _pos2.default.Lexer().lex(args[0]);
var taggedWords = new _pos2.default.Tagger().tag(words);
var transformation = [];

for (var i in taggedWords) {
	var tag = taggedWords[i][1];
	transformation.push(tag);
}

console.log(transformation.join(" "));

// pipe to output
