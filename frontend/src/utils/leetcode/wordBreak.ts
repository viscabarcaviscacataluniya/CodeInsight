
import { AlgorithmResult } from '../types/visualizationTypes';
import { createElementArray, addStep, updateElementStates } from '../visualization/stateManager';

export function wordBreak(array: number[]): AlgorithmResult {
  const output: string[] = [];
  
  // Create visualization array - each number represents a character (0=a, 1=b, etc.)
  const visualElements = createElementArray(array);
  
  // Set visualization type for all elements
  visualElements.forEach(el => {
    el.visualType = 'wordBreak';
  });
  
  const steps = [];
  
  // Generate a string from the array (0=a, 1=b, etc.)
  const s = array.map(num => String.fromCharCode(97 + (num % 26))).join('');
  
  // For visualization purposes, create a dictionary with some words
  // that will match parts of our string
  const dictionary: string[] = [];
  
  // Add some substrings of different lengths from our string to the dictionary
  if (s.length >= 2) dictionary.push(s.substring(0, 2));
  if (s.length >= 3) dictionary.push(s.substring(2, s.length));
  if (s.length >= 4) dictionary.push(s.substring(0, 4));
  
  // Add some more words to ensure we have at least 3 in dictionary
  while (dictionary.length < 3) {
    dictionary.push(String.fromCharCode(97 + Math.floor(Math.random() * 26)) + 
                  String.fromCharCode(97 + Math.floor(Math.random() * 26)));
  }
  
  output.push(`String to break: "${s}"`);
  output.push(`Dictionary: [${dictionary.map(w => `"${w}"`).join(', ')}]`);
  addStep(steps, visualElements, `Breaking string "${s}" into dictionary words`);
  
  // Dynamic programming approach
  const n = s.length;
  const dp: boolean[] = Array(n + 1).fill(false);
  dp[0] = true; // Empty string is always valid
  
  // Add initial step showing the string
  addStep(steps, visualElements, `Checking if string can be segmented using words: ${dictionary.join(', ')}`);
  
  for (let i = 1; i <= n; i++) {
    updateElementStates(visualElements, [i-1], 'comparing');
    addStep(steps, visualElements, `Checking for valid segments ending at position ${i} (character: ${s[i-1]})`);
    
    for (let j = 0; j < i; j++) {
      const word = s.substring(j, i);
      
      // Reset previous selections
      for (let k = 0; k < n; k++) {
        if (visualElements[k].state !== 'comparing' && visualElements[k].state !== 'sorted') {
          visualElements[k].state = 'default';
        }
      }
      
      // Highlight the substring we're checking
      const indices = Array.from({length: i - j}, (_, k) => j + k);
      updateElementStates(visualElements, indices, 'selected');
      
      addStep(steps, visualElements, `Checking if "${word}" is in dictionary`);
      
      if (dp[j] && dictionary.includes(word)) {
        dp[i] = true;
        updateElementStates(visualElements, indices, 'sorted');
        addStep(steps, visualElements, `Found valid word: "${word}"`);
        break;
      } else {
        updateElementStates(visualElements, indices, 'default');
      }
    }
    
    if (!dp[i]) {
      updateElementStates(visualElements, [i-1], 'default');
    }
  }
  
  // Final result
  if (dp[n]) {
    output.push(`String "${s}" can be segmented using dictionary words`);
    addStep(steps, visualElements, `String "${s}" can be segmented using dictionary words`);
    
    // Visualize the segmentation (a simple greedy approach for visualization)
    let start = 0;
    while (start < n) {
      for (let end = n; end > start; end--) {
        const word = s.substring(start, end);
        if (dictionary.includes(word)) {
          const indices = Array.from({length: end - start}, (_, k) => start + k);
          updateElementStates(visualElements, indices, 'sorted');
          addStep(steps, visualElements, `Segment: "${word}"`);
          start = end;
          break;
        }
      }
      // In case we can't find a match (shouldn't happen if dp[n] is true)
      if (start < n) {
        start++;
      }
    }
  } else {
    output.push(`String "${s}" cannot be segmented using dictionary words`);
    addStep(steps, visualElements, `String "${s}" cannot be segmented using dictionary words`);
  }
  
  return {
    steps,
    output,
    sortedArray: array,
    algorithmName: "Word Break"
  };
}
