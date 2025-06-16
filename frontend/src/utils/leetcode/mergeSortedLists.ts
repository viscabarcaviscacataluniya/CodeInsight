import { AlgorithmResult } from '../types/visualizationTypes';
import { createElementArray, addStep, updateElementStates } from '../visualization/stateManager';

export function mergeSortedLists(array: number[]): AlgorithmResult {
  const output: string[] = [];
  const visualElements = createElementArray(array);
  const steps = [];
  
  // Split array into two halves to represent two sorted lists
  const mid = Math.floor(array.length / 2);
  const list1 = array.slice(0, mid).sort((a, b) => a - b);
  const list2 = array.slice(mid).sort((a, b) => a - b);
  
  output.push(`List 1: ${list1.join(' -> ')}`);
  output.push(`List 2: ${list2.join(' -> ')}`);
  
  // Initial state visualization
  for (let i = 0; i < mid; i++) {
    visualElements[i].value = list1[i];
    visualElements[i].state = 'default';
  }
  
  for (let i = mid; i < array.length; i++) {
    visualElements[i].value = list2[i - mid];
    visualElements[i].state = 'pivot';
  }
  
  addStep(steps, visualElements, `Two sorted lists to merge:\nList 1: ${list1.join(' -> ')}\nList 2: ${list2.join(' -> ')}`);
  
  // Merge the lists
  const merged: number[] = [];
  let i = 0, j = 0;
  
  while (i < list1.length && j < list2.length) {
    // Compare current elements
    const idx1 = i;
    const idx2 = mid + j;
    
    updateElementStates(visualElements, [idx1, idx2], 'comparing');
    addStep(steps, visualElements, `Comparing ${list1[i]} and ${list2[j]}`);
    
    if (list1[i] <= list2[j]) {
      merged.push(list1[i]);
      updateElementStates(visualElements, [idx1], 'sorted');
      addStep(steps, visualElements, `Adding ${list1[i]} from list 1`);
      i++;
    } else {
      merged.push(list2[j]);
      updateElementStates(visualElements, [idx2], 'sorted');
      addStep(steps, visualElements, `Adding ${list2[j]} from list 2`);
      j++;
    }
  }
  
  // Add remaining elements from list1
  while (i < list1.length) {
    const idx = i;
    merged.push(list1[i]);
    updateElementStates(visualElements, [idx], 'sorted');
    addStep(steps, visualElements, `Adding remaining ${list1[i]} from list 1`);
    i++;
  }
  
  // Add remaining elements from list2
  while (j < list2.length) {
    const idx = mid + j;
    merged.push(list2[j]);
    updateElementStates(visualElements, [idx], 'sorted');
    addStep(steps, visualElements, `Adding remaining ${list2[j]} from list 2`);
    j++;
  }
  
  output.push(`Merged list: ${merged.join(' -> ')}`);
  
  // Final step - show merged list
  for (let i = 0; i < visualElements.length; i++) {
    // If we're beyond the merged list length, keep original values
    if (i < merged.length) {
      visualElements[i].value = merged[i];
    }
    visualElements[i].state = 'sorted';
  }
  addStep(steps, visualElements, `Final merged list: ${merged.join(' -> ')}`);
  
  return {
    steps,
    output,
    sortedArray: merged,
    algorithmName: "Merge Two Sorted Lists"
  };
}
