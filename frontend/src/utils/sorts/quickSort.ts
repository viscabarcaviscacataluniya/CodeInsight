
import { AlgorithmResult, ArrayElement, VisualizationStep } from '../algorithmTypes';
import { createElementArray, addStep, updateElementStates } from '../sortingUtils';

export function quickSort(inputArray: number[]): AlgorithmResult {
  const array = createElementArray([...inputArray]);
  const steps: VisualizationStep[] = [];
  const output: string[] = [];
  
  output.push(`Starting Quick Sort on array of size ${array.length}`);
  addStep(steps, array, "Initial array");
  
  const tempArray = array.map(el => ({ ...el }));
  
  function quickSortRecursive(arr: ArrayElement[], low: number, high: number) {
    if (low < high) {
      const pivotIndex = partition(arr, low, high);
      quickSortRecursive(arr, low, pivotIndex - 1);
      quickSortRecursive(arr, pivotIndex + 1, high);
    }
  }
  
  function partition(arr: ArrayElement[], low: number, high: number): number {
    const pivotValue = arr[high].value;
    output.push(`Selected pivot: ${pivotValue}`);
    
    const subArrayIndices = Array.from({ length: high - low + 1 }, (_, i) => low + i);
    updateElementStates(array, subArrayIndices, 'selected');
    
    updateElementStates(array, [high], 'pivot');
    addStep(steps, array, `Partitioning array from index ${low} to ${high}, pivot: ${pivotValue}`);
    
    updateElementStates(array, subArrayIndices.filter(i => i !== high), 'default');
    
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
      updateElementStates(array, [j], 'comparing');
      addStep(steps, array, `Comparing ${array[j].value} with pivot ${pivotValue}`);
      
      if (arr[j].value <= pivotValue) {
        i++;
        
        if (i !== j) {
          updateElementStates(array, [i, j], 'swapping');
          addStep(steps, array, `Swapping ${array[i].value} and ${array[j].value}`);
          
          const temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
          
          const tempViz = array[i];
          array[i] = array[j];
          array[j] = tempViz;
          
          output.push(`Swapped elements: ${array[i].value} and ${array[j].value}`);
        }
      }
      
      updateElementStates(array, [i, j], 'default');
    }
    
    if (i + 1 !== high) {
      updateElementStates(array, [i + 1, high], 'swapping');
      addStep(steps, array, `Placing pivot ${pivotValue} in its correct position`);
      
      const temp = arr[i + 1];
      arr[i + 1] = arr[high];
      arr[high] = temp;
      
      const tempViz = array[i + 1];
      array[i + 1] = array[high];
      array[high] = tempViz;
      
      output.push(`Placed pivot ${pivotValue} at position ${i + 1}`);
    }
    
    updateElementStates(array, [i + 1], 'sorted');
    addStep(steps, array, `Pivot ${pivotValue} is now in its correct position at index ${i + 1}`);
    
    return i + 1;
  }
  
  quickSortRecursive(tempArray, 0, array.length - 1);
  
  updateElementStates(array, Array.from({ length: array.length }, (_, i) => i), 'sorted');
  addStep(steps, array, "Array is now sorted");
  output.push("Quick Sort completed");
  
  return {
    steps,
    output,
    sortedArray: array.map(el => el.value),
    algorithmName: "Quick Sort"
  };
}
