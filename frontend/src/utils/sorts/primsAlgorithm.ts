
import { AlgorithmResult } from '../types/visualizationTypes';
import { createElementArray, addStep, updateElementStates } from '../visualization/stateManager';

// For Prim's algorithm, we need a different visualization approach
// Since it works with graphs, not arrays, we'll provide a visual representation
export function primsAlgorithm(array: number[]): AlgorithmResult {
  // For demonstration, we'll create a simple adjacency matrix from the array
  const n = Math.min(5, array.length); // Limit size for simplicity
  const graph: number[][] = [];
  
  // Create a simple connected graph using the array values as weights
  for (let i = 0; i < n; i++) {
    graph[i] = [];
    for (let j = 0; j < n; j++) {
      if (i === j) {
        graph[i][j] = 0;
      } else {
        // Use array values as weights, or generate if needed
        const index = i * n + j;
        graph[i][j] = index < array.length ? array[index] : Math.floor(Math.random() * 10) + 1;
      }
    }
  }
  
  // Output for displaying the graph
  const output: string[] = [];
  output.push("Adjacency Matrix (Graph):");
  for (let i = 0; i < n; i++) {
    output.push(`Node ${i}: ${graph[i].join(', ')}`);
  }
  
  // Creating visualization steps
  const visualElements = createElementArray(array);
  const steps = [];
  
  // Initial state
  addStep(steps, visualElements, "Initial array values represent edge weights in our graph");
  
  // Prim's algorithm implementation
  const parent: number[] = Array(n).fill(-1);
  const key: number[] = Array(n).fill(Number.MAX_SAFE_INTEGER);
  const mstSet: boolean[] = Array(n).fill(false);
  
  // Start with vertex 0
  key[0] = 0;
  
  output.push("\nExecuting Prim's Algorithm:");
  addStep(steps, visualElements, "Starting Prim's Algorithm with node 0");
  
  for (let count = 0; count < n - 1; count++) {
    // Find the minimum key vertex from the set of vertices not yet in MST
    let min = Number.MAX_SAFE_INTEGER;
    let minIndex = -1;
    
    for (let v = 0; v < n; v++) {
      if (!mstSet[v] && key[v] < min) {
        min = key[v];
        minIndex = v;
      }
    }
    
    // Add the picked vertex to the MST Set
    mstSet[minIndex] = true;
    output.push(`Added vertex ${minIndex} to MST`);
    
    // Mark the selected vertex in the visualization
    updateElementStates(visualElements, [minIndex], 'selected');
    addStep(steps, visualElements, `Added vertex ${minIndex} to MST`);
    
    // Update key and parent values of adjacent vertices
    for (let v = 0; v < n; v++) {
      if (graph[minIndex][v] && !mstSet[v] && graph[minIndex][v] < key[v]) {
        parent[v] = minIndex;
        key[v] = graph[minIndex][v];
        
        // Visualize this update
        updateElementStates(visualElements, [v], 'comparing');
        addStep(steps, visualElements, `Updated: vertex ${v}, parent=${minIndex}, weight=${key[v]}`);
        output.push(`Updated: vertex ${v}, parent=${minIndex}, weight=${key[v]}`);
      }
    }
  }
  
  // Print the constructed MST
  output.push("\nMinimum Spanning Tree Edges:");
  let totalWeight = 0;
  for (let i = 1; i < n; i++) {
    output.push(`Edge: ${parent[i]} - ${i}, Weight: ${graph[i][parent[i]]}`);
    totalWeight += graph[i][parent[i]];
    
    // Mark sorted vertices in the visualization
    updateElementStates(visualElements, [parent[i], i], 'sorted');
    addStep(steps, visualElements, `Edge added to MST: ${parent[i]} - ${i}, Weight: ${graph[i][parent[i]]}`);
  }
  output.push(`Total MST Weight: ${totalWeight}`);
  
  // Final step - all vertices are now part of MST
  for (let i = 0; i < visualElements.length; i++) {
    visualElements[i].state = 'sorted';
  }
  addStep(steps, visualElements, `Minimum Spanning Tree completed with total weight: ${totalWeight}`);
  
  return {
    steps,
    output,
    sortedArray: array,
    algorithmName: "Prim's Algorithm"
  };
}
