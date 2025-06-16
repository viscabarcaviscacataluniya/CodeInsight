
import { AlgorithmResult, ArrayElement, VisualizationStep } from '../types/visualizationTypes';
import { createElementArray, addStep, updateElementStates } from '../visualization/stateManager';

export function mergeSort(inputArray: number[]): AlgorithmResult {
  const array = createElementArray([...inputArray]);
  const steps: VisualizationStep[] = [];
  const output: string[] = [];
  
  output.push(`Starting Merge Sort on array of size ${array.length}`);
  addStep(steps, array, "Initial array");
  
  const tempArray = array.map(el => ({ ...el }));
  
  function mergeSortRecursive(arr: ArrayElement[], start: number, end: number) {
    if (start >= end) {
      return;
    }
    
    const mid = Math.floor((start + end) / 2);
    
    const subArrayIndices = Array.from({ length: end - start + 1 }, (_, i) => start + i);
    updateElementStates(array, subArrayIndices, 'selected');
    addStep(steps, array, `Dividing array from index ${start} to ${end}`);
    
    updateElementStates(array, subArrayIndices, 'default');
    
    mergeSortRecursive(arr, start, mid);
    mergeSortRecursive(arr, mid + 1, end);
    
    merge(arr, start, mid, end);
  }
  
  function merge(arr: ArrayElement[], start: number, mid: number, end: number) {
    output.push(`Merging subarrays from index ${start} to ${mid} and ${mid + 1} to ${end}`);
    
    const leftIndices = Array.from({ length: mid - start + 1 }, (_, i) => start + i);
    const rightIndices = Array.from({ length: end - mid }, (_, i) => mid + 1 + i);
    
    updateElementStates(array, [...leftIndices, ...rightIndices], 'comparing');
    addStep(steps, array, `Merging subarrays from index ${start} to ${mid} and ${mid + 1} to ${end}`);
    
    const leftSize = mid - start + 1;
    const rightSize = end - mid;
    
    const leftArray = [];
    const rightArray = [];
    
    for (let i = 0; i < leftSize; i++) {
      leftArray[i] = { ...arr[start + i] };
    }
    for (let i = 0; i < rightSize; i++) {
      rightArray[i] = { ...arr[mid + 1 + i] };
    }
    
    let i = 0;
    let j = 0;
    let k = start;
    
    while (i < leftSize && j < rightSize) {
      if (leftArray[i].value <= rightArray[j].value) {
        arr[k].value = leftArray[i].value;
        updateElementStates(array, [k], 'swapping');
        array[k].value = leftArray[i].value;
        addStep(steps, array, `Placing ${leftArray[i].value} at position ${k}`);
        updateElementStates(array, [k], 'default');
        i++;
      } else {
        arr[k].value = rightArray[j].value;
        updateElementStates(array, [k], 'swapping');
        array[k].value = rightArray[j].value;
        addStep(steps, array, `Placing ${rightArray[j].value} at position ${k}`);
        updateElementStates(array, [k], 'default');
        j++;
      }
      k++;
    }
    
    while (i < leftSize) {
      arr[k].value = leftArray[i].value;
      updateElementStates(array, [k], 'swapping');
      array[k].value = leftArray[i].value;
      addStep(steps, array, `Placing remaining left element ${leftArray[i].value} at position ${k}`);
      updateElementStates(array, [k], 'default');
      i++;
      k++;
    }
    
    while (j < rightSize) {
      arr[k].value = rightArray[j].value;
      updateElementStates(array, [k], 'swapping');
      array[k].value = rightArray[j].value;
      addStep(steps, array, `Placing remaining right element ${rightArray[j].value} at position ${k}`);
      updateElementStates(array, [k], 'default');
      j++;
      k++;
    }
    
    const mergedIndices = Array.from({ length: end - start + 1 }, (_, i) => start + i);
    updateElementStates(array, mergedIndices, 'sorted');
    addStep(steps, array, `Merged subarray from index ${start} to ${end} is now sorted`);
    
    updateElementStates(array, mergedIndices, 'default');
  }
  
  mergeSortRecursive(tempArray, 0, array.length - 1);
  
  updateElementStates(array, Array.from({ length: array.length }, (_, i) => i), 'sorted');
  addStep(steps, array, "Array is now sorted");
  output.push("Merge Sort completed");
  
  return {
    steps,
    output,
    sortedArray: array.map(el => el.value),
    algorithmName: "Merge Sort"
  };
}
