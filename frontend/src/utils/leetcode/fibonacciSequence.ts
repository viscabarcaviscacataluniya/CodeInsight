
import { AlgorithmResult } from '../types/visualizationTypes';
import { createElementArray, addStep, updateElementStates } from '../visualization/stateManager';

export function fibonacciSequence(array: number[]): AlgorithmResult {
  const output: string[] = [];
  
  // Use the first element as n, or default to 10
  const n = array.length > 0 ? Math.min(array[0], 15) : 10;
  
  // Create array to hold fibonacci sequence
  const fibArray = Array(n).fill(0);
  const visualElements = createElementArray(fibArray);
  const steps = [];
  
  output.push(`Generating Fibonacci sequence up to ${n} terms`);
  addStep(steps, visualElements, `Generating Fibonacci sequence up to ${n} terms`);
  
  if (n <= 0) {
    output.push("Invalid input: n must be positive");
    return {
      steps,
      output,
      sortedArray: [],
      algorithmName: "Fibonacci Sequence"
    };
  }
  
  // Base cases
  if (n >= 1) {
    fibArray[0] = 0;
    visualElements[0].value = 0;
    updateElementStates(visualElements, [0], 'sorted');
    addStep(steps, visualElements, `F(0) = 0`);
    output.push(`F(0) = 0`);
  }
  
  if (n >= 2) {
    fibArray[1] = 1;
    visualElements[1].value = 1;
    updateElementStates(visualElements, [1], 'sorted');
    addStep(steps, visualElements, `F(1) = 1`);
    output.push(`F(1) = 1`);
  }
  
  // Generate remaining terms
  for (let i = 2; i < n; i++) {
    // Highlight the two previous numbers being added
    updateElementStates(visualElements, [i-2, i-1], 'comparing');
    addStep(steps, visualElements, `Computing F(${i}) = F(${i-1}) + F(${i-2}) = ${fibArray[i-1]} + ${fibArray[i-2]}`);
    
    fibArray[i] = fibArray[i-1] + fibArray[i-2];
    visualElements[i].value = fibArray[i];
    
    // Show the result
    updateElementStates(visualElements, [i], 'selected');
    addStep(steps, visualElements, `F(${i}) = ${fibArray[i]}`);
    output.push(`F(${i}) = ${fibArray[i]}`);
    
    // Mark as completed
    updateElementStates(visualElements, [i], 'sorted');
  }
  
  addStep(steps, visualElements, `Fibonacci sequence complete: ${fibArray.join(', ')}`);
  output.push(`Complete sequence: ${fibArray.join(', ')}`);
  
  return {
    steps,
    output,
    sortedArray: fibArray,
    algorithmName: "Fibonacci Sequence"
  };
}
