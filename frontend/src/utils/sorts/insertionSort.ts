
import { AlgorithmResult, ArrayElement, VisualizationStep } from '../algorithmTypes';
import { createElementArray, addStep, updateElementStates } from '../sortingUtils';

export function insertionSort(inputArray: number[]): AlgorithmResult {
  const array = createElementArray([...inputArray]);
  const steps: VisualizationStep[] = [];
  const output: string[] = [];
  
  output.push(`Starting Insertion Sort on array of size ${array.length}`);
  addStep(steps, array, "Initial array");
  
  const n = array.length;
  
  if (n > 0) {
    array[0].state = 'sorted';
    addStep(steps, array, `First element ${array[0].value} is already in sorted position`);
  }
  
  for (let i = 1; i < n; i++) {
    const key = array[i].value;
    updateElementStates(array, [i], 'selected');
    addStep(steps, array, `Selecting element ${key} to insert into the sorted portion`);
    
    let j = i - 1;
    
    while (j >= 0 && array[j].value > key) {
      updateElementStates(array, [j], 'comparing');
      addStep(steps, array, `Comparing ${array[j].value} with ${key}`);
      
      array[j + 1].value = array[j].value;
      updateElementStates(array, [j, j + 1], 'swapping');
      addStep(steps, array, `Moving ${array[j].value} one position to the right`);
      
      updateElementStates(array, [j], 'sorted');
      updateElementStates(array, [j + 1], 'default');
      j--;
      
      output.push(`Shifted element ${array[j + 1].value} to the right`);
    }
    
    array[j + 1].value = key;
    updateElementStates(array, [j + 1], 'sorted');
    addStep(steps, array, `Inserted ${key} into its correct position`);
    
    output.push(`Inserted element ${key} at position ${j + 1}`);
  }
  
  addStep(steps, array, "Array is now sorted");
  output.push("Insertion Sort completed");
  
  return {
    steps,
    output,
    sortedArray: array.map(el => el.value),
    algorithmName: "Insertion Sort"
  };
}
