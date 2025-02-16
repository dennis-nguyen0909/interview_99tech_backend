"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sum_to_n_a = sum_to_n_a;
exports.sum_to_n_b = sum_to_n_b;
exports.sum_to_n_c = sum_to_n_c;
function sum_to_n_a(n) {
    var sum = 0; // O(1) - initializing a variable
    for (var i = 1; i <= n; i++) { // O(n) - loop runs n times
        sum += i; // O(1) - constant time addition operation
    }
    return sum; // O(1) - returning a value
    // Time complexity: O(n) - dominated by the loop
    // Space complexity: O(1) - only using two variables regardless of input size
}
function sum_to_n_b(n) {
    // Let's try another explanation:
    // With n = 5, we need to calculate: 1 + 2 + 3 + 4 + 5
    // Write it twice and reverse the order:
    // 1 + 2 + 3 + 4 + 5 = S
    // 5 + 4 + 3 + 2 + 1 = S
    // -------------------------
    // 6 + 6 + 6 + 6 + 6 = 2S
    // We can see each pair of numbers sums to 6
    // There are n = 5 such pairs in total
    // Therefore 2S = n * (n + 1)
    // => S = n * (n + 1) / 2
    // Time complexity: O(1) - just performing simple arithmetic operations
    // Space complexity: O(1) - only using a constant amount of extra space
    return (n * (n + 1)) / 2;
}
function sum_to_n_c(n) {
    if (n <= 1) {
        return n; // O(1)
    }
    return n + sum_to_n_c(n - 1); // O(n) recursive calls, each doing O(1) work
    // Total time complexity: O(n)
    // Space complexity: O(n) due to recursive call stack
}
// Test cases
console.log("Testing sum_to_n_a:");
console.log("n = 5:", sum_to_n_a(5) === 15); // 1 + 2 + 3 + 4 + 5 = 15
console.log("n = 1:", sum_to_n_a(1) === 1); // Edge case
console.log("n = 0:", sum_to_n_a(0) === 0); // Edge case
console.log("\nTesting sum_to_n_b:");
console.log("n = 5:", sum_to_n_b(5) === 15); // Same result as method A
console.log("n = 1:", sum_to_n_b(1) === 1); // Edge case
console.log("n = 0:", sum_to_n_b(0) === 0); // Edge case
console.log("\nTesting sum_to_n_c:");
console.log("n = 5:", sum_to_n_c(5) === 15); // Same result as methods A & B
console.log("n = 1:", sum_to_n_c(1) === 1); // Edge case
console.log("n = 0:", sum_to_n_c(0) === 0); // Edge case
var testValue = 10;
var resultA = sum_to_n_a(testValue);
console.log("Result for n = 10:", resultA); // Should be 55
