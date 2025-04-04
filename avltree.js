class Node {
    constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
      this.height = 1; // Height of the node (leaf nodes have height 1)
    }
  }
  
  class AVLTree {
    constructor() {
      this.root = null;
    }
  
    // Get height of a node (null nodes have height 0)
    getHeight(node) {
      return node ? node.height : 0;
    }
  
    // Get balance factor of a node
    getBalanceFactor(node) {
      return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
    }
  
    // Update height of a node based on its children
    updateHeight(node) {
      node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
    }
  
    // Right rotation
    rightRotate(y) {
      const x = y.left;
      const T2 = x.right;
  
      // Perform rotation
      x.right = y;
      y.left = T2;
  
      // Update heights
      this.updateHeight(y);
      this.updateHeight(x);
  
      // Return new root
      return x;
    }
  
    // Left rotation
    leftRotate(x) {
      const y = x.right;
      const T2 = y.left;
  
      // Perform rotation
      y.left = x;
      x.right = T2;
  
      // Update heights
      this.updateHeight(x);
      this.updateHeight(y);
  
      // Return new root
      return y;
    }
  
    // Insert a value into the AVL tree
    insert(value) {
      this.root = this._insert(this.root, value);
      return this;
    }
  
    _insert(node, value) {
      // Perform standard BST insertion
      if (!node) {
        return new Node(value);
      }
  
      if (value < node.value) {
        node.left = this._insert(node.left, value);
      } else if (value > node.value) {
        node.right = this._insert(node.right, value);
      } else {
        // Duplicate values not allowed
        return node;
      }
  
      // Update height of current node
      this.updateHeight(node);
  
      // Get balance factor to check if node became unbalanced
      const balance = this.getBalanceFactor(node);
  
      // Left Left Case
      if (balance > 1 && value < node.left.value) {
        return this.rightRotate(node);
      }
  
      // Right Right Case
      if (balance < -1 && value > node.right.value) {
        return this.leftRotate(node);
      }
  
      // Left Right Case
      if (balance > 1 && value > node.left.value) {
        node.left = this.leftRotate(node.left);
        return this.rightRotate(node);
      }
  
      // Right Left Case
      if (balance < -1 && value < node.right.value) {
        node.right = this.rightRotate(node.right);
        return this.leftRotate(node);
      }
  
      // Return the unchanged node
      return node;
    }
  
    // Delete a value from the AVL tree
    delete(value) {
      this.root = this._delete(this.root, value);
      return this;
    }
  
    _delete(node, value) {
      // Standard BST delete
      if (!node) {
        return null;
      }
  
      if (value < node.value) {
        node.left = this._delete(node.left, value);
      } else if (value > node.value) {
        node.right = this._delete(node.right, value);
      } else {
        // Node with the value to be deleted found
  
        // Node with only one child or no child
        if (!node.left || !node.right) {
          const temp = node.left ? node.left : node.right;
  
          // No child case
          if (!temp) {
            node = null;
          } else {
            // One child case
            node = temp; // Copy the contents of the non-empty child
          }
        } else {
          // Node with two children: Get the inorder successor (smallest in right subtree)
          const temp = this._findMinNode(node.right);
  
          // Copy the inorder successor's value to this node
          node.value = temp.value;
  
          // Delete the inorder successor
          node.right = this._delete(node.right, temp.value);
        }
      }
  
      // If the tree had only one node, then return
      if (!node) {
        return null;
      }
  
      // Update height of current node
      this.updateHeight(node);
  
      // Get balance factor
      const balance = this.getBalanceFactor(node);
  
      // Left Left Case
      if (balance > 1 && this.getBalanceFactor(node.left) >= 0) {
        return this.rightRotate(node);
      }
  
      // Left Right Case
      if (balance > 1 && this.getBalanceFactor(node.left) < 0) {
        node.left = this.leftRotate(node.left);
        return this.rightRotate(node);
      }
  
      // Right Right Case
      if (balance < -1 && this.getBalanceFactor(node.right) <= 0) {
        return this.leftRotate(node);
      }
  
      // Right Left Case
      if (balance < -1 && this.getBalanceFactor(node.right) > 0) {
        node.right = this.rightRotate(node.right);
        return this.leftRotate(node);
      }
  
      return node;
    }
  
    // Find the node with minimum value
    _findMinNode(node) {
      let current = node;
      while (current.left) {
        current = current.left;
      }
      return current;
    }
  
    // Search for a value
    search(value) {
      return this._search(this.root, value);
    }
  
    _search(node, value) {
      if (!node) {
        return false;
      }
  
      if (value === node.value) {
        return true;
      }
  
      if (value < node.value) {
        return this._search(node.left, value);
      } else {
        return this._search(node.right, value);
      }
    }
  
    // Inorder traversal
    inorder() {
      const result = [];
      this._inorder(this.root, result);
      return result;
    }
  
    _inorder(node, result) {
      if (node) {
        this._inorder(node.left, result);
        result.push(node.value);
        this._inorder(node.right, result);
      }
    }
  
    // Utility function to print the tree structure
    printTree() {
      const result = [];
      this._printTree(this.root, '', true, result);
      return result.join('\n');
    }
  
    _printTree(node, prefix, isLeft, result) {
      if (node) {
        result.push(prefix + (isLeft ? '└── ' : '┌── ') + node.value + ' (h=' + node.height + ')');
        
        // Enter the next level - left and right branch
        const childPrefix = prefix + (isLeft ? '    ' : '│   ');
        this._printTree(node.right, childPrefix, false, result);
        this._printTree(node.left, childPrefix, true, result);
      }
    }
  }
  
  // Example usage:
  const avl = new AVLTree();
  
  // Insert some values
  avl.insert(10).insert(20).insert(30).insert(40).insert(50).insert(25);
  
  console.log("Inorder traversal:");
  console.log(avl.inorder()); // [10, 20, 25, 30, 40, 50]
  
  console.log("\nTree structure:");
  console.log(avl.printTree());
  
  console.log("\nAfter deleting 20:");
  avl.delete(20);
  console.log(avl.inorder()); // [10, 25, 30, 40, 50]
  console.log(avl.printTree());
  
  console.log("\nSearch for 25:", avl.search(25)); // true
  console.log("Search for 20:", avl.search(20)); // false