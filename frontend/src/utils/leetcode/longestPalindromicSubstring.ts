
import { AlgorithmResult } from '../types/visualizationTypes';
import { createElementArray, addStep, updateElementStates } from '../visualization/stateManager';

export function longestPalindromicSubstring(array: number[]): AlgorithmResult {
  const output: string[] = [];
  const visualElements = createElementArray(array);
  const steps = [];
  
  // Convert array to string for palindrome checking
  // Using lowercase letters for readability
  const chars: string[] = array.map(num => String.fromCharCode((num % 26) + 97));
  const s = chars.join('');
  
  output.push(`Finding longest palindromic substring in: "${s}"`);
  addStep(steps, visualElements, `Finding longest palindromic substring in: "${s}"`);
  
  if (s.length === 0) {
    output.push("String is empty");
    return {
      steps,
      output,
      sortedArray: array,
      algorithmName: "Longest Palindromic Substring"
    };
  }
  
  let start = 0;
  let maxLength = 1;
  
  // Helper function to expand around center
  const expandAroundCenter = (left: number, right: number): void => {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      // Mark current palindrome
      for (let i = 0; i < s.length; i++) {
        visualElements[i].state = 'default';
      }
      
      const indices = [];
      for (let i = left; i <= right; i++) {
        indices.push(i);
      }
      updateElementStates(visualElements, indices, 'comparing');
      addStep(steps, visualElements, `Checking palindrome: "${s.substring(left, right + 1)}"`);
      
      // Update longest palindrome if needed
      if (right - left + 1 > maxLength) {
        // Clear previous longest
        for (let i = 0; i < s.length; i++) {
          visualElements[i].state = 'default';
        }
        
        // Mark new longest
        maxLength = right - left + 1;
        start = left;
        
        for (let i = start; i < start + maxLength; i++) {
          updateElementStates(visualElements, [i], 'selected');
        }
        addStep(steps, visualElements, `New longest palindrome: "${s.substring(start, start + maxLength)}"`);
        output.push(`Found palindrome: "${s.substring(start, start + maxLength)}" of length ${maxLength}`);
      }
      
      // Continue expanding
      left--;
      right++;
    }
  };
  
  // Check each position as potential palindrome center
  for (let i = 0; i < s.length; i++) {
    // Odd length palindrome (single character center)
    expandAroundCenter(i, i);
    
    // Even length palindrome (between characters)
    if (i < s.length - 1) {
      expandAroundCenter(i, i + 1);
    }
  }
  
  // Final result
  const longestPalindrome = s.substring(start, start + maxLength);
  output.push(`Longest palindromic substring: "${longestPalindrome}" with length ${maxLength}`);
  
  // Final visualization
  for (let i = 0; i < s.length; i++) {
    if (i >= start && i < start + maxLength) {
      visualElements[i].state = 'sorted';
    } else {
      visualElements[i].state = 'default';
    }
  }
  addStep(steps, visualElements, `Final result: "${longestPalindrome}" with length ${maxLength}`);
  
  return {
    steps,
    output,
    sortedArray: array,
    algorithmName: "Longest Palindromic Substring"
  };
}
