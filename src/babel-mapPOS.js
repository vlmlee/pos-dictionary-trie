'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _pos = require('pos');

var _pos2 = _interopRequireDefault(_pos);

var _readline = require('readline');

var _readline2 = _interopRequireDefault(_readline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DictionaryTrie = function () {
	function DictionaryTrie(trie) {
		_classCallCheck(this, DictionaryTrie);

		this.trie = trie;
	}

	_createClass(DictionaryTrie, [{
		key: 'buildTrieFromFile',
		value: function buildTrieFromFile(file) {
			var self = this;
			var rl = _readline2.default.createInterface({
				input: _fs2.default.createReadStream(file)
			});

			var timeStart = new Date().getTime();
			console.time('Elapsed time to create trie');
			console.log('Working...');

			rl.on('line', function (line) {
				var word = new _pos2.default.Lexer().lex(line),
				    taggedWord = new _pos2.default.Tagger().tag(word);

				var atoms = word[0].split(""),
				    root = self.trie;

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
				console.log('Time spent mapping each word: ~' + elapsedTime + 'ms');
				console.timeEnd('Elapsed time to create trie');
			});
		}
	}, {
		key: 'writeTrieToFile',
		value: function writeTrieToFile(file) {
			_fs2.default.writeFile(file, JSON.stringify(this.trie), function (err) {
				if (err) {
					return new Error(err.message);
				}
			});
		}
	}, {
		key: 'searchTrie',
		value: function (_searchTrie) {
			function searchTrie(_x, _x2) {
				return _searchTrie.apply(this, arguments);
			}

			searchTrie.toString = function () {
				return _searchTrie.toString();
			};

			return searchTrie;
		}(function (trie, word) {
			if (!trie) {
				trie = this.trie;
			}

			if (trie.hasOwnProperty(word[0])) {
				if (_typeof(trie[word[0]]) === 'object' && trie[word[0]] !== null) {
					searchTrie(trie[word[0]], word.slice(1));
				} else {
					return trie[word[0]];
				}
			}
		})
	}]);

	return DictionaryTrie;
}();

exports.default = DictionaryTrie;
