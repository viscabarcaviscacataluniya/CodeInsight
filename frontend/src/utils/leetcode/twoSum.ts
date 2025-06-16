
import { AlgorithmResult } from '../types/visualizationTypes';
import { createElementArray, addStep, updateElementStates } from '../visualization/stateManager';

export function twoSum(array: number[]): AlgorithmResult {
  const output: string[] = [];
  const visualElements = createElementArray(array);
  const steps = [];
  
  // Use the first element as target sum or calculate a reasonable target
  // that will have a solution for demonstration purposes
  let target: number;
  
  if (array.length >= 3) {
    // Choose a target that will have a solution (sum of two different elements)
    target = array[0] + array[1];
  } else if (array.length === 2) {
    target = array[0] + array[1];
  } else if (array.length === 1) {
    // Not enough elements for a real solution
    target = array[0] * 2; // This will look for the same element twice
  } else {
    // Empty array case
    output.push("Array is empty. Cannot solve Two Sum.");
    return {
      steps,
      output,
      sortedArray: array,
      algorithmName: "Two Sum"
    };
  }
  
  output.push(`Finding two numbers that sum to ${target}`);
  
  // Initial state
  addStep(steps, visualElements, `Looking for two numbers that sum to ${target}`);
  
  // Hash map to store visited numbers and their indices
  const map = new Map<number, number>();
  
  for (let i = 0; i < array.length; i++) {
    const complement = target - array[i];
    
    // Mark current element as being examined
    updateElementStates(visualElements, [i], 'comparing');
    addStep(steps, visualElements, `Examining index ${i}: ${array[i]}, looking for complement ${complement}`);
    
    if (map.has(complement)) {
      const complementIndex = map.get(complement)!;
      output.push(`Found solution: indices ${complementIndex} and ${i}`);
      output.push(`Values: ${array[complementIndex]} + ${array[i]} = ${target}`);
      
      // Show the solution
      updateElementStates(visualElements, [complementIndex, i], 'sorted');
      addStep(steps, visualElements, `Found solution! Indices ${complementIndex} and ${i}: ${array[complementIndex]} + ${array[i]} = ${target}`);
      
      return {
        steps,
        output,
        sortedArray: array,
        algorithmName: "Two Sum"
      };
    }
    
    // Add current element to hash map
    map.set(array[i], i);
    
    // Reset current element to default state for next iteration
    updateElementStates(visualElements, [i], 'default');
    
    if (i < array.length - 1) {
      addStep(steps, visualElements, `Moving to next element`);
    }
  }
  
  // No solution found
  output.push("No solution found");
  addStep(steps, visualElements, "No solution found");
  
  return {
    steps,
    output,
    sortedArray: array,
    algorithmName: "Two Sum"
  };
}
