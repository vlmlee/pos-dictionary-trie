const trie = require('./index.js');
const fs = require('fs');

let Trie = new trie.DictionaryTrie({a: {b: ["ab", "NN"]}});
console.log(newTrie.getTrie()); // => {a: {b: ["ab", "NN"]}}

let anotherTrie = new trie.DictionaryTrie({}),
	fileToRead = path.join(__dirname, './yourFileToRead.txt');

anotherTrie.buildTrieFromFile(fileToRead) // File must be in single-lined format
	.then(result => console.log(result)); // => Returns your trie in a JSON string


let fileToWriteInto = path.join(__dirname, './yourFileToWriteInto.json');

Promise.resolve(
	anotherTrie.buildTrieFromFile(fileToRead)
).then(() => {
	anotherTrie.writeToFile(fileToWriteInto).then(
		(result) => console.log(result), // => success message 
		(error) => console.log(error) // => error message
	);
});

anotherTrie.searchTrie(anotherTrie.getTrie(), 'word').then( 
	(result) => console.log(result), // => part of speech of the word
	(error) => console.log(error) // => Will return "word not found" if not
);

let t = anotherTrie.getTrie();

Promise.all([
	anotherTrie.searchTrie(t, 'walk'),
	anotherTrie.searchTrie(t, 'shoes'),
	anotherTrie.searchTrie(t, 'readily'),
]).then(result => {
	console.log(result) // => returns all three in an array ['VB', 'NN', 'RB']
});

