/**
 * Finds the optimal set of special vertices to minimize total cost.
 * @param {Array<Array<number>>} cities - Array of edges [vertex1, vertex2]
 * @param {number} cost_lib - Cost of a special vertex
 * @param {number} cost_edge - Cost of traversing an edge
 * @return {Object} Result containing optimal special vertices and total cost
 */
function findOptimalSpecialVertices(cities, cost_lib, cost_edge) {
  // Build adjacency list representation of the graph
  const graph = {};
  const allVertices = new Set();
  
  for (const [u, v] of cities) {
      if (!graph[u]) graph[u] = [];
      if (!graph[v]) graph[v] = [];
      
      graph[u].push(v);
      graph[v].push(u);
      
      allVertices.add(u);
      allVertices.add(v);
  }
  
  // Find shortest paths from each vertex to every other vertex (Floyd-Warshall)
  const vertices = Array.from(allVertices);
  const n = vertices.length;
  const vertexToIndex = {};
  
  // Map vertices to indices
  vertices.forEach((v, i) => {
      vertexToIndex[v] = i;
  });
  
  // Initialize distance matrix
  const dist = Array(n).fill().map(() => Array(n).fill(Infinity));
  
  // Set distances for direct connections and self-loops
  for (let i = 0; i < n; i++) {
      dist[i][i] = 0;
  }
  
  for (const [u, v] of cities) {
      const uIdx = vertexToIndex[u];
      const vIdx = vertexToIndex[v];
      dist[uIdx][vIdx] = cost_edge;
      dist[vIdx][uIdx] = cost_edge;
  }
  
  // Floyd-Warshall algorithm to find shortest paths
  for (let k = 0; k < n; k++) {
      for (let i = 0; i < n; i++) {
          for (let j = 0; j < n; j++) {
              if (dist[i][j] > dist[i][k] + dist[k][j]) {
                  dist[i][j] = dist[i][k] + dist[k][j];
              }
          }
      }
  }
  
  // Try all possible combinations of special vertices
  let minCost = Infinity;
  let bestSpecialVertices = [];
  
  // Helper function to calculate cost for a given set of special vertices
  function calculateTotalCost(specialVertices) {
      let total = specialVertices.length * cost_lib;
      
      for (let i = 0; i < n; i++) {
          // Find closest special vertex
          let minDistance = Infinity;
          for (const specialVertex of specialVertices) {
              const specialIdx = vertexToIndex[specialVertex];
              minDistance = Math.min(minDistance, dist[i][specialIdx]);
          }
          total += minDistance;
      }
      
      return total;
  }
  
  // Try all subsets of vertices as potential special vertices
  // Start with power set generation
  function generateSubsets(arr) {
      const subsets = [[]];
      for (const item of arr) {
          const len = subsets.length;
          for (let i = 0; i < len; i++) {
              subsets.push([...subsets[i], item]);
          }
      }
      return subsets.filter(subset => subset.length > 0); // Exclude empty set
  }
  
  const allSubsets = generateSubsets(vertices);
  
  for (const subset of allSubsets) {
      const cost = calculateTotalCost(subset);
      if (cost < minCost) {
          minCost = cost;
          bestSpecialVertices = subset;
      }
  }
  
  return {
      specialVertices: bestSpecialVertices,
      totalCost: minCost
  };
}

// Test with sample input
const cities = [[1, 7], [1, 3], [1, 2], [2, 3], [5, 6], [6, 8]];
const cost_lib = 3;
const cost_edge = 2;

const result = findOptimalSpecialVertices(cities, cost_lib, cost_edge);
console.log("Optimal Special Vertices:", result.specialVertices);
console.log("Minimum Total Cost:", result.totalCost);

// Visualization function to help understand the graph
function visualizeGraph(cities) {
  console.log("Graph structure:");
  const graph = {};
  
  for (const [u, v] of cities) {
      if (!graph[u]) graph[u] = [];
      if (!graph[v]) graph[v] = [];
      
      graph[u].push(v);
      graph[v].push(u);
  }
  
  for (const vertex in graph) {
      console.log(`Vertex ${vertex} is connected to: ${graph[vertex].join(', ')}`);
  }
}

visualizeGraph(cities)
