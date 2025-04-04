

  
  class Trie {
    constructor() {
      this.root = new Trie.TrieNode();
    }

    static TrieNode = class  {
      constructor() {
        this.children = {};
        this.isEndOfWord = false;
      }
    }
  
    // Insert a word into the trie
    insert(word) {
      let current = this.root;
      
      for (let i = 0; i < word.length; i++) {
        const char = word[i];
        if (!current.children[char]) {
          current.children[char] = new Trie.TrieNode();
        }
        current = current.children[char];
      }
      
      current.isEndOfWord = true;
    }
  
    // Search for a word in the trie
    search(word) {
      let current = this.root;
      
      for (let i = 0; i < word.length; i++) {
        const char = word[i];
        if (!current.children[char]) {
          return false;
        }
        current = current.children[char];
      }
      
      return current.isEndOfWord;
    }
  
    // Check if there is any word in the trie that starts with the given prefix
    startsWith(prefix) {
      let current = this.root;
      
      for (let i = 0; i < prefix.length; i++) {
        const char = prefix[i];
        if (!current.children[char]) {
          return false;
        }
        current = current.children[char];
      }
      
      return true;
    }
  
    // Get all words in the trie with the given prefix
    getAllWordsWithPrefix(prefix) {
      const result = [];
      let current = this.root;
      
      // Navigate to the end of the prefix in the trie
      for (let i = 0; i < prefix.length; i++) {
        const char = prefix[i];
        if (!current.children[char]) {
          return result;
        }
        current = current.children[char];
      }
      
      // Use DFS to find all words starting from the end of the prefix
      this._dfsWithPrefix(current, prefix, result);
      
      return result;
    }
  
    _dfsWithPrefix(node, prefix, result) {
      if (node.isEndOfWord) {
        result.push(prefix);
      }
      
      for (const char in node.children) {
        this._dfsWithPrefix(node.children[char], prefix + char, result);
      }
    }
  
    // Delete a word from the trie
    delete(word) {
      this._deleteRecursive(this.root, word, 0);
    }
  
    _deleteRecursive(current, word, index) {
      // Base case: if we've processed all characters
      if (index === word.length) {
        // If this isn't actually a word, nothing to delete
        if (!current.isEndOfWord) {
          return false;
        }
        
        current.isEndOfWord = false;
        
        // Return true if this node has no other children
        return Object.keys(current.children).length === 0;
      }
      
      const char = word[index];
      if (!current.children[char]) {
        return false;
      }
      
      const shouldDeleteCurrentNode = this._deleteRecursive(
        current.children[char],
        word,
        index + 1
      );
      
      // If true is returned, delete the mapping and check if this node can be deleted
      if (shouldDeleteCurrentNode) {
        delete current.children[char];
        return Object.keys(current.children).length === 0 && !current.isEndOfWord;
      }
      
      return false;
    }
  }

  const trie = new Trie();

  // Insert words
  trie.insert("apple");
  trie.insert("app");
  trie.insert("application");
  trie.insert("approve");
  
  // Search for words
  console.log(trie.search("apple"));     // true
  console.log(trie.search("app"));       // true
  console.log(trie.search("apples"));    // false
  
  // Check prefixes
  console.log(trie.startsWith("app"));   // true
  console.log(trie.startsWith("ban"));   // false
  
  // Get all words with prefix
  console.log(trie.getAllWordsWithPrefix("app")); 
  // ['app', 'apple', 'application', 'approve']
  
  // Delete a word
  trie.delete("apple");
  console.log(trie.search("apple"));     // false
  console.log(trie.search("app"))
