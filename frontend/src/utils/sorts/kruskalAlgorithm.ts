
import { AlgorithmResult } from '../types/visualizationTypes';
import { createElementArray, addStep, updateElementStates } from '../visualization/stateManager';

// Edge representation for Kruskal's algorithm
interface Edge {
  src: number;
  dest: number;
  weight: number;
}

// Find operation for Union-Find data structure
function find(parent: number[], i: number): number {
  if (parent[i] !== i) {
    parent[i] = find(parent, parent[i]);
  }
  return parent[i];
}

// Union operation for Union-Find data structure
function union(parent: number[], rank: number[], x: number, y: number): void {
  const rootX = find(parent, x);
  const rootY = find(parent, y);
  
  if (rootX === rootY) return;
  
  if (rank[rootX] < rank[rootY]) {
    parent[rootX] = rootY;
  } else if (rank[rootX] > rank[rootY]) {
    parent[rootY] = rootX;
  } else {
    parent[rootY] = rootX;
    rank[rootX]++;
  }
}

export function kruskalAlgorithm(array: number[]): AlgorithmResult {
  // For demonstration, create a simple graph from the array
  const n = Math.min(5, array.length); // Limit size for simplicity
  const edges: Edge[] = [];
  
  // Create edges for a complete graph using array values as weights
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const index = i * n + j;
      const weight = index < array.length ? array[index] : Math.floor(Math.random() * 10) + 1;
      edges.push({ src: i, dest: j, weight });
    }
  }
  
  // Sort edges by weight
  edges.sort((a, b) => a.weight - b.weight);
  
  const output: string[] = [];
  output.push("Graph Edges:");
  edges.forEach(edge => {
    output.push(`Edge ${edge.src} - ${edge.dest}: Weight ${edge.weight}`);
  });
  
  // Setup visualization
  const visualElements = createElementArray(array);
  const steps = [];
  
  // Initial state
  addStep(steps, visualElements, "Initial array values represent edge weights in our graph");
  
  // Kruskal's algorithm implementation
  const parent: number[] = [];
  const rank: number[] = [];
  
  // Initialize parent and rank
  for (let i = 0; i < n; i++) {
    parent[i] = i;
    rank[i] = 0;
  }
  
  output.push("\nExecuting Kruskal's Algorithm:");
  addStep(steps, visualElements, "Starting Kruskal's Algorithm - Examining edges by weight");
  
  const result: Edge[] = [];
  let e = 0;
  let i = 0;
  
  while (e < n - 1 && i < edges.length) {
    const nextEdge = edges[i++];
    
    const x = find(parent, nextEdge.src);
    const y = find(parent, nextEdge.dest);
    
    output.push(`Checking edge ${nextEdge.src} - ${nextEdge.dest} (weight: ${nextEdge.weight})`);
    
    // Update visualization to show examining edge
    updateElementStates(visualElements, [nextEdge.src, nextEdge.dest], 'comparing');
    addStep(steps, visualElements, `Checking edge ${nextEdge.src} - ${nextEdge.dest} (weight: ${nextEdge.weight})`);
    
    // If including this edge doesn't cause a cycle, add it to the result
    if (x !== y) {
      result.push(nextEdge);
      union(parent, rank, x, y);
      output.push(`Added edge ${nextEdge.src} - ${nextEdge.dest} to MST`);
      
      // Update visualization to show edge in MST
      updateElementStates(visualElements, [nextEdge.src, nextEdge.dest], 'sorted');
      addStep(steps, visualElements, `Added edge ${nextEdge.src} - ${nextEdge.dest} to MST`);
      
      e++;
    } else {
      output.push(`Skipped edge ${nextEdge.src} - ${nextEdge.dest} (would create a cycle)`);
      
      // Update visualization to show rejected edge
      updateElementStates(visualElements, [nextEdge.src, nextEdge.dest], 'swapping');
      addStep(steps, visualElements, `Skipped edge ${nextEdge.src} - ${nextEdge.dest} (would create a cycle)`);
      
      // Reset state for the next iteration
      updateElementStates(visualElements, [nextEdge.src, nextEdge.dest], 'default');
    }
  }
  
  // Print the MST
  output.push("\nMinimum Spanning Tree Edges:");
  let totalWeight = 0;
  for (let i = 0; i < result.length; i++) {
    output.push(`Edge: ${result[i].src} - ${result[i].dest}, Weight: ${result[i].weight}`);
    totalWeight += result[i].weight;
  }
  output.push(`Total MST Weight: ${totalWeight}`);
  
  // Final step - highlight all vertices in the MST
  for (let i = 0; i < n; i++) {
    visualElements[i].state = 'sorted';
  }
  addStep(steps, visualElements, `Minimum Spanning Tree completed with total weight: ${totalWeight}`);
  
  return {
    steps,
    output,
    sortedArray: array,
    algorithmName: "Kruskal's Algorithm"
  };
}
