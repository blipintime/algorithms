// Bit Manipulation in JavaScript

// Basic bitwise operators
function bitwiseBasics(a, b) {
  console.log("Bitwise AND:", a & b);         // Bitwise AND
  console.log("Bitwise OR:", a | b);          // Bitwise OR
  console.log("Bitwise XOR:", a ^ b);         // Bitwise XOR
  console.log("Bitwise NOT:", ~a);            // Bitwise NOT
  console.log("Left Shift:", a << 2);         // Shift left by 2 bits
  console.log("Right Shift:", a >> 1);        // Shift right by 1 bit (sign-preserving)
  console.log("Zero-fill Right Shift:", a >>> 1); // Shift right by 1 bit (zero-fill)
}

// Check if a number is odd or even using bitwise AND
function isOdd(num) {
  return (num & 1) === 1;
}

// Get the nth bit of a number
function getBit(num, bitPosition) {
  return (num & (1 << bitPosition)) !== 0;
}

// Set the nth bit of a number
function setBit(num, bitPosition) {
  return num | (1 << bitPosition);
}

// Clear the nth bit of a number
function clearBit(num, bitPosition) {
  return num & ~(1 << bitPosition);
}

// Toggle the nth bit of a number
function toggleBit(num, bitPosition) {
  return num ^ (1 << bitPosition);
}

// Count the number of set bits (1s) in a number
function countSetBits(numIn) {
  let num = numIn
  let count = 0;
  while (num > 0) {
    count += num & 1;
    num >>>= 1;
  }
  return count;
}

// Check if a number is a power of 2
function isPowerOfTwo(num) {
  return num > 0 && (num & (num - 1)) === 0;
}

// Find the position of the rightmost set bit
function rightmostSetBitPos(num) {
  if (num === 0) return -1;
  let position = 0;
  while ((num & 1) === 0) {
    position++;
    num >>>= 1;
  }
  return position;
}

// Swap two numbers without using a temporary variable
function swapWithoutTemp(a, b) {
  console.log("Before swap:", a, b);
  a = a ^ b;
  b = a ^ b;
  a = a ^ b;
  console.log("After swap:", a, b);
  return [a, b];
}

// Example usage
console.log("=== Basic Bitwise Operations ===");
bitwiseBasics(5, 3);  // 5 (101) and 3 (011)

console.log("\n=== Bit Manipulation Functions ===");
console.log("Is 7 odd?", isOdd(7));
console.log("Is 8 odd?", isOdd(8));
console.log("Get 3rd bit of 42:", getBit(42, 3));  // 42 is 101010 in binary
console.log("Set 1st bit of 42:", setBit(42, 1));  // Result: 101110 (46)
console.log("Clear 2nd bit of 42:", clearBit(42, 2));  // Result: 101000 (40)
console.log("Toggle 1st bit of 1:", toggleBit(1, 1))
console.log("Toggle 1st bit of 3:", toggleBit(3, 1))
console.log("Toggle 1st bit of 42:", toggleBit(42, 1));  // Result: 101110 (46)
console.log("Number of set bits in 1:", countSetBits(1))
console.log("Number of set bits in 2:", countSetBits(2))
console.log("Number of set bits in 3:", countSetBits(3))
console.log("Number of set bits in 42:", countSetBits(42));  // 3 (set bits at positions 1, 3, 5)
console.log("Is 1 a power of 2?", isPowerOfTwo(1))
console.log("Is 2 a power of 2?", isPowerOfTwo(2))
console.log("Is 3 a power of 2?", isPowerOfTwo(3))
console.log("Is 4 a power of 2?", isPowerOfTwo(4))
console.log("Is 64 a power of 2?", isPowerOfTwo(64));
console.log("Is 63 a power of 2?", isPowerOfTwo(63));
console.log("Position of rightmost set bit in 40:", rightmostSetBitPos(40));  // 40 is 101000, so position 3
console.log("\n=== Swap Numbers ===");
swapWithoutTemp(10, 25);
