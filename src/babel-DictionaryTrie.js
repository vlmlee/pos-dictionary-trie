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

/**
* Class representing a Trie
*
* @class {DictionaryTrie} 
*/
var DictionaryTrie = function () {

	/**
 * Instantiates empty trie and promises list for return values
 *
 * @constructor
 * @param {trie} trie - Initial trie object built from user input or from file
 * @param {Array} promises - A list of promises set to null.
 */
	function DictionaryTrie(trie) {
		_classCallCheck(this, DictionaryTrie);

		this.trie = trie;
		this.promises = null;
	}

	/**
 * Trie getter.
 *
 * @returns {trie} trie
 */


	_createClass(DictionaryTrie, [{
		key: 'getTrie',
		value: function getTrie() {
			return this.trie;
		}

		/**
  * Method that builds a trie from a text file line by line. It *must* be in single-line format.
  *
  * @param {file} file - Must be a single-line formatted file.
  * @returns {Promise}
  */

	}, {
		key: 'buildTrieFromFile',
		value: function buildTrieFromFile(file) {
			var self = this;
			var rl = _readline2.default.createInterface({
				input: _fs2.default.createReadStream(file)
			});

			var timeStart = new Date().getTime();
			console.time('Elapsed time to create trie');
			console.log('Working...');

			return new Promise(function (resolve, reject) {
				rl.on('line', function (line) {
					// This is the pos-js parser that will find the pos and
					// pair the word for later insert into the trie.
					var word = new _pos2.default.Lexer().lex(line),
					    taggedWord = new _pos2.default.Tagger().tag(word);

					var atoms = word[0].split(""),
					    root = self.trie;

					atoms.map(function (char, index) {
						if (atoms.length !== 1 && index === atoms.length - 1) {
							// add dictionary definitions or what have you here
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

				rl.on('close', function (err) {
					if (err) {
						reject(err.message);
					}
					console.log('Time spent mapping each word: ~' + elapsedTime + 'ms');
					console.timeEnd('Elapsed time to create trie');
					resolve(JSON.stringify(self.trie));
				});
			});
		}

		/**
  * Method that writes constructed trie into a file in json string format.
  *
  * @param {file} file - The file to write into.
  * @returns {Promise}
  */

	}, {
		key: 'writeTrieToFile',
		value: function writeTrieToFile(file) {
			var self = this;
			return new Promise(function (resolve, reject) {
				_fs2.default.writeFile(file, JSON.stringify(self.trie), function (err) {
					if (err) {
						reject(err.message);
					}
					resolve("Successfully created Trie to file.");
				});
			});
		}

		/**
  * Method that searches the trie for a particular word and returns its part of speech.
  *
  * @param {trie} trie - Trie object to search for word. Defaults to this.trie.
  * @param {string} w - Word to search for in the trie.
  * @returns {Promise}
  */

	}, {
		key: 'searchTrie',
		value: function searchTrie(trie, w) {
			if (!trie) {
				trie = this.trie;
			}
			var self = this,
			    word = w;
			self.promises = [];
			while (word) {
				if (_typeof(trie[word[0]]) === 'object' && word.length > 1) {
					trie = trie[word[0]];
					word = word.slice(1);
				} else if (word.length === 1) {
					self.promises.push(new Promise(function (resolve, reject) {
						if (trie[word[0]]) {
							resolve(trie[word[0]][1]);
						} else {
							reject('Word not found.');
						}
					}));
					word = word.slice(1);
				}
			}
			return Promise.all(self.promises);
		}
	}]);

	return DictionaryTrie;
}();

exports.default = DictionaryTrie;
