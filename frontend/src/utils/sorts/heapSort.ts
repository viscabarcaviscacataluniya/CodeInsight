
import { AlgorithmResult, ArrayElement, VisualizationStep } from '../algorithmTypes';
import { createElementArray, addStep, updateElementStates } from '../sortingUtils';

export function heapSort(inputArray: number[]): AlgorithmResult {
  const array = createElementArray([...inputArray]);
  const steps: VisualizationStep[] = [];
  const output: string[] = [];
  
  output.push(`Starting Heap Sort on array of size ${array.length}`);
  addStep(steps, array, "Initial array");
  
  const n = array.length;
  
  output.push("Building max heap");
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(array, n, i);
  }
  
  for (let i = n - 1; i > 0; i--) {
    updateElementStates(array, [0, i], 'swapping');
    addStep(steps, array, `Swapping root (max element) ${array[0].value} with last element ${array[i].value}`);
    
    const temp = array[0];
    array[0] = array[i];
    array[i] = temp;
    
    output.push(`Placed ${array[i].value} in sorted position ${i}`);
    
    updateElementStates(array, [i], 'sorted');
    updateElementStates(array, [0], 'default');
    addStep(steps, array, `Element ${array[i].value} is now in its correct position`);
    
    heapify(array, i, 0);
  }
  
  if (array.length > 0) {
    updateElementStates(array, [0], 'sorted');
  }
  
  addStep(steps, array, "Array is now sorted");
  output.push("Heap Sort completed");
  
  return {
    steps,
    output,
    sortedArray: array.map(el => el.value),
    algorithmName: "Heap Sort"
  };
  
  function heapify(arr: ArrayElement[], size: number, rootIndex: number) {
    let largest = rootIndex;
    const left = 2 * rootIndex + 1;
    const right = 2 * rootIndex + 2;
    
    updateElementStates(array, [rootIndex], 'selected');
    if (left < size) updateElementStates(array, [left], 'comparing');
    if (right < size) updateElementStates(array, [right], 'comparing');
    addStep(steps, array, `Heapifying subtree rooted at index ${rootIndex}`);
    
    if (left < size && arr[left].value > arr[largest].value) {
      largest = left;
      addStep(steps, array, `Left child ${arr[left].value} is larger than root ${arr[rootIndex].value}`);
    }
    
    if (right < size && arr[right].value > arr[largest].value) {
      largest = right;
      addStep(steps, array, `Right child ${arr[right].value} is larger than current largest element`);
    }
    
    if (largest !== rootIndex) {
      updateElementStates(array, [rootIndex, largest], 'swapping');
      addStep(steps, array, `Swapping ${arr[rootIndex].value} with ${arr[largest].value}`);
      
      const temp = arr[rootIndex];
      arr[rootIndex] = arr[largest];
      arr[largest] = temp;
      
      output.push(`Swapped elements: ${arr[rootIndex].value} and ${arr[largest].value}`);
      
      updateElementStates(array, [rootIndex, largest], 'default');
      
      heapify(arr, size, largest);
    } else {
      updateElementStates(array, [rootIndex], 'default');
      if (left < size) updateElementStates(array, [left], 'default');
      if (right < size) updateElementStates(array, [right], 'default');
    }
  }
}
