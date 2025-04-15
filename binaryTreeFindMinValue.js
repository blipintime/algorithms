class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

// Binary Search Tree class
class BinarySearchTree {
    constructor() {
        this.root = null;
    }
    
    // Method to insert a new value into the BST
    insert(value) {
        const newNode = new Node(value);
        
        if (this.root === null) {
            this.root = newNode;
            return this;
        }
        
        let current = this.root;
        
        while (true) {
            // Prevent duplicate values
            if (value === current.value) return undefined;
            
            if (value < current.value) {
                if (current.left === null) {
                    current.left = newNode;
                    return this;
                }
                current = current.left;
            } else {
                if (current.right === null) {
                    current.right = newNode;
                    return this;
                }
                current = current.right;
            }
        }
    }
    
    // Method to find the minimum value in the BST
    findMinValue() {
        if (this.root === null) {
            return null; // Tree is empty
        }
        
        let current = this.root;
        
        // Keep traversing left until we reach the leftmost node
        while (current.left !== null) {
            current = current.left;
        }
        
        return current.value;
    }
}

// Example usage
const bst = new BinarySearchTree();
bst.insert(10);
bst.insert(5);
bst.insert(15);
bst.insert(3);
bst.insert(7);
bst.insert(13);
bst.insert(17);

console.log("Binary Search Tree structure:", bst);
console.log("Minimum value in the BST:", bst.findMinValue());
