
import { AlgorithmResult } from '../types/visualizationTypes';
import { createElementArray, addStep, updateElementStates } from '../visualization/stateManager';

export function jumpGame(array: number[]): AlgorithmResult {
  const output: string[] = [];
  const visualElements = createElementArray(array);
  const steps = [];
  
  if (array.length === 0) {
    output.push("Array is empty");
    return {
      steps,
      output,
      sortedArray: array,
      algorithmName: "Jump Game"
    };
  }
  
  output.push(`Starting Jump Game with array: [${array.join(', ')}]`);
  addStep(steps, visualElements, `Starting Jump Game with array: [${array.join(', ')}]`);
  
  // Initialize maxReach to track the farthest we can reach
  let maxReach = 0;
  updateElementStates(visualElements, [0], 'selected');
  addStep(steps, visualElements, `Starting at index 0 with value ${array[0]}`);
  
  for (let i = 0; i < array.length; i++) {
    // If we can't reach current position, it's impossible to reach the end
    if (i > maxReach) {
      updateElementStates(visualElements, [i], 'swapping');
      addStep(steps, visualElements, `Cannot reach index ${i}. Game over!`);
      output.push(`Cannot reach the end! Stuck at index ${i-1}`);
      
      return {
        steps,
        output,
        sortedArray: array,
        algorithmName: "Jump Game"
      };
    }
    
    // Mark current position
    updateElementStates(visualElements, [i], 'comparing');
    addStep(steps, visualElements, `At index ${i} with value ${array[i]}`);
    
    // Update max reach
    const newReach = i + array[i];
    if (newReach > maxReach) {
      maxReach = newReach;
      output.push(`New maximum reach: index ${maxReach}`);
      
      // Visualize the maximum jump range
      const jumpRange = [];
      for (let j = i + 1; j <= Math.min(maxReach, array.length - 1); j++) {
        jumpRange.push(j);
      }
      updateElementStates(visualElements, jumpRange, 'selected');
      addStep(steps, visualElements, `Jumped from index ${i} and can now reach up to index ${maxReach}`);
    }
    
    // Check if we can reach the end
    if (maxReach >= array.length - 1) {
      updateElementStates(visualElements, [array.length - 1], 'sorted');
      addStep(steps, visualElements, `Success! Can reach the last index ${array.length - 1}`);
      output.push(`Success! Can reach the last index ${array.length - 1}`);
      
      break;
    }
    
    // Reset current element visualization
    updateElementStates(visualElements, [i], 'default');
  }
  
  // Final state: mark all visited positions
  for (let i = 0; i <= Math.min(maxReach, array.length - 1); i++) {
    visualElements[i].state = 'sorted';
  }
  addStep(steps, visualElements, `Jump Game completed. ${maxReach >= array.length - 1 ? 'Success!' : 'Failed!'}`);
  
  return {
    steps,
    output,
    sortedArray: array,
    algorithmName: "Jump Game"
  };
}
