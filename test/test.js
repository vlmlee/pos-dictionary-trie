import DictionaryTrie from '../src/babel-DictionaryTrie';
const assert = require('chai').assert;

let Dictionary = new DictionaryTrie({});

let readFromFile = './test-dictionary.txt',
	writeToFile = './test-pos-dictionary.json';

Promise.resolve(
	Dictionary.buildTrieFromFile(readFromFile).then(
		results => console.log("\n"+results+"\n"),
		error => console.log(error)
	)
).then(() => {
	Dictionary.writeTrieToFile(writeToFile).then(
		results => console.log(results)
	);
}).then(() => {
	Dictionary.searchTrie(Dictionary.trie, 'kudos').then(
		results => console.log(results)
	);
}).then(() => {
	Dictionary.searchTrie(Dictionary.trie, 'kurta').then(
		results => console.log(results)
	);
}).then(() => {
	Dictionary.searchTrie(Dictionary.trie, 'kung').then(
		results => console.log(results)
	);
}).then(() => {
	Dictionary.searchTrie(Dictionary.trie, 'kq').then(
		results => console.log(results)
	);
});


