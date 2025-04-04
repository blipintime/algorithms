// Graph implementation using adjacency list
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
      if (this.adjacencyList[vertex1] && this.adjacencyList[vertex2]) {
        this.adjacencyList[vertex1].push(vertex2);
        this.adjacencyList[vertex2].push(vertex1); // For undirected graph
      }
    }
  
    // DFS implementation using recursion
    dfsRecursive(start) {
      const result = [];
      const visited = {};
      const adjacencyList = this.adjacencyList;
  
      // Inner recursive function
      function dfs(vertex) {
        if (!vertex) return null;
        
        // Mark vertex as visited
        visited[vertex] = true;
        // Add to result
        result.push(vertex);
        
        // Visit all neighbors that haven't been visited
        adjacencyList[vertex].forEach(neighbor => {
          if (!visited[neighbor]) {
            return dfs(neighbor);
          }
        });
      }
  
      dfs(start);
      return result;
    }
  
    // DFS implementation using iteration (stack)
    dfsIterative(start) {
      const stack = [start];
      const result = [];
      const visited = {};
      visited[start] = true;
  
      while (stack.length) {
        const currentVertex = stack.pop();
        result.push(currentVertex);
  
        // Get all adjacent vertices, if not visited, mark as visited and push to stack
        this.adjacencyList[currentVertex].forEach(neighbor => {
          if (!visited[neighbor]) {
            visited[neighbor] = true;
            stack.push(neighbor);
          }
        });
      }
  
      return result;
    }
  }
  
  // Example usage
  const graph = new Graph();
  
  // Add vertices
  ['A', 'B', 'C', 'D', 'E', 'F'].forEach(vertex => graph.addVertex(vertex));
  
  // Add edges to create the following graph:
  // A --- B --- C
  // |     |
  // D --- E --- F
  graph.addEdge('A', 'B');
  graph.addEdge('A', 'D');
  graph.addEdge('B', 'C');
  graph.addEdge('B', 'E');
  graph.addEdge('D', 'E');
  graph.addEdge('E', 'F');
  
  // Perform DFS starting from vertex 'A'
  console.log("DFS Recursive:", graph.dfsRecursive('A'));
  console.log("DFS Iterative:", graph.dfsIterative('A'));
  