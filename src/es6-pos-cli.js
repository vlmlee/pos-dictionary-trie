import fs from 'fs';
import pos from 'pos';

const args = process.argv.slice(2);

let words = new pos.Lexer().lex(args[0]);
let taggedWords = new pos.Tagger().tag(words);
let transformation = [];

for (var i in taggedWords) {
	var tag = taggedWords[i][1];
	transformation.push(tag);
}

console.log(transformation.join(" "));

// pipe to output