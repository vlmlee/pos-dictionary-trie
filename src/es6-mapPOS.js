import fs from 'fs';
import path from 'path';
import pos from 'pos';
import readline from 'readline';

const rl = readline.createInterface({
	input: fs.createReadStream(path.join(__dirname, '../lib/conjunctions.txt'))
});

console.time('map');

rl.on('line', line => {
	let word = new pos.Lexer().lex(line);
	let taggedWord = new pos.Tagger().tag(word);
	console.log(taggedWord[0]);
});

console.timeEnd('map'); // ~0.06ms per line, * 82000 = 4.92 secs