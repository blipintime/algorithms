// Graph representation using adjacency list
class Graph {
    constructor() {
      this.adjacencyList = {};
    }
    
    // Add a vertex to the graph
    addVertex(vertex) {
      if (!this.adjacencyList[vertex]) {
        this.adjacencyList[vertex] = [];
      }
    }
    
    // Add an edge between two vertices
    addEdge(vertex1, vertex2) {
      this.adjacencyList[vertex1].push(vertex2);
      this.adjacencyList[vertex2].push(vertex1); // For undirected graph
    }
    
    // Breadth-First Search implementation
    breadthFirstSearch(startVertex) {
      // Create a queue for BFS
      const queue = [startVertex];
      // Create a set to store visited vertices
      const visited = new Set();
      visited.add(startVertex);
      // Store the BFS traversal result
      const result = [];
      
      // Continue until queue is empty
      while (queue.length) {
        // Dequeue a vertex from queue
        const currentVertex = queue.shift();
        result.push(currentVertex);
        
        // Get all adjacent vertices of the dequeued vertex
        // If an adjacent vertex has not been visited, mark it as visited and enqueue it
        this.adjacencyList[currentVertex].forEach(neighbor => {
          if (!visited.has(neighbor)) {
            visited.add(neighbor);
            queue.push(neighbor);
          }
        });
      }
      
      return result;
    }
    
    // BFS to find shortest path between two vertices
    shortestPath(startVertex, endVertex) {
      if (startVertex === endVertex) {
        return [startVertex];
      }
      
      // Create a queue for BFS
      const queue = [startVertex];
      // Create a set to store visited vertices
      const visited = new Set();
      visited.add(startVertex);
      // Store predecessors to reconstruct the path
      const predecessors = {};
      
      // Continue until queue is empty
      while (queue.length) {
        // Dequeue a vertex from queue
        const currentVertex = queue.shift();
        
        // Process all neighbors of the current vertex
        for (const neighbor of this.adjacencyList[currentVertex]) {
          if (!visited.has(neighbor)) {
            // Mark as visited and enqueue
            visited.add(neighbor);
            queue.push(neighbor);
            // Set predecessor for path reconstruction
            predecessors[neighbor] = currentVertex;
            
            // If we found the end vertex, reconstruct and return the path
            if (neighbor === endVertex) {
              const path = [endVertex];
              let current = endVertex;
              
              while (current !== startVertex) {
                current = predecessors[current];
                path.unshift(current);
              }
              
              return path;
            }
          }
        }
      }
      
      // No path found
      return null;
    }
  }
  
  // Example usage:
  const graph = new Graph();
  
  // Add vertices
  ['A', 'B', 'C', 'D', 'E', 'F'].forEach(vertex => graph.addVertex(vertex));
  
  // Add edges
//   graph.addEdge('A', 'B');
//   graph.addEdge('A', 'C');
//   graph.addEdge('B', 'D');
//   graph.addEdge('C', 'E');
//   graph.addEdge('D', 'E');
//   graph.addEdge('D', 'F');
//   graph.addEdge('E', 'F');
graph.addEdge('A', 'B')
graph.addEdge('B', 'F')
graph.addEdge('A', 'F')
  
  // Perform BFS traversal starting from vertex 'A'
  //console.log("BFS Traversal:", graph.breadthFirstSearch('A'));
  // Output: BFS Traversal: ['A', 'B', 'C', 'D', 'E', 'F']
  
  // Find shortest path from 'A' to 'F'
  console.log("Shortest path from A to F:", graph.shortestPath('A', 'F'));
  // Output: Shortest path from A to F: ['A', 'B', 'D', 'F'] or ['A', 'C', 'E', 'F'] depending on implementation details
