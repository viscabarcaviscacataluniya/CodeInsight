
import { AlgorithmResult } from '../types/visualizationTypes';
import { createElementArray, addStep, updateElementStates } from '../visualization/stateManager';

export function palindromeCheck(array: number[]): AlgorithmResult {
  const output: string[] = [];
  const visualElements = createElementArray(array);
  const steps = [];
  
  output.push(`Checking if array [${array.join(', ')}] is a palindrome`);
  addStep(steps, visualElements, `Checking if array is a palindrome using two pointers`);
  
  if (array.length === 0) {
    output.push("Empty array is considered a palindrome");
    return {
      steps,
      output,
      sortedArray: array,
      algorithmName: "Palindrome Check"
    };
  }
  
  if (array.length === 1) {
    updateElementStates(visualElements, [0], 'sorted');
    addStep(steps, visualElements, `Single element array is always a palindrome`);
    output.push("Single element array is always a palindrome");
    return {
      steps,
      output,
      sortedArray: array,
      algorithmName: "Palindrome Check"
    };
  }
  
  let left = 0;
  let right = array.length - 1;
  let isPalindrome = true;
  
  while (left < right) {
    // Highlight the two elements being compared
    updateElementStates(visualElements, [left, right], 'comparing');
    addStep(steps, visualElements, `Comparing elements at positions ${left} and ${right}: ${array[left]} vs ${array[right]}`);
    
    if (array[left] !== array[right]) {
      // Mark as mismatch
      updateElementStates(visualElements, [left, right], 'swapping');
      addStep(steps, visualElements, `Mismatch found: ${array[left]} ≠ ${array[right]}. Not a palindrome!`);
      output.push(`Mismatch at positions ${left} and ${right}: ${array[left]} ≠ ${array[right]}`);
      isPalindrome = false;
      break;
    } else {
      // Mark as matching
      updateElementStates(visualElements, [left, right], 'selected');
      addStep(steps, visualElements, `Match found: ${array[left]} = ${array[right]}`);
      output.push(`Match at positions ${left} and ${right}: ${array[left]} = ${array[right]}`);
      
      // Mark as verified
      updateElementStates(visualElements, [left, right], 'sorted');
    }
    
    left++;
    right--;
  }
  
  if (isPalindrome) {
    // Mark all elements as part of palindrome
    for (let i = 0; i < array.length; i++) {
      visualElements[i].state = 'sorted';
    }
    addStep(steps, visualElements, `All comparisons successful - Array IS a palindrome!`);
    output.push("Result: Array IS a palindrome!");
  } else {
    addStep(steps, visualElements, `Array is NOT a palindrome`);
    output.push("Result: Array is NOT a palindrome");
  }
  
  return {
    steps,
    output,
    sortedArray: array,
    algorithmName: "Palindrome Check"
  };
}
