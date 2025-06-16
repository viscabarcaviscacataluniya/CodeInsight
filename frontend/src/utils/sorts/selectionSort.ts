
import { AlgorithmResult, ArrayElement, VisualizationStep } from '../algorithmTypes';
import { createElementArray, addStep, updateElementStates } from '../sortingUtils';

export function selectionSort(inputArray: number[]): AlgorithmResult {
  const array = createElementArray([...inputArray]);
  const steps: VisualizationStep[] = [];
  const output: string[] = [];
  
  output.push(`Starting Selection Sort on array of size ${array.length}`);
  addStep(steps, array, "Initial array");
  
  const n = array.length;
  
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    updateElementStates(array, [i], 'selected');
    addStep(steps, array, `Finding minimum element in the unsorted portion starting at index ${i}`);
    
    for (let j = i + 1; j < n; j++) {
      updateElementStates(array, [j], 'comparing');
      addStep(steps, array, `Comparing ${array[j].value} with current minimum ${array[minIndex].value}`);
      
      if (array[j].value < array[minIndex].value) {
        if (minIndex !== i) {
          updateElementStates(array, [minIndex], 'default');
        }
        
        minIndex = j;
        updateElementStates(array, [minIndex], 'selected');
        addStep(steps, array, `Found new minimum: ${array[minIndex].value} at index ${minIndex}`);
      } else {
        updateElementStates(array, [j], 'default');
      }
    }
    
    if (minIndex !== i) {
      updateElementStates(array, [i, minIndex], 'swapping');
      addStep(steps, array, `Swapping ${array[i].value} with ${array[minIndex].value}`);
      
      const temp = array[i];
      array[i] = array[minIndex];
      array[minIndex] = temp;
      
      output.push(`Swapped elements: ${array[i].value} and ${array[minIndex].value}`);
      
      updateElementStates(array, [minIndex], 'default');
    }
    
    updateElementStates(array, [i], 'sorted');
    addStep(steps, array, `Element ${array[i].value} is now in its correct position`);
  }
  
  if (n > 0) {
    updateElementStates(array, [n - 1], 'sorted');
    addStep(steps, array, `Final element ${array[n - 1].value} is now in its correct position`);
  }
  
  addStep(steps, array, "Array is now sorted");
  output.push("Selection Sort completed");
  
  return {
    steps,
    output,
    sortedArray: array.map(el => el.value),
    algorithmName: "Selection Sort"
  };
}
