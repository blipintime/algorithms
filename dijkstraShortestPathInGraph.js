/**
 * Implementation of Dijkstra's algorithm to find the shortest path between two nodes in a graph
 * @param {Object} graph - The graph represented as an adjacency list with weights
 * @param {string|number} start - The starting node
 * @param {string|number} end - The destination node
 * @returns {Object} - Object containing the distance and the path
 */
function dijkstra(graph, start, end) {
    // Set up the distance object and visited object
    const distances = {};
    const previous = {};
    const nodes = new PriorityQueue();
    const path = []; // To store the shortest path
    let smallest;
    
    // Initialize the distances and add nodes to priority queue
    for (let node in graph) {
      if (node === start) {
        distances[node] = 0;
        nodes.enqueue(node, 0);
      } else {
        distances[node] = Infinity;
        nodes.enqueue(node, Infinity);
      }
      previous[node] = null;
    }
    
    // Main algorithm loop
    while (nodes.values.length) {
      smallest = nodes.dequeue().val;
      
      // If we've reached the end node
      if (smallest === end) {
        // Build the path
        while (previous[smallest]) {
          path.push(smallest);
          smallest = previous[smallest];
        }
        path.push(start);
        break;
      }
      
      if (smallest || distances[smallest] !== Infinity) {
        for (let neighbor in graph[smallest]) {
          // Calculate new distance to neighboring node
          let nextNode = neighbor;
          let candidate = distances[smallest] + graph[smallest][neighbor];
          
          if (candidate < distances[nextNode]) {
            // Updating new smallest distance
            distances[nextNode] = candidate;
            // Updating previous - How we got to next node
            previous[nextNode] = smallest;
            // Enqueue in priority queue with new priority
            nodes.enqueue(nextNode, candidate);
          }
        }
      }
    }
    
    return {
      distance: distances[end],
      path: path.reverse()
    };
  }
  
  /**
   * Simple priority queue implementation for Dijkstra's algorithm
   */
  class PriorityQueue {
    constructor() {
      this.values = [];
    }
    
    enqueue(val, priority) {
      this.values.push({ val, priority });
      this.sort();
    }
    
    dequeue() {
      return this.values.shift();
    }
    
    sort() {
      this.values.sort((a, b) => a.priority - b.priority);
    }
  }
  
  // Example usage:
  const graph = {
    A: { B: 4, C: 2 },
    B: { A: 4, C: 1, D: 5 },
    C: { A: 2, B: 1, D: 8, E: 10 },
    D: { B: 5, C: 8, E: 2, F: 6 },
    E: { C: 10, D: 2, F: 3 },
    F: { D: 6, E: 3 }
  };
  
  const result = dijkstra(graph, 'A', 'F');
  console.log("Shortest distance:", result.distance);
  console.log("Shortest path:", result.path.join(" -> "));
  