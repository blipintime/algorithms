/**
 * Converts a Max-Heap to a Min-Heap
 * 
 * A Max-Heap has the property where each parent node is greater than or equal to its children
 * A Min-Heap has the property where each parent node is less than or equal to its children
 * 
 * The conversion strategy:
 * 1. Negate all values in the Max-Heap (turning the Max-Heap into a Min-Heap of negative values)
 * 2. Extract values in order (which will be in ascending order of negated values)
 * 3. Negate them back and rebuild a Min-Heap
 * 
 * Alternative approach (implemented below):
 * Simply negate the comparison function of the original Max-Heap implementation
 * or simply build a new Min-Heap from the Max-Heap values
 */

class Heap {
    constructor(comparator) {
      this.heap = [];
      this.comparator = comparator;
    }
  
    // Helper methods for index calculation
    getLeftChildIndex(parentIndex) {
      return 2 * parentIndex + 1;
    }
  
    getRightChildIndex(parentIndex) {
      return 2 * parentIndex + 2;
    }
  
    getParentIndex(childIndex) {
      return Math.floor((childIndex - 1) / 2);
    }
  
    // Check if indices are valid
    hasLeftChild(index) {
      return this.getLeftChildIndex(index) < this.heap.length;
    }
  
    hasRightChild(index) {
      return this.getRightChildIndex(index) < this.heap.length;
    }
  
    hasParent(index) {
      return this.getParentIndex(index) >= 0;
    }
  
    // Get values
    leftChild(index) {
      return this.heap[this.getLeftChildIndex(index)];
    }
  
    rightChild(index) {
      return this.heap[this.getRightChildIndex(index)];
    }
  
    parent(index) {
      return this.heap[this.getParentIndex(index)];
    }
  
    // Swap elements
    swap(indexOne, indexTwo) {
      const temp = this.heap[indexOne];
      this.heap[indexOne] = this.heap[indexTwo];
      this.heap[indexTwo] = temp;
    }
  
    // Get top element without removing it
    peek() {
      if (this.heap.length === 0) {
        return null;
      }
      return this.heap[0];
    }
  
    // Remove and return top element
    poll() {
      if (this.heap.length === 0) {
        return null;
      }
      
      const item = this.heap[0];
      this.heap[0] = this.heap[this.heap.length - 1];
      this.heap.pop();
      this.heapifyDown();
      return item;
    }
  
    // Add element to heap
    add(item) {
      this.heap.push(item);
      this.heapifyUp();
      return this;
    }
  
    // Bubble up the newly added element
    heapifyUp() {
      let index = this.heap.length - 1;
      while (
        this.hasParent(index) && 
        this.comparator(this.heap[index], this.parent(index))
      ) {
        this.swap(this.getParentIndex(index), index);
        index = this.getParentIndex(index);
      }
    }
  
    // Bubble down the top element
    heapifyDown() {
      let index = 0;
      
      while (this.hasLeftChild(index)) {
        let smallerChildIndex = this.getLeftChildIndex(index);
        
        if (
          this.hasRightChild(index) && 
          this.comparator(this.rightChild(index), this.leftChild(index))
        ) {
          smallerChildIndex = this.getRightChildIndex(index);
        }
        
        if (this.comparator(this.heap[index], this.heap[smallerChildIndex])) {
          break;
        } else {
          this.swap(index, smallerChildIndex);
        }
        
        index = smallerChildIndex;
      }
    }
  
    // Get size of heap
    size() {
      return this.heap.length;
    }
  
    // Get heap array
    toArray() {
      return [...this.heap];
    }
  }
  
  /**
   * Converts a Max-Heap to a Min-Heap
   * @param {Array} maxHeapArray - Array representing a max heap
   * @returns {Array} - Array representing the converted min heap
   */
  function convertMaxHeapToMinHeap(maxHeapArray) {
    // Create a min heap
    const minHeap = new Heap((a, b) => a < b);
    
    // Add all elements from max heap to min heap
    for (const value of maxHeapArray) {
      minHeap.add(value);
    }
    
    return minHeap.toArray();
  }
  
  // Demonstration
  function main() {
    // Create a max heap
    const maxHeap = new Heap((a, b) => a > b);
    
    // Add elements to the max heap
    [10, 5, 15, 2, 4, 12, 18].forEach(value => maxHeap.add(value));
    
    console.log("Max Heap:", maxHeap.toArray());
    
    // Convert max heap to min heap
    const minHeapArray = convertMaxHeapToMinHeap(maxHeap.toArray());
    
    console.log("Min Heap:", minHeapArray);
    
    // Alternative approach: Extract elements from max heap in order and verify
    const sortedDescending = [];
    while (maxHeap.size() > 0) {
      sortedDescending.push(maxHeap.poll());
    }
    console.log("Elements extracted from Max Heap (descending):", sortedDescending);
    
    const minHeap = new Heap((a, b) => a < b);
    sortedDescending.forEach(value => minHeap.add(value));
    
    const sortedAscending = [];
    while (minHeap.size() > 0) {
      sortedAscending.push(minHeap.poll());
    }
    console.log("Elements extracted from Min Heap (ascending):", sortedAscending);
  }
  
  // Run the demonstration
  main();
  