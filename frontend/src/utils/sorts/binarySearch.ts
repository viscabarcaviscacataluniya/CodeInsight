
import { 
  createElementArray, 
  addStep, 
  updateElementStates
} from '../visualization/stateManager';
import { AlgorithmResult, VisualizationStep } from '../types/visualizationTypes';

export function binarySearch(array: number[]): AlgorithmResult {
  const steps: VisualizationStep[] = [];
  const output: string[] = [];
  
  // Sort the array first (binary search requires a sorted array)
  const sortedArray = [...array].sort((a, b) => a - b);
  const elementArray = createElementArray(sortedArray);
  
  // Add initial state
  addStep(steps, elementArray, "Initial sorted array (binary search requires a sorted array)");
  
  if (sortedArray.length === 0) {
    output.push("Empty array provided");
    return {
      steps,
      output,
      sortedArray,
      algorithmName: "Binary Search"
    };
  }
  
  // Use a value that is definitely in the array for demo purposes
  const targetIndex = Math.floor(sortedArray.length / 2);
  const target = sortedArray[targetIndex];
  
  output.push(`Searching for value: ${target} in sorted array`);
  addStep(steps, elementArray, `Searching for value: ${target} in sorted array`);
  
  let left = 0;
  let right = sortedArray.length - 1;
  let found = false;
  let foundIndex = -1;
  let iteration = 0;
  
  while (left <= right) {
    iteration++;
    // Reset all elements to default state
    for (let i = 0; i < elementArray.length; i++) {
      if (i < left || i > right) {
        elementArray[i].state = 'default';
      } else {
        elementArray[i].state = 'comparing';
      }
    }
    
    const mid = Math.floor((left + right) / 2);
    updateElementStates(elementArray, [mid], 'selected');
    
    addStep(steps, elementArray, `Iteration ${iteration}: Checking middle element at index ${mid}: ${sortedArray[mid]}`);
    
    if (sortedArray[mid] === target) {
      updateElementStates(elementArray, [mid], 'sorted');
      addStep(steps, elementArray, `Found ${target} at index ${mid}`);
      found = true;
      foundIndex = mid;
      break;
    } else if (sortedArray[mid] > target) {
      right = mid - 1;
      addStep(steps, elementArray, `${target} is smaller than ${sortedArray[mid]}, searching left half`);
    } else {
      left = mid + 1;
      addStep(steps, elementArray, `${target} is larger than ${sortedArray[mid]}, searching right half`);
    }
  }
  
  // Final state
  for (let i = 0; i < elementArray.length; i++) {
    if (i === foundIndex) {
      elementArray[i].state = 'sorted';
    } else {
      elementArray[i].state = 'default';
    }
  }
  
  if (!found) {
    addStep(steps, elementArray, `Value ${target} not found in the array`);
    output.push(`Value ${target} not found in the array`);
  } else {
    output.push(`Found value ${target} at index ${foundIndex}`);
  }
  
  return {
    steps,
    output,
    sortedArray: sortedArray,
    algorithmName: "Binary Search"
  };
}
