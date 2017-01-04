/* 
	Takes in a txt file and builds a JSON trie line by line recursively.

	Pseudocode, after a lot of thinking:

	trie = {}
	for (character, index) in enum(word):
		if (word[index + 1]):
			trie[character] = word[index + 1]
			trie = trie[character] 
		else:
			trie[character] = [ POS, paired with the word ]

	This creates a nested object that looks like:
		{ word[index]: 
			{ word[index+1]: 
				{ word[index+2]: 
					...word[index+N]: [ POS ]
				}
			}
		}
	Then to get to the leaves, it looks like:
		trie[word[0]][word[1]]...[word[N]] = [ POS ] 
	OR
		trie[character @ 1][character @ 2]...[character @ N] = [ POS ]
*/ 

let trie = {};

// words formatted in { sememe: String, pos: String }
// example: { sememe: car, pos: NN }, { sememe: run, pos: VB }, { sememe: to, pos: TO } 
words.forEach(word => {
	word.sememe.map((i, index) => {
		if (word.sememe[index + 1]) {
			trie[i] = word.sememe[index + 1] = {};
			trie = trie[i];
		} else {
			trie[i] = word.pos;
		}
	});
});