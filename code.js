// Dynamic Programming version of the Held-Karp Algorithm
function tsp_hk(distanceMatrix) {
    const n = distanceMatrix.length;
    if (n === 0) return 0; // No cities, no distance
    if (n === 1) return 0; // Only one city, no movement required
  
    const memo = new Map(); // Create memoization map for caching subproblem results
  
    /**
     * Recursive function to compute the minimum distance to visit all cities
     * @param {Set<number>} visited - Set of visited cities
     * @param {number} current - The index of the current city
     * @returns {number} - Minimum distance to visit all remaining cities from the current position
     */
    function heldKarp(visited, current) {
      const key = `${Array.from(visited).join(',')}-${current}`;
      if (memo.has(key)) return memo.get(key);
  
      // Base case: if all cities have been visited
      if (visited.size === n) {
        return 0;
      }
  
      let minDistance = Infinity;
  
      // Explore all unvisited cities
      for (let next = 0; next < n; next++) {
        if (!visited.has(next)) { // If the city has not been visited
          const newVisited = new Set([...visited, next]);
          const distance = distanceMatrix[current][next] + heldKarp(newVisited, next);
          minDistance = Math.min(minDistance, distance);
        }
      }
  
      memo.set(key, minDistance);
      return minDistance;
    }
  
    // Try starting at each city and compute the minimum tour
    let shortestTour = Infinity;
  
    for (let start = 0; start < n; start++) {
      const initialVisited = new Set([start]);
      const distanceFromStart = heldKarp(initialVisited, start);
      shortestTour = Math.min(shortestTour, distanceFromStart);
    }
  
    return shortestTour;
  }
  