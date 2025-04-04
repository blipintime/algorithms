// Bellman-Ford Algorithm Implementation
// This algorithm finds the shortest paths from a source vertex to all other vertices,
// and can detect negative weight cycles in the graph.

/**
 * Implements the Bellman-Ford algorithm to find shortest paths from a source vertex
 * @param {Array<Array<number>>} edges - Array of edges, where each edge is [from, to, weight]
 * @param {number} vertices - Number of vertices in the graph
 * @param {number} source - Source vertex to find shortest paths from
 * @returns {Object} Object containing distances and predecessors arrays, or information about negative cycle
 */
function bellmanFord(edges, vertices, source) {
    // Initialize distances with Infinity and predecessor with null
    const distances = Array(vertices).fill(Infinity);
    const predecessors = Array(vertices).fill(null);
    
    // Distance from source to itself is 0
    distances[source] = 0;
    
    // Relax all edges |V| - 1 times
    for (let i = 0; i < vertices - 1; i++) {
      let updated = false;
      
      for (const [from, to, weight] of edges) {
        // If we can improve the distance to 'to' by going through 'from'
        if (distances[from] !== Infinity && distances[from] + weight < distances[to]) {
          distances[to] = distances[from] + weight;
          predecessors[to] = from;
          updated = true;
        }
      }
      
      // Early termination if no updates were made in this iteration
      if (!updated) break;
    }
    
    // Check for negative weight cycles
    // If we can still relax edges, then there is a negative weight cycle
    const negativeCycle = [];
    for (const [from, to, weight] of edges) {
      if (distances[from] !== Infinity && distances[from] + weight < distances[to]) {
        // Found a negative cycle
        return {
          hasNegativeCycle: true,
          negativeCycleAt: to,
          distances,
          predecessors
        };
      }
    }
    
    return {
      hasNegativeCycle: false,
      distances,
      predecessors
    };
  }
  
  /**
   * Reconstructs the path from source to destination using predecessor array
   * @param {Array<number>} predecessors - Array of predecessors from Bellman-Ford
   * @param {number} destination - Destination vertex
   * @returns {Array<number>} Path from source to destination
   */
  function getPath(predecessors, destination) {
    const path = [];
    let current = destination;
    
    // If destination is unreachable
    if (predecessors[current] === null) {
      return [];
    }
    
    while (current !== null) {
      path.unshift(current);
      current = predecessors[current];
    }
    
    return path;
  }
  
  // Example usage
  function example() {
    // Example graph:
    // 0 --- 1 --- 2
    // |     |     |
    // 3 --- 4 --- 5
    
    const edges = [
      [0, 1, 4],  // Edge from 0 to 1 with weight 4
      [0, 3, 2],  // Edge from 0 to 3 with weight 2
      [1, 0, 4],  // Edge from 1 to 0 with weight 4
      [1, 2, 3],  // Edge from 1 to 2 with weight 3
      [1, 4, 1],  // Edge from 1 to 4 with weight 1
      [2, 1, 3],  // Edge from 2 to 1 with weight 3
      [2, 5, 2],  // Edge from 2 to 5 with weight 2
      [3, 0, 2],  // Edge from 3 to 0 with weight 2
      [3, 4, 3],  // Edge from 3 to 4 with weight 3
      [4, 1, 1],  // Edge from 4 to 1 with weight 1
      [4, 3, 3],  // Edge from 4 to 3 with weight 3
      [4, 5, 5],  // Edge from 4 to 5 with weight 5
      [5, 2, 2],  // Edge from 5 to 2 with weight 2
      [5, 4, 5]   // Edge from 5 to 4 with weight 5
    ];
    
    const vertices = 6;
    const source = 0;
    
    const result = bellmanFord(edges, vertices, source);
    
    if (result.hasNegativeCycle) {
      console.log("Graph contains a negative weight cycle, cannot determine shortest paths.");
      console.log("Negative cycle detected at vertex:", result.negativeCycleAt);
    } else {
      console.log("Shortest distances from source vertex", source, ":");
      for (let i = 0; i < vertices; i++) {
        console.log(`Vertex ${i}: ${result.distances[i]}`);
        
        const path = getPath(result.predecessors, i);
        console.log(`Path to vertex ${i}: ${path.join(' -> ')}`);
      }
    }
    
    // Let's add a negative weight cycle to demonstrate detection
    console.log("\nAdding a negative weight cycle (2->1->4->5->2):");
    const edgesWithNegativeCycle = [...edges];
    // Modify the weights to create a negative cycle
    edgesWithNegativeCycle[3][2] = -2;  // Edge from 1 to 2 with weight -2
    edgesWithNegativeCycle[10][2] = -2; // Edge from 4 to 3 with weight -2
    
    const resultWithNegativeCycle = bellmanFord(edgesWithNegativeCycle, vertices, source);
    
    if (resultWithNegativeCycle.hasNegativeCycle) {
      console.log("Graph contains a negative weight cycle, cannot determine shortest paths.");
      console.log("Negative cycle detected at vertex:", resultWithNegativeCycle.negativeCycleAt);
    }
  }
  
  // Run the example
  example();
  