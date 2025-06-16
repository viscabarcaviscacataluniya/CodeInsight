
import { AlgorithmResult } from '../types/visualizationTypes';
import { createElementArray, addStep, updateElementStates } from '../visualization/stateManager';

export function containerWithMostWater(array: number[]): AlgorithmResult {
  const output: string[] = [];
  const visualElements = createElementArray(array);
  
  // Set visualization type for all elements
  visualElements.forEach(el => {
    el.visualType = 'containerWithMostWater';
  });
  
  const steps = [];
  
  if (array.length < 2) {
    output.push("Need at least 2 heights to form a container");
    return {
      steps,
      output,
      sortedArray: array,
      algorithmName: "Container With Most Water"
    };
  }
  
  output.push(`Finding container with most water in heights: [${array.join(', ')}]`);
  addStep(steps, visualElements, `Finding container with most water using two pointers`);
  
  let left = 0;
  let right = array.length - 1;
  let maxArea = 0;
  let maxLeft = left;
  let maxRight = right;
  
  // Highlight initial pointers
  updateElementStates(visualElements, [left, right], 'comparing');
  const initialArea = Math.min(array[left], array[right]) * (right - left);
  addStep(steps, visualElements, `Initial area: min(${array[left]}, ${array[right]}) * (${right} - ${left}) = ${initialArea}`);
  maxArea = initialArea;
  
  while (left < right) {
    // Calculate current area
    const height = Math.min(array[left], array[right]);
    const width = right - left;
    const area = height * width;
    
    // Update max area if needed
    if (area > maxArea) {
      maxArea = area;
      maxLeft = left;
      maxRight = right;
      
      // Highlight new max container
      for (let i = 0; i < array.length; i++) {
        visualElements[i].state = 'default';
      }
      updateElementStates(visualElements, [left, right], 'selected');
      addStep(steps, visualElements, `New max area: ${maxArea} with width ${width} and height ${height}`);
      output.push(`New maximum area: ${maxArea}`);
    }
    
    // Move pointers
    if (array[left] < array[right]) {
      // Left height is smaller, move left pointer
      updateElementStates(visualElements, [left], 'default');
      left++;
      updateElementStates(visualElements, [left], 'comparing');
      addStep(steps, visualElements, `Moving left pointer to ${left} since ${array[left-1]} < ${array[right]}`);
    } else {
      // Right height is smaller or equal, move right pointer
      updateElementStates(visualElements, [right], 'default');
      right--;
      updateElementStates(visualElements, [right], 'comparing');
      addStep(steps, visualElements, `Moving right pointer to ${right} since ${array[left]} >= ${array[right+1]}`);
    }
  }
  
  // Final visualization showing the container with maximum area
  for (let i = 0; i < array.length; i++) {
    visualElements[i].state = 'default';
  }
  updateElementStates(visualElements, [maxLeft, maxRight], 'sorted');
  addStep(steps, visualElements, `Maximum water container: Area = ${maxArea}`);
  output.push(`Maximum water container area: ${maxArea}`);
  
  return {
    steps,
    output,
    sortedArray: array,
    algorithmName: "Container With Most Water"
  };
}
