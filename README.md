# Parts of Speech Dictionary Trie

## About

This is a module that builds a dictionary trie from user input or from a file. It matches
a word with a *part of speech*. For example, in this format:

{"k":{"u":{"d":{"o":{"s":["kudos","NNS"]}},"r":{"t":{"a":["kurta","NN"]}}},"v":{"e":{"t":{"c":{"h":["kvetch","NN"]}}}}},"K":{"u":{"r":{"d":["Kurd","NNP"]},"w":{"a":{"i":{"t":{"i":["Kuwaiti","JJ"]}}}}}}}

You can build a trie from a list of 83,000 words in ~10 secs and the lookup is fast. You may 
want to use the code in order to build your own trie with other associated data, i.e. 
defintions, word roots, etc.

It uses the [pos-js was written by Percy Wegmann](https://github.com/neopunisher/pos-js) 
to parse the words into their parts of speech.

## How to install

`$ npm install pos-dict-trie`

## Usage

```js
const trie = require('./index.js');
const fs = require('fs');

// Builds initial trie from user input
let Trie = new trie.DictionaryTrie({ a: { b: ["ab", "NN"]}});
console.log(newTrie.getTrie()); // => { a: { b: ["ab", "NN"]}}

let anotherTrie = new trie.DictionaryTrie({}),
	fileToRead = path.join(__dirname, './yourFileToRead.txt');

// Builds trie from a file
anotherTrie.buildTrieFromFile(fileToRead) // File must be in single-lined format
	.then(result => console.log(result)); // => Returns your trie in a JSON string

// Writes a built trie into a file
let fileToWriteInto = path.join(__dirname, './yourFileToWriteInto.json');

Promise.resolve(
	anotherTrie.buildTrieFromFile(fileToRead)
).then(() => {
	anotherTrie.writeToFile(fileToWriteInto).then(
		(result) => console.log(result), // => success message 
		(error) => console.log(error) // => error message
	);
});

// Search the trie and returns the part of speech
anotherTrie.searchTrie(anotherTrie.getTrie(), 'word').then( 
	(result) => console.log(result), // => part of speech of the word
	(error) => console.log(error) // => Will return "word not found" if not
);

let t = anotherTrie.getTrie();

// Multiple searches at once
Promise.all([
	anotherTrie.searchTrie(t, 'walk'),
	anotherTrie.searchTrie(t, 'shoes'),
	anotherTrie.searchTrie(t, 'readily'),
]).then(result => {
	console.log(result) // => returns all three in an array ['VB', 'NN', 'RB']
});
```