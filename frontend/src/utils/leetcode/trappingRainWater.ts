
import { AlgorithmResult } from '../types/visualizationTypes';
import { createElementArray, addStep, updateElementStates } from '../visualization/stateManager';

export function trappingRainWater(array: number[]): AlgorithmResult {
  const output: string[] = [];
  const visualElements = createElementArray(array);
  
  // Set visualization type for all elements
  visualElements.forEach(el => {
    el.visualType = 'trappingRainWater';
  });
  
  const steps = [];
  
  output.push(`Calculating trapped rainwater with heights: [${array.join(', ')}]`);
  addStep(steps, visualElements, `Calculating trapped rainwater`);
  
  if (array.length < 3) {
    output.push("Need at least 3 heights to trap water");
    return {
      steps,
      output,
      sortedArray: array,
      algorithmName: "Trapping Rain Water"
    };
  }
  
  const n = array.length;
  
  // Compute left max heights
  const leftMax = Array(n).fill(0);
  leftMax[0] = array[0];
  
  for (let i = 1; i < n; i++) {
    leftMax[i] = Math.max(leftMax[i - 1], array[i]);
    updateElementStates(visualElements, [i], 'comparing');
    addStep(steps, visualElements, `Left max at position ${i}: ${leftMax[i]}`);
  }
  
  // Reset states
  for (let i = 0; i < n; i++) {
    visualElements[i].state = 'default';
  }
  
  // Compute right max heights
  const rightMax = Array(n).fill(0);
  rightMax[n - 1] = array[n - 1];
  
  for (let i = n - 2; i >= 0; i--) {
    rightMax[i] = Math.max(rightMax[i + 1], array[i]);
    updateElementStates(visualElements, [i], 'comparing');
    addStep(steps, visualElements, `Right max at position ${i}: ${rightMax[i]}`);
  }
  
  // Reset states
  for (let i = 0; i < n; i++) {
    visualElements[i].state = 'default';
  }
  
  // Calculate trapped water
  let trappedWater = 0;
  
  for (let i = 0; i < n; i++) {
    // Calculate water at current position
    const waterHeight = Math.min(leftMax[i], rightMax[i]);
    const trapped = waterHeight - array[i];
    
    updateElementStates(visualElements, [i], 'selected');
    
    if (trapped > 0) {
      trappedWater += trapped;
      addStep(steps, visualElements, `Position ${i}: Water trapped = ${trapped} (min(${leftMax[i]}, ${rightMax[i]}) - ${array[i]})`);
      output.push(`Position ${i}: Trapped ${trapped} units of water`);
      visualElements[i].state = 'sorted';
    } else {
      addStep(steps, visualElements, `Position ${i}: No water trapped`);
      visualElements[i].state = 'default';
    }
  }
  
  output.push(`Total trapped water: ${trappedWater} units`);
  addStep(steps, visualElements, `Total trapped water: ${trappedWater} units`);
  
  return {
    steps,
    output,
    sortedArray: array,
    algorithmName: "Trapping Rain Water"
  };
}
