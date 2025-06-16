
import { AlgorithmResult } from '../types/visualizationTypes';
import { createElementArray, addStep, updateElementStates } from '../visualization/stateManager';

export function climbingStairs(array: number[]): AlgorithmResult {
  const output: string[] = [];
  
  // Use first element as number of stairs or default to 5
  const n = array.length > 0 ? Math.min(array[0], 20) : 5;
  
  // Create visualization array for Fibonacci sequence calculation
  const visualElements = createElementArray(Array(n + 1).fill(0));
  
  // Set visualization type for all elements
  visualElements.forEach(el => {
    el.visualType = 'stairs';
  });
  
  const steps = [];
  
  output.push(`Finding ways to climb ${n} stairs, taking 1 or 2 steps at a time`);
  addStep(steps, visualElements, `Finding ways to climb ${n} stairs`);
  
  if (n <= 0) {
    output.push("Invalid number of stairs");
    return {
      steps,
      output,
      sortedArray: array,
      algorithmName: "Climbing Stairs"
    };
  }
  
  // Base cases
  visualElements[0].value = 1;
  if (n >= 1) {
    visualElements[1].value = 1;
    updateElementStates(visualElements, [0, 1], 'sorted');
    addStep(steps, visualElements, `Base cases: ways[0] = 1, ways[1] = 1`);
  } else {
    updateElementStates(visualElements, [0], 'sorted');
    addStep(steps, visualElements, `Base case: ways[0] = 1`);
  }
  
  // Dynamic Programming: ways[i] = ways[i-1] + ways[i-2]
  for (let i = 2; i <= n; i++) {
    // Highlight previous two values we'll use
    updateElementStates(visualElements, [i-1, i-2], 'comparing');
    addStep(steps, visualElements, `Calculating ways[${i}] = ways[${i-1}] + ways[${i-2}] = ${visualElements[i-1].value} + ${visualElements[i-2].value}`);
    
    // Calculate ways for current step
    visualElements[i].value = visualElements[i-1].value + visualElements[i-2].value;
    updateElementStates(visualElements, [i], 'selected');
    addStep(steps, visualElements, `ways[${i}] = ${visualElements[i].value}`);
    
    // Reset previous states and mark current as processed
    updateElementStates(visualElements, [i-1, i-2], 'sorted');
    updateElementStates(visualElements, [i], 'sorted');
    
    // Add a clear explanation of what the number means
    addStep(steps, visualElements, `There are ${visualElements[i].value} ways to climb ${i} stairs`);
  }
  
  output.push(`Number of ways to climb ${n} stairs: ${visualElements[n].value}`);
  addStep(steps, visualElements, `Total ways to climb ${n} stairs: ${visualElements[n].value}`);
  
  return {
    steps,
    output,
    sortedArray: array,
    algorithmName: "Climbing Stairs"
  };
}
