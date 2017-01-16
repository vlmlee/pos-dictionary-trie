import fs from 'fs';
import path from 'path';
import pos from 'pos';
import readline from 'readline';

/**
* Class representing a Trie
*
* @class {DictionaryTrie} 
*/
export default class DictionaryTrie {

	/**
	* Instantiates empty trie and promises list for return values
	*
	* @constructor
	* @param {trie} trie - Initial trie object built from user input or from file
	* @param {Array} promises - A list of promises set to null.
	*/
	constructor(trie) {
		this.trie = trie;
		this.promises = null;
	}

	/**
	* Trie getter.
	*
	* @returns {trie} trie
	*/
	getTrie() {
		return this.trie;
	}

	/**
	* Method that builds a trie from a text file line by line. It *must* be in single-line format.
	*
	* @param {file} file - Must be a single-line formatted file.
	* @returns {Promise}
	*/
	buildTrieFromFile(file) {
		let self = this;
		const rl = readline.createInterface({
			input: fs.createReadStream(file)
		});

		let timeStart = new Date().getTime();
		console.time('Elapsed time to create trie');
		console.log('Working...');

		return new Promise((resolve, reject) => {
			rl.on('line', line => {
				// This is the pos-js parser that will find the pos and
				// pair the word for later insert into the trie.
				let word = new pos.Lexer().lex(line),
					taggedWord = new pos.Tagger().tag(word);

				let atoms = word[0].split(""),
					root = self.trie;

				atoms.map((char, index) => {
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

			let elapsedTime = new Date().getTime() - timeStart;

			rl.on('close', (err) => {
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
	writeTrieToFile(file) {
		let self = this;
		return new Promise((resolve, reject) => {
			fs.writeFile(file, JSON.stringify(self.trie), (err) => {
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
	* @param {string} word - Word to search for in the trie.
	* @returns {Promise}
	*/
	searchTrie(trie, word) {
		if (!trie) {
			trie = this.trie;
		}
		let self = this;
		self.promises = [];
		if (trie.hasOwnProperty(word[0])) {
			if (typeof trie[word[0]] === 'object' && word.length > 1) {
				self.searchTrie(trie[word[0]], word.slice(1));
			} else {
				self.promises.push(new Promise((resolve, reject) => {
					if (trie[word[0]]) {
						// This retrieves the POS, but you may have to 
						// change slightly depending on your input file
						// to pair with the dictionary words.
						resolve(trie[word[0]][1]);
					} else {
						reject("Word not found");
					}
				}));
			}
		}
		return Promise.all(self.promises);
	}
}