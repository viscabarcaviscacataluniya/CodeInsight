
import { AlgorithmResult } from '../types/visualizationTypes';
import { createElementArray, addStep, updateElementStates } from '../visualization/stateManager';

export function maxSubarray(array: number[]): AlgorithmResult {
  const output: string[] = [];
  const visualElements = createElementArray(array);
  const steps = [];
  
  // Initial state
  output.push(`Finding maximum subarray sum in [${array.join(', ')}]`);
  addStep(steps, visualElements, `Finding maximum subarray sum with Kadane's algorithm`);
  
  if (array.length === 0) {
    output.push("Array is empty");
    return {
      steps,
      output,
      sortedArray: array,
      algorithmName: "Maximum Subarray"
    };
  }
  
  let maxSoFar = array[0];
  let maxEndingHere = array[0];
  let startIndex = 0;
  let endIndex = 0;
  let tempStartIndex = 0;
  
  // Highlight first element
  updateElementStates(visualElements, [0], 'selected');
  addStep(steps, visualElements, `Initialize maxSoFar = ${maxSoFar}, maxEndingHere = ${maxEndingHere}`);
  
  for (let i = 1; i < array.length; i++) {
    // Mark current element as being examined
    updateElementStates(visualElements, [i], 'comparing');
    addStep(steps, visualElements, `Examining element at index ${i}: ${array[i]}`);
    
    // Calculate new maxEndingHere
    const newSum = maxEndingHere + array[i];
    if (array[i] > newSum) {
      maxEndingHere = array[i];
      tempStartIndex = i;
      
      // Visualize new subarray start
      for (let j = 0; j < array.length; j++) {
        visualElements[j].state = j === i ? 'selected' : 'default';
      }
      addStep(steps, visualElements, `Starting new subarray at index ${i} with value ${array[i]}`);
    } else {
      maxEndingHere = newSum;
      
      // Visualize extended subarray
      for (let j = 0; j < array.length; j++) {
        if (j >= tempStartIndex && j <= i) {
          visualElements[j].state = 'selected';
        } else {
          visualElements[j].state = 'default';
        }
      }
      addStep(steps, visualElements, `Extended subarray [${tempStartIndex}...${i}] with sum ${maxEndingHere}`);
    }
    
    // Update maxSoFar if needed
    if (maxEndingHere > maxSoFar) {
      maxSoFar = maxEndingHere;
      startIndex = tempStartIndex;
      endIndex = i;
      
      // Highlight new best subarray
      for (let j = 0; j < array.length; j++) {
        if (j >= startIndex && j <= endIndex) {
          visualElements[j].state = 'sorted';
        } else {
          visualElements[j].state = 'default';
        }
      }
      addStep(steps, visualElements, `Found new maximum subarray [${startIndex}...${endIndex}] with sum ${maxSoFar}`);
      output.push(`New maximum subarray [${startIndex}...${endIndex}] with sum ${maxSoFar}`);
    }
  }
  
  // Final result
  for (let j = 0; j < array.length; j++) {
    if (j >= startIndex && j <= endIndex) {
      visualElements[j].state = 'sorted';
    } else {
      visualElements[j].state = 'default';
    }
  }
  addStep(steps, visualElements, `Maximum subarray is [${startIndex}...${endIndex}] with sum ${maxSoFar}`);
  output.push(`Maximum subarray sum: ${maxSoFar}`);
  
  return {
    steps,
    output,
    sortedArray: array,
    algorithmName: "Maximum Subarray"
  };
}
