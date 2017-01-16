import fs from 'fs';
import pos from 'pos';

const args = process.argv.slice(2);

let words = new pos.Lexer().lex(args[0]),
	taggedWords = new pos.Tagger().tag(words),
	transformation = [];

for (var i in taggedWords) {
	var tag = taggedWords[i][1];
	transformation.push(tag);
}

console.log(transformation.join(" "));

// pipe to output