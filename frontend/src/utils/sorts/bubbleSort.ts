
import { 
  AlgorithmResult, 
  ArrayElement, 
  VisualizationStep 
} from '../types/visualizationTypes';
import { 
  createElementArray, 
  addStep, 
  updateElementStates 
} from '../visualization/stateManager';

export function bubbleSort(inputArray: number[]): AlgorithmResult {
  const array = createElementArray([...inputArray]);
  const steps: VisualizationStep[] = [];
  const output: string[] = [];
  
  output.push(`Starting Bubble Sort on array of size ${array.length}`);
  addStep(steps, array, "Initial array");
  
  const n = array.length;
  
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    
    for (let j = 0; j < n - i - 1; j++) {
      updateElementStates(array, [j, j + 1], 'comparing');
      addStep(steps, array, `Comparing ${array[j].value} and ${array[j + 1].value}`);
      
      if (array[j].value > array[j + 1].value) {
        updateElementStates(array, [j, j + 1], 'swapping');
        addStep(steps, array, `Swapping ${array[j].value} and ${array[j + 1].value}`);
        
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        
        swapped = true;
        output.push(`Swapped elements: ${array[j].value} and ${array[j + 1].value}`);
      }
      
      updateElementStates(array, [j, j + 1], 'default');
    }
    
    array[n - i - 1].state = 'sorted';
    addStep(steps, array, `Element ${array[n - i - 1].value} is now in its correct position`);
    
    if (!swapped) {
      output.push("Array is already sorted, early termination");
      break;
    }
  }
  
  if (array.length > 0) {
    array[0].state = 'sorted';
  }
  
  addStep(steps, array, "Array is now sorted");
  output.push("Bubble Sort completed");
  
  return {
    steps,
    output,
    sortedArray: array.map(el => el.value),
    algorithmName: "Bubble Sort"
  };
}
