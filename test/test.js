import DictionaryTrie from '../src/babel-DictionaryTrie';
import path from 'path';
import fs from 'fs';
import { expect } from 'chai';

let readFromFile = path.join(__dirname, './test-dictionary.txt'),
	writeToFile = path.join(__dirname, './test-pos-dictionary.json');

describe('Dictionary Trie', () => {
	it('should build trie from constructor', () => {
		let Dictionary = new DictionaryTrie({ a: { b : { s: ['abs', 'NN']}}});
		expect(Dictionary.getTrie()).to.eql({ a: { b : { s: ['abs', 'NN']}}});
	});

	it('should build trie from file', () => {
		let Dictionary = new DictionaryTrie({});
		Dictionary.buildTrieFromFile(readFromFile).then(result => {
			expect(result).to.eql('{"k":{"u":{"d":{"o":{"s":["kudos","NNS"]}},"r":{"t":{"a":["kurta","NN"]}}},"v":{"e":{"t":{"c":{"h":["kvetch","NN"]}}}}},"K":{"u":{"r":{"d":["Kurd","NNP"]},"w":{"a":{"i":{"t":{"i":["Kuwaiti","JJ"]}}}}}}}');
		});
	});

	it('should write trie to file', (done) => {
		let Dictionary = new DictionaryTrie({});

		Promise.resolve(
			Dictionary.buildTrieFromFile(readFromFile)
		).then(() => {
			Dictionary.writeTrieToFile(writeToFile)
		});

		fs.readFile(writeToFile, 'utf8', (err, data) => {
			expect(JSON.stringify(Dictionary.getTrie())).to.eql(data);
			done();
		});
	});

	it('should find pos of a search term', () => {
		let Dictionary = new DictionaryTrie({ a: { b : { s: ['abs', 'NN']}}});
		Dictionary.searchTrie(Dictionary.trie, 'abs').then(result => {
			expect(result).to.eql(["NN"]);
		});
	});

	it('should find pos of multiple search terms', () => {
		let Dictionary = new DictionaryTrie({"k":{"u":{"d":{"o":{"s":["kudos","NNS"]}},"r":{"t":{"a":["kurta","NN"]}}},"v":{"e":{"t":{"c":{"h":["kvetch","NN"]}}}}},"K":{"u":{"r":{"d":["Kurd","NNP"]},"w":{"a":{"i":{"t":{"i":["Kuwaiti","JJ"]}}}}}}});

		Promise.all([
			Dictionary.searchTrie(Dictionary.trie, 'Kurd'),
			Dictionary.searchTrie(Dictionary.trie, 'kvetch'),
			Dictionary.searchTrie(Dictionary.trie, 'kurta'),
		]).then(result => {
			expect(result).to.eql([["NNP"], ["NN"], ["NN"]]);
		});
	});

	it('should return an empty array and throw error if word is not found', () => {
		let Dictionary = new DictionaryTrie({});
		Promise.resolve(
			Dictionary.buildTrieFromFile(readFromFile)
		).then(() => {
			Dictionary.searchTrie(Dictionary.trie, 'kq').then(result => {
				expect(result).to.eql([]);
			}).catch(error => expect(error).to.equal('Word not found.'));
		});
	});

	it('should add a word to the trie', () => {
		let Dictionary = new DictionaryTrie({});
		Promise.resolve(
			Dictionary.addToTrie('almost')
		).then(result => {
			expect(result).to.eql('{"a":{"l":{"m":{"o":{"s":{"t":["almost","RB"]}}}}}}');
		});
	});

	it('should remove a word from the trie', () => {
		let Dictionary = new DictionaryTrie({});

		Dictionary.addToTrie('almost');
		Dictionary.addToTrie('also');
		Dictionary.addToTrie('any');

		expect(JSON.stringify(Dictionary.getTrie())).to.eql('{"a":{"l":{"m":{"o":{"s":{"t":["almost","RB"]}}},"s":{"o":["also","RB"]}},"n":{"y":["any","DT"]}}}');

		Dictionary.removeFromTrie('almost');

		expect(JSON.stringify(Dictionary.getTrie())).to.eql('{"a":{"l":{"s":{"o":["also","RB"]}},"n":{"y":["any","DT"]}}}');
	});
});
