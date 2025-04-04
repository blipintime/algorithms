/**
 * Skip List Implementation in JavaScript
 * 
 * A Skip List is a probabilistic data structure that provides O(log n) search,
 * insert, and delete operations on average, similar to balanced trees.
 */

// Maximum level for this skip list
const MAX_LEVEL = 16;
// Probability factor for level assignment (1/P)
const P = 2;

// Node class for Skip List
class Node {
  constructor(key, value, level) {
    this.key = key;
    this.value = value;
    // Array of forward pointers
    this.forward = new Array(level + 1).fill(null);
  }
}

// Skip List class
class SkipList {
  constructor() {
    this.header = new Node(-Infinity, null, MAX_LEVEL);
    this.level = 0; // Current maximum level of skip list
    this.size = 0;  // Number of elements in the skip list
  }

  // Randomly determine level for a new node
  randomLevel() {
    let level = 0;
    // Increase level with probability 1/P until reaching MAX_LEVEL
    while (Math.random() < 1/P && level < MAX_LEVEL) {
      level++;
    }
    return level;
  }

  // Search for a key in the skip list
  search(key) {
    let current = this.header;

    // Start from the highest level of the skip list
    for (let i = this.level; i >= 0; i--) {
      // Search forward until we find a node with a greater key
      while (current.forward[i] !== null && current.forward[i].key < key) {
        current = current.forward[i];
      }
    }

    // Reached level 0 and advance to the right node
    current = current.forward[0];

    // Check if current node has the required key
    if (current !== null && current.key === key) {
      return current.value;
    } else {
      return null;
    }
  }

  // Insert a key-value pair into the skip list
  insert(key, value) {
    // Array to store update information
    const update = new Array(MAX_LEVEL + 1).fill(null);
    let current = this.header;

    // Find position to insert at each level
    for (let i = this.level; i >= 0; i--) {
      while (current.forward[i] !== null && current.forward[i].key < key) {
        current = current.forward[i];
      }
      update[i] = current;
    }

    // Reach level 0
    current = current.forward[0];

    // If key already exists, update the value
    if (current !== null && current.key === key) {
      current.value = value;
      return;
    }

    // Generate random level for new node
    const newLevel = this.randomLevel();

    // Update skip list level if needed
    if (newLevel > this.level) {
      for (let i = this.level + 1; i <= newLevel; i++) {
        update[i] = this.header;
      }
      this.level = newLevel;
    }

    // Create new node
    const newNode = new Node(key, value, newLevel);

    // Insert node by rearranging pointers
    for (let i = 0; i <= newLevel; i++) {
      newNode.forward[i] = update[i].forward[i];
      update[i].forward[i] = newNode;
    }

    // Increment size
    this.size++;
  }

  // Delete a key from the skip list
  delete(key) {
    const update = new Array(MAX_LEVEL + 1).fill(null);
    let current = this.header;

    // Find position to delete at each level
    for (let i = this.level; i >= 0; i--) {
      while (current.forward[i] !== null && current.forward[i].key < key) {
        current = current.forward[i];
      }
      update[i] = current;
    }

    current = current.forward[0];

    // If key doesn't exist, return
    if (current === null || current.key !== key) {
      return false;
    }

    // Delete node by rearranging pointers
    for (let i = 0; i <= this.level; i++) {
      if (update[i].forward[i] !== current) {
        break;
      }
      update[i].forward[i] = current.forward[i];
    }

    // Update level if needed
    while (this.level > 0 && this.header.forward[this.level] === null) {
      this.level--;
    }

    // Decrement size
    this.size--;
    return true;
  }

  // Print the skip list (for debugging)
  print() {
    console.log("**** Skip List ****");
    for (let i = this.level; i >= 0; i--) {
      let current = this.header.forward[i];
      console.log(`Level ${i}: `);
      let levelStr = "";
      while (current !== null) {
        levelStr += `${current.key}:${current.value} -> `;
        current = current.forward[i];
      }
      levelStr += "null";
      console.log(levelStr);
    }
  }

  // Get the size of the skip list
  getSize() {
    return this.size;
  }
}

// Example usage
function demonstrateSkipList() {

  const skipList = new SkipList();
  
  // Insert elements
  skipList.insert(3, "value3");
  skipList.insert(6, "value6");
  skipList.insert(7, "value7");
  skipList.insert(9, "value9");
  skipList.insert(12, "value12");
  skipList.insert(19, "value19");
  skipList.insert(17, "value17");
  
  // Print the skip list
  skipList.print();
  
  // Search for elements
  console.log("Search for key 7:", skipList.search(7));
  console.log("Search for key 10:", skipList.search(10));
  
  // Delete an element
  console.log("Delete key 7:", skipList.delete(7));
  console.log("Search for key 7 after deletion:", skipList.search(7));
  
  // Print the updated skip list
  skipList.print();
}

// Run the demonstration
demonstrateSkipList()
