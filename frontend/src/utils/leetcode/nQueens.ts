
import { AlgorithmResult } from '../types/visualizationTypes';
import { createElementArray, addStep, updateElementStates } from '../visualization/stateManager';

export function nQueens(array: number[]): AlgorithmResult {
  const output: string[] = [];
  
  // Use array length or default to 4 if array is empty
  const n = array.length > 0 ? Math.min(array.length, 8) : 4;
  
  // Creating an nxn board for visualization
  const boardSize = n * n;
  const boardArray = Array(boardSize).fill(0);
  const visualElements = createElementArray(boardArray);
  const steps = [];
  
  output.push(`Solving N-Queens problem for a ${n}x${n} board`);
  addStep(steps, visualElements, `Initializing ${n}x${n} board for N-Queens problem`);
  
  // Initialize board and result
  const board = Array(n).fill(0).map(() => Array(n).fill('.'));
  const result: string[][] = [];
  
  // Check if a position is valid for queen placement
  const isValid = (row: number, col: number): boolean => {
    // Check column
    for (let i = 0; i < row; i++) {
      if (board[i][col] === 'Q') {
        return false;
      }
    }
    
    // Check upper left diagonal
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j] === 'Q') {
        return false;
      }
    }
    
    // Check upper right diagonal
    for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
      if (board[i][j] === 'Q') {
        return false;
      }
    }
    
    return true;
  };
  
  // Convert a 2D position to a 1D index for visualization
  const posToIndex = (row: number, col: number): number => row * n + col;
  
  // Backtracking function to solve N-Queens
  const solveNQueens = (row: number): void => {
    if (row === n) {
      // Found a solution
      const solution = board.map(row => row.join(''));
      result.push([...solution]);
      
      // Visualize the solution
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          const index = posToIndex(i, j);
          visualElements[index].value = board[i][j] === 'Q' ? 1 : 0;
          visualElements[index].state = board[i][j] === 'Q' ? 'sorted' : 'default';
        }
      }
      
      const solutionString = board.map(row => row.join('')).join('\n');
      addStep(steps, visualElements, `Found solution #${result.length}:\n${solutionString}`);
      output.push(`Solution #${result.length} found`);
      
      return;
    }
    
    // Try placing queen in each column
    for (let col = 0; col < n; col++) {
      // Reset states for new attempt
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          const index = posToIndex(i, j);
          visualElements[index].state = board[i][j] === 'Q' ? 'sorted' : 'default';
        }
      }
      
      // Highlight current position
      const index = posToIndex(row, col);
      updateElementStates(visualElements, [index], 'comparing');
      addStep(steps, visualElements, `Trying to place queen at position (${row}, ${col})`);
      
      if (isValid(row, col)) {
        // Place queen
        board[row][col] = 'Q';
        visualElements[index].value = 1;
        updateElementStates(visualElements, [index], 'selected');
        addStep(steps, visualElements, `Placed queen at position (${row}, ${col})`);
        
        // Proceed to next row
        solveNQueens(row + 1);
        
        // Backtrack
        board[row][col] = '.';
        visualElements[index].value = 0;
        updateElementStates(visualElements, [index], 'default');
        addStep(steps, visualElements, `Backtracking: removed queen from position (${row}, ${col})`);
      } else {
        updateElementStates(visualElements, [index], 'swapping');
        addStep(steps, visualElements, `Cannot place queen at position (${row}, ${col})`);
      }
    }
  };
  
  // Start solving from first row
  solveNQueens(0);
  
  if (result.length === 0) {
    output.push(`No solutions found for ${n}-Queens problem`);
  } else {
    output.push(`Total solutions found: ${result.length}`);
  }
  
  return {
    steps,
    output,
    sortedArray: array,
    algorithmName: "N-Queens"
  };
}
