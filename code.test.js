const fs = require('fs');
const assert = require('assert');

// Load the tsp_hk function from code.js
eval(fs.readFileSync('code.js') + '');

// Helper function to assert with detailed error messages
function assertEqual(actual, expected, message) {
  try {
    assert.strictEqual(actual, expected, message);
  } catch (error) {
    console.error(`Test failed: ${message}`);
    console.error(`  Expected: ${expected}`);
    console.error(`  Actual:   ${actual}`);
    throw error;
  }
}

// Test cases for tsp_hk
let dm;

// Test with no cities
dm = [[]];
assertEqual(tsp_hk(dm), 0, "Failed on empty distance matrix");

// Test with one city
dm = [[0]];
assertEqual(tsp_hk(dm), 0, "Failed on single city");

// Test with three cities, all zero distances
dm = [[0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]];
assertEqual(tsp_hk(dm), 0, "Failed on all-zero distances");

// Test with a simple graph
dm = [[0, 1, 2],
      [1, 0, 2],
      [2, 2, 0]];
assertEqual(tsp_hk(dm), 3, "Failed on small symmetric graph");

// Test with a 5-city graph
dm = [[0, 3, 4, 2, 7],
      [3, 0, 4, 6, 3],
      [4, 4, 0, 5, 8],
      [2, 6, 5, 0, 6],
      [7, 3, 8, 6, 0]];
assertEqual(tsp_hk(dm), 13, "Failed on 5-city graph");

// Test with a 4-city graph
dm = [[0, 2, 9, 10],
      [1, 0, 6, 4],
      [15, 7, 0, 8],
      [6, 3, 12, 0]];
assertEqual(tsp_hk(dm), 12, "Failed on 4-city graph");

console.log("All tests passed!");
