
import { AlgorithmResult } from '../types/visualizationTypes';
import { createElementArray, addStep, updateElementStates } from '../visualization/stateManager';

export function reverseLinkedList(array: number[]): AlgorithmResult {
  const output: string[] = [];
  const visualElements = createElementArray(array);
  
  // Set visualization type for all elements
  visualElements.forEach(el => {
    el.visualType = 'linkedList';
  });
  
  const steps = [];
  
  // Use array to simulate linked list nodes
  output.push(`Original list: ${array.join(' -> ')}`);
  addStep(steps, visualElements, `Original linked list: ${array.join(' -> ')}`);
  
  // Initialize pointers
  let prev = -1;  // null
  let curr = 0;   // head
  
  // Highlight initial state
  updateElementStates(visualElements, [curr], 'selected');
  addStep(steps, visualElements, `Starting with curr = node[${curr}] (value: ${array[curr]}), prev = null`);
  
  while (curr < array.length) {
    // Current node being processed
    updateElementStates(visualElements, [curr], 'comparing');
    
    // Store next pointer
    const next = curr + 1 < array.length ? curr + 1 : -1;
    
    if (next !== -1) {
      updateElementStates(visualElements, [next], 'pivot');
      addStep(steps, visualElements, `Store next = node[${next}] (value: ${array[next]})`);
    } else {
      addStep(steps, visualElements, `Store next = null (end of list)`);
    }
    
    // Reverse the pointer (visualize with swapping values in array)
    updateElementStates(visualElements, [curr], 'swapping');
    if (prev !== -1) {
      updateElementStates(visualElements, [prev], 'sorted');
    }
    addStep(steps, visualElements, `Reverse pointer: node[${curr}]->next = node[${prev}]`);
    
    // Move pointers
    prev = curr;
    curr = next;
    
    if (curr !== -1) {
      // Update for next iteration
      updateElementStates(visualElements, [prev], 'sorted');
      updateElementStates(visualElements, [curr], 'selected');
      addStep(steps, visualElements, `Move pointers: prev = node[${prev}], curr = node[${curr}]`);
    } else {
      // Done with the list
      updateElementStates(visualElements, [prev], 'sorted');
      addStep(steps, visualElements, `Move pointers: prev = node[${prev}], curr = null (done)`);
    }
  }
  
  // Final reversed list
  const reversed = [...array].reverse();
  output.push(`Reversed list: ${reversed.join(' -> ')}`);
  
  // Show final reversed list
  const finalElements = createElementArray(reversed);
  finalElements.forEach(el => {
    el.visualType = 'linkedList';
    el.state = 'sorted';
  });
  
  addStep(steps, finalElements, `Final reversed linked list: ${reversed.join(' -> ')}`);
  
  return {
    steps,
    output,
    sortedArray: reversed,
    algorithmName: "Reverse Linked List"
  };
}
