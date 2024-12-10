function tsp_hk(distanceMatrix) {
    const n = distanceMatrix.length;
    if (n === 0) return 0;
    if (n === 1) return 0;
    const memo = new Map();
    /**
     * Recursive function to compute the minimum distance to visit all cities
     * @param {Set<number>} visited - Set of visited cities
     * @param {number} current - The index of the current city
     * @returns {number} - Minimum distance to visit all remaining cities from the current position
     */
    function heldKarp(visited, current) {
      const key = `${Array.from(visited).join(',')}-${current}`;
      if (memo.has(key)) return memo.get(key);
      if (visited.size === n) {
        return 0;
      }
      let minDistance = Infinity;
      for (let next = 0; next < n; next++) {
        if (!visited.has(next)) {
          const newVisited = new Set([...visited, next]);
          const distance = distanceMatrix[current][next] + heldKarp(newVisited, next);
          minDistance = Math.min(minDistance, distance);
        }
      }
      memo.set(key, minDistance);
      return minDistance;
    }
    let shortestTour = Infinity;
    for (let start = 0; start < n; start++) {
      const initialVisited = new Set([start]);
      const distanceFromStart = heldKarp(initialVisited, start);
      shortestTour = Math.min(shortestTour, distanceFromStart);
    }
    return shortestTour;
  }
  