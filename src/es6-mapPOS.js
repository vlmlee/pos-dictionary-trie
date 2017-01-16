import fs from 'fs';
import path from 'path';
import pos from 'pos';
import readline from 'readline';

export default class DictionaryTrie {
	constructor(trie) {
		this.trie = trie;
	}

	buildTrieFromFile(file) {
		let self = this;
		const rl = readline.createInterface({
			input: fs.createReadStream(file)
		});

		let timeStart = new Date().getTime();
		console.time('Elapsed time to create trie');
		console.log('Working...');

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

		rl.on('close', () => {
			console.log('Time spent mapping each word: ~' + elapsedTime + 'ms');
			console.timeEnd('Elapsed time to create trie');
		});
	}

	writeTrieToFile(file) {
		fs.writeFile(file, JSON.stringify(this.trie), (err) => {
			if (err) {
				return new Error(err.message);
			}
		});
	}

	searchTrie(trie, word) {
		if (!trie) {
			trie = this.trie;
		}

		if (trie.hasOwnProperty(word[0])) {
			if (typeof trie[word[0]] === 'object' && trie[word[0]] !== null) {
				searchTrie(trie[word[0]], word.slice(1));
			} else {
				return trie[word[0]];
			}
		}
	}
}