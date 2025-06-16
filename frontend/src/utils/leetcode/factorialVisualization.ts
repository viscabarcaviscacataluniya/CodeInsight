
import { AlgorithmResult } from '../types/visualizationTypes';
import { createElementArray, addStep, updateElementStates } from '../visualization/stateManager';

export function factorialVisualization(array: number[]): AlgorithmResult {
  const output: string[] = [];
  
  // Use the first element as n, or default to 5
  const n = array.length > 0 ? Math.min(array[0], 10) : 5;
  
  // Create array to show the multiplication steps
  const factorialSteps = Array.from({length: n}, (_, i) => i + 1);
  const visualElements = createElementArray(factorialSteps);
  const steps = [];
  
  output.push(`Computing factorial of ${n}`);
  addStep(steps, visualElements, `Computing ${n}! = ${factorialSteps.join(' × ')}`);
  
  if (n <= 0) {
    output.push("Invalid input: n must be positive");
    return {
      steps,
      output,
      sortedArray: [],
      algorithmName: "Factorial"
    };
  }
  
  if (n === 1) {
    updateElementStates(visualElements, [0], 'sorted');
    addStep(steps, visualElements, `1! = 1`);
    output.push(`1! = 1`);
    return {
      steps,
      output,
      sortedArray: [1],
      algorithmName: "Factorial"
    };
  }
  
  let result = 1;
  
  for (let i = 0; i < n; i++) {
    const currentNum = i + 1;
    
    // Highlight current number being multiplied
    updateElementStates(visualElements, [i], 'comparing');
    addStep(steps, visualElements, `Multiplying by ${currentNum}: ${result} × ${currentNum}`);
    
    result *= currentNum;
    
    // Show the intermediate result
    visualElements[i].value = result;
    updateElementStates(visualElements, [i], 'selected');
    addStep(steps, visualElements, `Result so far: ${result}`);
    output.push(`${currentNum}! = ${result}`);
    
    // Mark as used in calculation
    updateElementStates(visualElements, [i], 'sorted');
  }
  
  addStep(steps, visualElements, `Final result: ${n}! = ${result}`);
  output.push(`Final result: ${n}! = ${result}`);
  
  return {
    steps,
    output,
    sortedArray: factorialSteps.map((_, i) => {
      let fact = 1;
      for (let j = 1; j <= i + 1; j++) {
        fact *= j;
      }
      return fact;
    }),
    algorithmName: "Factorial"
  };
}
