
import { 
  createElementArray, 
  addStep, 
  updateElementStates
} from '../visualization/stateManager';
import { AlgorithmResult, VisualizationStep } from '../types/visualizationTypes';

export function linearSearch(array: number[]): AlgorithmResult {
  const steps: VisualizationStep[] = [];
  const output: string[] = [];
  const elementArray = createElementArray(array);
  
  // Add initial state
  addStep(steps, elementArray, "Initial array");
  
  if (array.length === 0) {
    output.push("Empty array provided");
    return {
      steps,
      output,
      sortedArray: array,
      algorithmName: "Linear Search"
    };
  }
  
  // Determine target - always use an element that exists in the array for demo purposes
  const targetIndex = Math.floor(array.length / 2);  // Use middle element for consistent demos
  const target = array[targetIndex];
  output.push(`Searching for value: ${target}`);
  addStep(steps, elementArray, `Searching for value: ${target}`);
  
  let found = false;
  let foundIndex = -1;
  
  for (let i = 0; i < array.length; i++) {
    // Mark current element as being compared
    updateElementStates(elementArray, [i], 'comparing');
    addStep(steps, elementArray, `Checking element at index ${i}: ${array[i]}`);
    
    if (array[i] === target) {
      // Mark the found element
      updateElementStates(elementArray, [i], 'selected');
      foundIndex = i;
      found = true;
      addStep(steps, elementArray, `Found ${target} at index ${i}`);
      updateElementStates(elementArray, [i], 'sorted');
      break;
    }
    
    // Reset the current element to default state
    updateElementStates(elementArray, [i], 'default');
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
    sortedArray: array,
    algorithmName: "Linear Search"
  };
}
