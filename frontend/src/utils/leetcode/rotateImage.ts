
import { AlgorithmResult } from '../types/visualizationTypes';
import { createElementArray, addStep, updateElementStates } from '../visualization/stateManager';

export function rotateImage(array: number[]): AlgorithmResult {
  const output: string[] = [];
  const steps = [];
  
  // Determine the matrix size (square matrix)
  const n = Math.floor(Math.sqrt(array.length));
  
  // Ensure it's a valid square matrix
  if (n * n !== array.length) {
    output.push(`Array length ${array.length} cannot form a perfect square matrix`);
    return {
      steps,
      output,
      sortedArray: array,
      algorithmName: "Rotate Image"
    };
  }
  
  // Create a 2D matrix from the input array
  const matrix: number[][] = [];
  for (let i = 0; i < n; i++) {
    const row = array.slice(i * n, (i + 1) * n);
    matrix.push(row);
  }
  
  // Create visualization elements
  const visualElements = createElementArray(array);
  
  // Display original matrix
  output.push("Original Matrix:");
  let matrixString = "";
  for (let i = 0; i < n; i++) {
    matrixString += matrix[i].join(" ") + "\n";
  }
  output.push(matrixString);
  addStep(steps, visualElements, `Original ${n}x${n} Matrix`);
  
  // First transpose the matrix
  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      if (i !== j) {
        // Highlight elements to be swapped
        const pos1 = i * n + j;
        const pos2 = j * n + i;
        updateElementStates(visualElements, [pos1, pos2], 'comparing');
        addStep(steps, visualElements, `Transposing: Swapping (${i},${j}) with (${j},${i})`);
        
        // Swap elements
        const temp = matrix[i][j];
        matrix[i][j] = matrix[j][i];
        matrix[j][i] = temp;
        
        // Update visualization
        visualElements[pos1].value = matrix[i][j];
        visualElements[pos2].value = matrix[j][i];
        updateElementStates(visualElements, [pos1, pos2], 'swapping');
        addStep(steps, visualElements, `Transposed: (${i},${j}) ↔ (${j},${i})`);
      }
    }
  }
  
  output.push("After Transpose:");
  matrixString = "";
  for (let i = 0; i < n; i++) {
    matrixString += matrix[i].join(" ") + "\n";
  }
  output.push(matrixString);
  
  // Reset visualization for the next step
  for (let i = 0; i < array.length; i++) {
    visualElements[i].state = 'default';
  }
  addStep(steps, visualElements, `Matrix after transpose (rows become columns)`);
  
  // Then reverse each row
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < Math.floor(n / 2); j++) {
      // Highlight elements to be swapped
      const pos1 = i * n + j;
      const pos2 = i * n + (n - 1 - j);
      updateElementStates(visualElements, [pos1, pos2], 'comparing');
      addStep(steps, visualElements, `Reversing row ${i}: Swapping (${i},${j}) with (${i},${n-1-j})`);
      
      // Swap elements
      const temp = matrix[i][j];
      matrix[i][j] = matrix[i][n - 1 - j];
      matrix[i][n - 1 - j] = temp;
      
      // Update visualization
      visualElements[pos1].value = matrix[i][j];
      visualElements[pos2].value = matrix[i][n - 1 - j];
      updateElementStates(visualElements, [pos1, pos2], 'swapping');
      addStep(steps, visualElements, `Reversed: (${i},${j}) ↔ (${i},${n-1-j})`);
    }
  }
  
  // Final rotated matrix
  output.push("After Rotation (90° clockwise):");
  matrixString = "";
  for (let i = 0; i < n; i++) {
    matrixString += matrix[i].join(" ") + "\n";
  }
  output.push(matrixString);
  
  // Flatten the rotated matrix back to array
  const rotatedArray: number[] = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      rotatedArray.push(matrix[i][j]);
    }
  }
  
  // Final visualization
  for (let i = 0; i < array.length; i++) {
    visualElements[i].value = rotatedArray[i];
    visualElements[i].state = 'sorted';
  }
  addStep(steps, visualElements, `Final rotated matrix (90° clockwise)`);
  
  return {
    steps,
    output,
    sortedArray: rotatedArray,
    algorithmName: "Rotate Image"
  };
}
