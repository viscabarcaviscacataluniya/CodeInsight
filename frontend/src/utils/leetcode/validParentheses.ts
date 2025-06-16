
import { AlgorithmResult } from '../types/visualizationTypes';
import { createElementArray, addStep, updateElementStates } from '../visualization/stateManager';

export function validParentheses(array: number[]): AlgorithmResult {
  const output: string[] = [];
  
  // Create visualization elements
  let visualElements = createElementArray(array);
  
  // Set visualization type for all elements
  visualElements.forEach(el => {
    el.visualType = 'parentheses';
  });
  
  const steps = [];
  
  // Convert numbers to parentheses characters
  const charMap: { [key: number]: string } = {
    1: '(',
    2: '{',
    3: '[',
    '-1': ')',
    '-2': '}',
    '-3': ']'
  };
  
  // Create the parentheses string
  const parenthesesChars = array.map(num => charMap[num] || '?');
  const parenthesesString = parenthesesChars.join('');
  
  output.push(`Checking if "${parenthesesString}" has valid parentheses`);
  addStep(steps, visualElements, `Checking if "${parenthesesString}" has valid parentheses`);
  
  // Implementing stack-based validation
  const stack: number[] = [];
  let isValid = true;
  
  for (let i = 0; i < array.length; i++) {
    const val = array[i];
    
    // Mark current as comparing
    updateElementStates(visualElements, [i], 'comparing');
    addStep(steps, visualElements, `Examining "${charMap[val]}" at position ${i}`);
    
    if (val > 0) {
      // Opening bracket, push to stack
      stack.push(i);
      updateElementStates(visualElements, [i], 'selected');
      addStep(steps, visualElements, `Found opening bracket "${charMap[val]}", pushing to stack`);
    } else {
      // Closing bracket, pop from stack
      if (stack.length === 0) {
        // No matching opening bracket
        isValid = false;
        updateElementStates(visualElements, [i], 'pivot');
        addStep(steps, visualElements, `Error: Found closing bracket "${charMap[val]}" with no matching opening bracket`);
        break;
      }
      
      const lastIndex = stack.pop()!;
      const lastVal = array[lastIndex];
      
      // Check if matching pair (1 with -1, 2 with -2, 3 with -3)
      if (lastVal + val !== 0) {
        isValid = false;
        updateElementStates(visualElements, [lastIndex, i], 'pivot');
        addStep(steps, visualElements, 
          `Error: Mismatched brackets. "${charMap[lastVal]}" doesn't match with "${charMap[val]}"`);
        break;
      }
      
      // Mark as matched pair
      updateElementStates(visualElements, [lastIndex, i], 'sorted');
      addStep(steps, visualElements, `Matched pair: "${charMap[lastVal]}" and "${charMap[val]}"`);
    }
  }
  
  // Check if stack is empty at the end
  if (isValid && stack.length > 0) {
    isValid = false;
    updateElementStates(visualElements, stack, 'pivot');
    addStep(steps, visualElements, `Error: Unclosed brackets remaining`);
  }
  
  if (isValid) {
    output.push(`"${parenthesesString}" has valid parentheses`);
    addStep(steps, visualElements, `"${parenthesesString}" has valid parentheses`);
    
    // Mark all as sorted in final state
    updateElementStates(visualElements, array.map((_, i) => i), 'sorted');
    addStep(steps, visualElements, `All brackets are properly matched!`);
  } else {
    output.push(`"${parenthesesString}" has invalid parentheses`);
  }
  
  return {
    steps,
    output,
    sortedArray: array,
    algorithmName: "Valid Parentheses"
  };
}
