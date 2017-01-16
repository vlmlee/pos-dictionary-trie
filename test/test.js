import DictionaryTrie from '../src/babel-DictionaryTrie';

let Dictionary = new DictionaryTrie({});

let readFromFile = './test-dictionary.txt',
	writeToFile = './test-pos-dictionary.json';

// Dictionary.buildTrieFromFile(readFromFile).then( 
// 	result => console.log(result), 
// 	error => console.log(error)
// );

// Dictionary.writeTrieToFile(writeToFile).then(
// 	result => console.log(result)
// );

Promise.resolve(
	Dictionary.buildTrieFromFile(readFromFile).then(
		results => console.log("\n"+results+"\n"),
		error => console.log(error)
	)
).then(results => {
	Dictionary.writeTrieToFile(writeToFile).then(
		results => console.log(results));
});