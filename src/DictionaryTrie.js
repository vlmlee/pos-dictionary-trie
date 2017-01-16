import fs from 'fs';
import path from 'path';
import pos from 'pos';
import readline from 'readline';

export default class DictionaryTrie {
	constructor(trie) {
		this.trie = trie;
		this.promises = null;
	}

	getTrie() {
		return this.trie;
	}

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
				let word = new pos.Lexer().lex(line),
					taggedWord = new pos.Tagger().tag(word);

				let atoms = word[0].split(""),
					root = self.trie;

				atoms.map((char, index) => {
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