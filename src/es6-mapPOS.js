import fs from 'fs';
import path from 'path';
import pos from 'pos';
import readline from 'readline';

const rl = readline.createInterface({
	input: fs.createReadStream(path.join(__dirname, '../lib/3of6all.txt'))
});

let trie = {};

let timeStart = new Date().getTime();
console.time('Elapsed time to create trie');

rl.on('line', line => {
	let word = new pos.Lexer().lex(line),
		taggedWord = new pos.Tagger().tag(word);

	console.log(line);
	let atoms = word[0].split(""),
		root = trie;

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
	fs.writeFile('./lib/dictionary.json', JSON.stringify(trie), (err) => {
		if (err) {
			return new Error(err.message);
		}
	});
	console.log('Time spent mapping each word: ~' + elapsedTime + 'ms');
	console.timeEnd('Elapsed time to create trie');
});